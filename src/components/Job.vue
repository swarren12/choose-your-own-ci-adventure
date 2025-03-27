<!--
  ~~ Job.vue - A job card.
  -->

<script setup>
import {computed} from 'vue';
import {JobStatus} from '@/utils.mjs';

const props = defineProps(['job']);

const job = computed(() => props.job);
const title = computed(() => {
  return job.value.status === JobStatus.PASS
      ? job.value.name
      : `${job.value.name} [${job.value.failures}]`
})
</script>

<template>
  <div :class='`job job-${job.status.description}`'>
    <h3>{{ title }}</h3>
    <div class='job-progress'>
      <div class='job-progress-complete' :style='`width: ${job.progress}%`'></div>
      <div class='job-progress-remaining' :style='`width: ${100 - job.progress}%`'></div>
    </div>
  </div>
</template>

<style scoped>
div.job {
  width: 350px;
  display: inline-block;
  background-color: grey;
  margin: 10px;
  border: 3px double darkgrey;
  text-align: center;
}

div.job-pass {
  background-color: green;
}

div.job-fail {
  background-color: indianred;
}

div.job-progress {
  height: 10px;
  background-color: yellow;
  font-size: 0;
  padding: 0;
  margin: 0;
}

div.job-pass div.job-progress-complete {
  height: 10px;
  display: inline-block;
  background-color: darkgreen;
}

div.job-fail div.job-progress-complete {
  height: 10px;
  display: inline-block;
  background-color: darkred;
}

div.job-progress-remaining {
  height: 10px;
  display: inline-block;
  background-color: orange;
}
</style>