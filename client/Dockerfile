FROM node:12-alpine
WORKDIR /usr/src/app/client
COPY package*json .
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN npm install
COPY . .
EXPOSE 3000
