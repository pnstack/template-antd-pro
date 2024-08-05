FROM node:18.20.2-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g umi

FROM base AS dependencies
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Runtime image
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN cp .env.example .env
RUN yarn build

FROM nginx:alpine AS runtime
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

