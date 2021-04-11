FROM node:12-alpine
WORKDIR /usr/src/app/api
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install nodemon -g
COPY . .
EXPOSE 8080
