FROM node:10-alpine

RUN mkdir /usr/spa
WORKDIR /usr/spa
COPY package.json ./
RUN npm install && npm run start