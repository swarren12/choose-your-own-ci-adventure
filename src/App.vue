<!--
  ~~ App.vue - Entrypoint to the Vue app.
  -->

<script setup>

import scenarios from '@/scenarios/scenarios.mjs';

</script>

<template>
  <header>
    <h1> Choose your own adventure! </h1>
  </header>
  <main class='d-flex flex-fill flex-row' role='main'>
    <nav>
      <h5> Links </h5>
      <ol>
      <li><RouterLink to='/' class='nav-link' activeClass='active'>Home</RouterLink></li>
      </ol>

      <h5> Scenarios </h5>
      <ol>
        <li v-for='scenario in scenarios'>
          <RouterLink :to='`/${scenario.id}`' class='nav-link' activeClass='active'>{{ scenario.title }}</RouterLink>
        </li>
      </ol>
    </nav>
    <section>
      <RouterView/>
    </section>
  </main>
</template>

<style scoped>
header {
  width: 100%;
  background-color: darkgray;
  text-align: center;
  margin: 0;
  padding: 0;
  flex-grow: 0;
  border-bottom: 2px solid black;
}

header h1 {
  margin: 0;
  padding: 0.5em;
}

main {
  background-color: pink;
  flex-grow: 1;
}

main nav {
  width: 200px;
  background-color: orange;
  padding: 25px;
  flex-grow: 0;
}

main nav ol li a {
  font-weight: normal;
}

main nav ol li a.active {
  font-weight: bold;
}

main section {
  background-color: yellow;
  flex-grow: 1;
}
</style>