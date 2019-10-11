FROM node:10.16-alpine

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm ci --quiet --only-production
COPY . .

CMD [ "npm", "start" ]
