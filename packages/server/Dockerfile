FROM node:13.10.1-alpine3.11

RUN mkdir -p /usr/app
WORKDIR /usr/app

ENV NODE_ENV=development

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
