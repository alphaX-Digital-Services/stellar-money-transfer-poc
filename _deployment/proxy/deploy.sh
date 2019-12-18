#!/usr/bin/env sh

docker network create public || true
docker network create common || true

docker-compose kill
docker-compose rm -f
docker-compose pull
docker-compose up -d --build
