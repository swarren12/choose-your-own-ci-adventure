<!--
  ~~ Scenario2.vue - Scenario 2 content
  -->

<script setup>
import Scenario from '@/components/Scenario.vue';

import scenario from '@/scenarios/scenario2.mjs';
</script>

<template>
  <Scenario :scenario='scenario'/>
</template>