FROM node:16-bullseye-slim

WORKDIR /code
COPY package.json /code/

RUN npm i

COPY . /code/

RUN node register.js
