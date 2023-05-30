FROM node:18.15.0-alpine

WORKDIR ./

ENV NODE_ENV production

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --only=production

COPY . .

EXPOSE 5050
CMD ["node", "src/server/http/server.js"]