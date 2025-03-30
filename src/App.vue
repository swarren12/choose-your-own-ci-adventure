<!--
  ~~ App.vue - Entrypoint to the Vue app.
  -->

<script setup>

import scenarios from '@/scenarios/scenarios.mjs';

</script>

<template>
  <main class='d-flex flex-fill flex-row' role='main'>
    <nav>
      <hr />
      <h5> Links </h5>
      <ol>
      <li><RouterLink to='/' class='nav-link' activeClass='active'>Home</RouterLink></li>
      </ol>
      <hr />
      <h5> Scenarios </h5>
      <ol>
        <li v-for='scenario in scenarios'>
          <RouterLink :to='`/${scenario.id}`' class='nav-link' activeClass='active'>{{ scenario.title }}</RouterLink>
        </li>
      </ol>
      <hr />
    </nav>
    <section>
      <RouterView/>
    </section>
  </main>
</template>

<style scoped>
main {
  flex-grow: 1;
}

main nav {
  width: 200px;
  background-color: darkgray;
  padding: 25px;
  flex-grow: 0;
  border-right: 2px solid black;
}

main nav ol {
  padding: 0;
  list-style: none;
}

main nav ol li a {
  font-weight: normal;
}

main nav ol li a.active {
  font-weight: bold;
}

main section {
  background-color: lightgray;
  flex-grow: 1;
}
</style>