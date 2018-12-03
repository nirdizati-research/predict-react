# Build container
FROM node:10-alpine as builder

WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . /app
RUN npm run build

# Production container with Nginx Alpine
FROM nginx:1.13.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
