FROM node:16-slim

EXPOSE 5000

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]