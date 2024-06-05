FROM node:18.20.2-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g umi

FROM base AS dependencies
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Runtime image
FROM base AS runtime
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
