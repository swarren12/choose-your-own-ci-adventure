<!--
  ~~ Scenario.vue - A generic scenario's content.
  -->

<script setup>
import Job from '@/components/Job.vue';
import TransitionBtn from '@/components/Transition.vue';
import {reactive, ref} from 'vue';

const props = defineProps(['scenario']);

const scenario = ref(props['scenario']);
const duration = ref(0);

const onTransition = function(transition) {
  console.log(transition);
  const next = transition.apply(scenario.value);
  console.log(next);

  scenario.value = next;
  duration.value += transition.duration;
}
</script>

<template>
  <div class='d-flex flex-fill flex-column h-100'>
    <h2 class='text-center'>{{ scenario.title }} ({{ duration }}s)</h2>

    <section id='ci' class='d-flex flex-fill flex-row flex-grow-0'>
      <Job v-for='job in scenario.jobs' :job='job'/>
    </section>

    <section id='narration' class='flex-grow-1 p-4 fs-5'>
    <pre>{{scenario.narration}}</pre>
    </section>

    <section id='transitions' class='d-flex flex-fill flex-row flex-grow-0'>
      <TransitionBtn
          v-for='transition in scenario.transitions'
          :transition='transition'
          @transition='onTransition(transition)'/>
    </section>
  </div>
</template>

<style scoped>
</style>