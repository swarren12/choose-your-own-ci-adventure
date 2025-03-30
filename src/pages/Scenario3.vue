<!--
  ~~ Scenario3.vue - Scenario 3 content
  -->

<script setup>
import Scenario from '@/components/Scenario.vue';

import scenario from '@/scenarios/scenario3.mjs';
</script>

<template>
  <Scenario :scenario='scenario'/>
</template>