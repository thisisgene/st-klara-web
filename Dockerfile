FROM node:10-alpine

RUN mkdir -p /app

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/package.json

COPY . .

RUN npm install
RUN npm rebuild node-sass

CMD [ "npm", "start" ]