FROM node:8.9.1-alpine

LABEL maintainer Vladimir Dmitrovskiy "dmitrovskiyvl@gmail.com"

WORKDIR /var/www/html
COPY . /var/www/html

RUN apk add --update --no-cache \
    python \
    musl \
    git \
    && npm install

CMD ["npm", "start"]
