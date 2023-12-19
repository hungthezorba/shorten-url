FROM node:18-slim

EXPOSE 5173

WORKDIR /app

COPY ./ ./

RUN npm install

CMD [ "npm", "run", "dev:host"]