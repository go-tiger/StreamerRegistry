FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
    build-base \
    cairo-dev \
    pango-dev \
    gdk-pixbuf-dev \
    jpeg-dev \
    giflib-dev \
    python3

RUN apk add --no-cache yarn

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]