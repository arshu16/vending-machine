FROM node:10.14.1-stretch-slim AS base

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 8080 9229
ENTRYPOINT ["/bin/bash", "start.sh"]