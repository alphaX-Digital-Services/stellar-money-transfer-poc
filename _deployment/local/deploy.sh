#!/usr/bin/env sh

set -e

BUILD=${BUILD:-0}
DEV=${DEV:-0}
PROJECT_NAME='local_stellar_money_api'

if [ $DEV = 1 ]
then
    COMPOSE_FILE='docker-compose-dev.yml'
else
    COMPOSE_FILE='docker-compose.yml'
fi

if [ $BUILD = 1 ]
then
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up --build
else
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE kill
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE rm -f
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE pull
    docker-compose --project-name $PROJECT_NAME -f $COMPOSE_FILE up
fi
