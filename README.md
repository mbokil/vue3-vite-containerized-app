# vue-vite-containerized-app

This template is for an endpoint neutral containerized Vite project. You can build the app once and then move the dist folder to a dev, QA or production container. Just point the container config at your env file and the Node server will inject the Vite properties into your Vue app.


## Customize configuration
Edit the .env file and add your app UI properties they will be injected into the UI as APP_PROPS  
Set VITE_LOGGING to 0 or 1 for browser logging


## Project Setup

```
npm install
```

### Compile and Hot-Reload for Development

```
npm run dev
```

### Compile and Minify for Production

```
npm run build
```

### Run Node server for production - build the app before running

```
node vueBaseAppServer.js
# default port is 8181 open browser to http://localhost:8181
```
