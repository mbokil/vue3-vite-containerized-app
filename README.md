# vue-vite-containerized-app

This template is for an endpoint neutral containerized Vue 3/Vite 3 project. You can build the app once and then move the docker image to a dev, QA or production environment. Just point the image config at your .env file and the Node server will inject the Vite properties into your Vue app at runtime. No more rebuilding to change your UI endpoints. The UI and server now share the same properties. I have included Docker build and run instructions.


## Customize configuration
Edit the /config/.env.* files and add your app UI properties they will be injected into the UI as APP_PROPS  
Set VITE_LOGGING to true for browser logging


## Project Setup

```
git clone https://github.com/mbokil/vue3-vite-containerized-app
cd vue3-vite-containerized-app

# Using Node 16.x
npm install
```

### Compile and Hot-Reload for Development

```
npm run dev
npm run qa
npm run prod

Open browser to:
http://localhost:3000
```

### Compile and Minify for Production

```
npm run build

# Node server will point to .env unless specified
node vueBaseAppServer.js --env dev
node vueBaseAppServer.js --env qa
node vueBaseAppServer.js --env prod

Open browser to: http://localhost:3000
```

### Compile, Build a docker image, and run

```
# Install docker first if not installed - one time
brew install docker

# Run Docker if not running (macos)
open --background -a Docker

docker build -t my-app .
docker run -d -p 3000:3000 --env-file config/.env my-app

Open browser to: http://localhost:3000
```
