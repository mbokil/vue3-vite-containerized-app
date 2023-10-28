<script setup>
import { ref } from "vue";
import HelloWorld from './components/HelloWorld.vue'
import { log } from "@/services/utility.js"; // logging browser service

let data = ref(null);

const fetchData = async () => {
	const response = await fetch(APP_PROPS.VITE_SERVICE_URL);
  if (!response || !response.ok) {
  	console.log('error fetching data')
	} else {
		const json = await response.json();
		data.value = json;
    log('fetched data:', json);
	}
}

fetchData();

</script>

<template>
  <header>
    <img alt="App logo" class="logo" src="@/assets/images/logo.png" width="200" height="200" />
    <div class="wrapper">
      <HelloWorld msg="Containerized Endpoint Neutral Vue 3 App" />
      <ul class="list">
      	<li v-for="x in data" :key="x.id">{{ x.body }}</li>
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
