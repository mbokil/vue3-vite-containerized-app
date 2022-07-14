FROM node:latest as node

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app
COPY ./ /app/

# build app
RUN npm install
RUN npm run build

# open port 3000 and run Node server
EXPOSE 3000
CMD [ "node", "vueBaseAppServer.js" ]