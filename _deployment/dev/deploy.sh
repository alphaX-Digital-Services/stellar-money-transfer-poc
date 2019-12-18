#!/usr/bin/env sh

set -e

BUILD=${BUILD:-0}
PROJECT_NAME='dev_stellar_money_api'
COMPOSE_FILE='docker-compose.yml'

docker network create common || true
docker network create commonDev || true

if [ $BUILD = 1 ]
then
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up --build -d
else
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up -d
fi
