# Stage 1
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Stage 2
FROM node:21-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["npm", "run", "dev"]
