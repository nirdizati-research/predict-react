FROM node:8 as builder

WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

COPY . /app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
