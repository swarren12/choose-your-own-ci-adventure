<!--
  ~~ Scenario1.vue - Scenario 1 content.
  -->

<script setup>
import Scenario from '@/components/Scenario.vue';

import scenario from '@/scenarios/scenario1.mjs';
</script>

<template>
  <Scenario :scenario='scenario'/>
</template>