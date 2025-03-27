<!--
  ~~ Transition.vue - A transition button.
  -->

<script setup>
import {computed} from 'vue';

const props = defineProps(['transition']);

const transition = computed(() => props.transition);
</script>

<template>
  <input type='button' :value='transition.description' @click='$emit("transition")' />
</template>

<style scoped>
input[type='button'] {
  background-color: lightgray;
  padding: 10px;
  margin: 10px;
  border: 3px double darkgrey;
  text-align: center;
}
</style>