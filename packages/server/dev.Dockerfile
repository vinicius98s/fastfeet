FROM node:13

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN yarn

COPY . . 

EXPOSE 3000

CMD ["yarn", "dev"]
