FROM node:14.19.1-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

CMD ["npm", "start"]
