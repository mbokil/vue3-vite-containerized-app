# vue-vite-containerized-app

This template is for an endpoint neutral containerized Vue 3/Vite project. You can build the app once and then move the Node 14 container to a dev, QA or production container. Just point the container config at your .env file and the Node server will inject the Vite properties into your Vue app. No more rebuilding to change your UI endpoints!


## Customize configuration
Edit the /config/.env.* files and add your app UI properties they will be injected into the UI as APP_PROPS  
Set VITE_LOGGING to 0 or 1 for browser logging


## Project Setup

```
npm install
```

### Compile and Hot-Reload for Development

```
npm run dev
npm run qa
npm run prod
```

### Compile and Minify for Production

```
npm run build

# Node server will point to .env unless specified
node vueBaseAppServer.js --env dev
node vueBaseAppServer.js --env qa
node vueBaseAppServer.js --env prod

Open browser to: http://localhost:8181
```
