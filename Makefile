#########################
# Docker 
#########################

dev:
	docker-compose -f docker-compose.yml up

start:
	docker-compose -f docker-compose.yml up -d

stop:
	docker-compose -f docker-compose.yml down  --remove-orphans

rebuild:
	docker-compose -f docker-compose.yml down --remove-orphans
	docker-compose -f docker-compose.yml build
	docker-compose -f docker-compose.yml up --force-recreate

pull:
	docker-compose -f docker-compose.yml pull