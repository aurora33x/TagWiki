FROM node:16.20.2
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
RUN npm run build

#Serve the nginx
From nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
Run rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]