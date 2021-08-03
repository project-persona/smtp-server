FROM node:lts-alpine

RUN apk add git

ADD ./ /app

RUN cd /app \
    && npm install \
    apk del git

WORKDIR /app

# run as root
USER 0

EXPOSE 25

ENTRYPOINT ["npm", "start"]
