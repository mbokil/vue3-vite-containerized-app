<script setup>
import { ref } from "vue";
import HelloWorld from './components/HelloWorld.vue'
import { log } from "@/services/utility.js"; // logging browser service
let data = $ref(null); // using the new reactivity transform compiler option to avoid .value

const fetchData = async () => {
	const resp = await fetch(APP_PROPS.VITE_SERVICE_URL);
  if (!resp.ok) {
  	throw new Error('An error occurred: ' + resp.status);
	} else {
		const json = await resp.json();
		data = json.threads;
  	log('fetched data:',data);
	}
}

fetchData();

</script>

<template>
  <header>
    <img alt="App logo" class="logo" src="@/assets/images/logo.png" width="200" height="200" />
    <div class="wrapper">
      <HelloWorld msg="Containerized Minimal Vue 3 App" />
      <ul class="list">
      	<li v-for="x in data" :key="x.id">{{ x.name }}</li>
      </ul>
    </div>
  </header>
</template>

<style>
@import './assets/css/base.css';

#app {
  max-width: 1680px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.list {
	padding: 0 15px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.blue {
  text-decoration: none;
  color: #0070ff;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
