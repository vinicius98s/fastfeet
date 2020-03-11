FROM node:13.10.1-alpine3.11

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]