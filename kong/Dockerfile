FROM kong:2.0.1

COPY kong.yml /var/lib/kong/kong.yml  

ENV KONG_DATABASE=off 
ENV KONG_PLUGINS=request-transformer,cors,key-auth
ENV KONG_DECLARATIVE_CONFIG=/var/lib/kong/kong.yml

EXPOSE 8000
EXPOSE 8001
EXPOSE 8443
EXPOSE 8444