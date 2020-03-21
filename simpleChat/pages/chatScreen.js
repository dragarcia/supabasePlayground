import { createClient } from "@supabase/supabase-js";
import cookie from "js-cookie";
import moment from "moment";

export default class ChatScreen extends React.Component {
  constructor() {
    super();
    this.supabase = createClient("http://localhost:8000", "LmT3VFkGhD");

    this.state = {
      username: cookie.get("username"),
      messages: [],
      message: null
    };

    console.log(this.state);
  }
  componentDidMount() {
    this.subscribe();
    this.loadMessages();
  }

  subscribe() {
    this.supabase
      .from("messages")
      .eq("sender", "John")
      .on("*", payload => {
        console.log("REALTIME! ", payload);
        console.log("/??? ", payload.new);

        // This is meant to test out ChangeMapper
        // let change = ChangeMapper.convertChangeData(payload.columns, payload.record)
        // console.log('this is the change ', change)

        let updatedMessages = this.state.messages;
        updatedMessages.push(payload.new);

        this.setState({ messages: updatedMessages });
      })
      .subscribe();
  }

  async loadMessages() {
    let messages = await this.supabase
      .from("messages")
      .select()
      // .eq('id', '2')
      .order("inserted_at", true);
    // .single()

    console.log("lo and behold ", messages);

    this.setState({ messages: messages.body });
  }

  async sendMessage() {
    let payload = [
      {
        sender: this.state.username,
        message: this.state.message,
        inserted_at: moment().format()
      },
      { sender: "John", message: "BOO", inserted_at: moment().format() }
    ];

    let test = await this.supabase.from("messages").insert(payload);

    console.log("this is what is returned ", test);

    this.setState({ message: "" });
  }

  render() {
    return (
      <div style={styles.main}>
        <h1>Hello</h1>
        {this.state.messages.map(message => {
          return (
            <p>
              {message.sender}: {message.message}
            </p>
          );
        })}
        <label>Say Something!</label>
        <input
          type="text"
          class="input"
          id="message"
          name="message"
          value={this.state.message}
          onChange={event => {
            this.setState({ message: event.target.value });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") this.sendMessage();
          }}
        />
        <br />
        <button
          onClick={() => {
            this.sendMessage();
          }}
        >
          Send
        </button>
      </div>
    );
  }
}

const styles = {
  main: { fontFamily: "monospace", padding: 30 },
  pre: {
    whiteSpace: "pre",
    overflow: "auto",
    background: "#333",
    maxHeight: 200,
    borderRadius: 6,
    padding: 5
  },
  code: { display: "block", wordWrap: "normal", color: "#fff" }
};
