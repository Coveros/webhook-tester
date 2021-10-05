FROM node:14.18-alpine

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm ci --quiet --only-production
COPY . .

CMD [ "npm", "start" ]
