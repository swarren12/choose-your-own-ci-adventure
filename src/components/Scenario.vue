<!--
  ~~ Scenario.vue - A generic scenario's content.
  -->

<script setup>
import Job from '@/components/Job.vue';
import TransitionBtn from '@/components/Transition.vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {computed, ref} from 'vue';

const props = defineProps(['scenario']);

const start = props['scenario'];
const scenario = ref(start);
const duration = ref(0);

const formatted_duration = computed(() => {
  const total_seconds = duration.value;
  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor((total_seconds - (hours * 60 * 60)) / 60);
  const seconds = (total_seconds - (hours * 60 * 60)) - (minutes * 60);

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
})

/*
 * Handle a transition being clicked.
 */
const on_transition = function (transition) {
  console.log(transition);
  const next = transition.apply(scenario.value);
  console.log(next);

  scenario.value = next;
  duration.value += transition.duration;
}

/*
 * Create a `dot` file containing a graph of the scenario.
 */
const _create_dot_graph = function (current, graph, node) {
  const transitions = current.transitions;
  for (let i = 0; i < transitions.length; i++) {
    const transition = transitions[i];
    const tid = 'T' + transition.id;

    if (!node.next[tid]) {
      node.next[tid] = {'id': tid, 'duration': transition.duration};
      const next = transition.apply(current);
      const next_node = graph[tid] || (graph[tid] = {'label': transition.description, 'next': {}});
      _create_dot_graph(next, graph, next_node);
    }
  }
}

/*
 * Create a `dot` file containing a graph of the scenario.
 */
const create_dot_graph = function () {
  const graph = {'intro': {'label': 'Introduction', 'next': {}}};
  _create_dot_graph(start, graph, graph['intro']);

  let content = 'digraph ' + start.id.replaceAll(/[^A-Za-z]/g, '_') + ' {\n';
  for (let state in graph) {
    const node = graph[state];
    if (!!node.label) content += `    ${state} [label="${node.label}"];\n`;
    for (let id in node.next) {
      const transition = node.next[id];
      content += `    ${state} -> ${transition.id} [label="${transition.duration}s"];\n`;
    }
  }
  content += '}\n';

  window.open(`https://dreampuf.github.io/GraphvizOnline/?engine=dot#${encodeURIComponent(content)}`, '_blank');
}

</script>

<template>
  <div class='d-flex flex-fill flex-column h-100'>
    <header class='d-flex flex-row'>
      <h1>{{ scenario.title }}</h1>
      <h2 class='flex-fill'> Choose your own adventure! </h2>
    </header>

    <section id='ci' class='d-flex flex-row flex-grow-0'>
      <Job v-for='job in scenario.jobs' :job='job'/>
    </section>

    <section id='narration' class='flex-grow-1 p-4 fs-5 position-relative'>
      <pre>{{ scenario.narration }}</pre>

      <div id='controls'>
        <font-awesome-icon :icon='["fas", "exclamation-triangle"]' @click='create_dot_graph'/>
        <h2>({{ formatted_duration }})</h2>
      </div>
    </section>

    <section id='transitions' class='d-flex flex-row flex-grow-0'>
      <TransitionBtn
          v-for='transition in scenario.transitions'
          :transition='transition'
          @transition='on_transition(transition)'/>
    </section>
  </div>
</template>

<style scoped>
header {
  background-color: darkgray;
  margin: 0;
  padding: 0;
  flex-grow: 0;
  vertical-align: center;
  border-bottom: 2px solid black;
}

header h1 {
  margin: 0;
  padding: 0.5em;
  text-align: left;
  align-self: flex-end;
}

header h2 {
  margin: 0;
  padding: 0.5em;
  text-align: right;
  align-self: flex-end;
}

#ci {
  background: lightslategray;
  border-bottom: 1px dashed black;
}

#controls {
  position: absolute;
  right: 2em;
  bottom: 2em;
  text-align: right;
}

#transitions {
  background: lightslategray;
  border-bottom: 1px dashed black;
}
</style>