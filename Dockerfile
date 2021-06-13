FROM node:14-alpine as build
WORKDIR app

## install dep
COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json
RUN yarn

## build
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.build.json /app/tsconfig.build.json

RUN yarn build
RUN ls

## remove dev dependencies
RUN npm prune --production

FROM node:14-alpine
WORKDIR app
CMD node dist/main.js

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json /app/package.json
