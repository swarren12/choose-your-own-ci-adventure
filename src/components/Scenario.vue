<!--
  ~~ Scenario.vue - A generic scenario's content.
  -->

<script setup>
import Job from '@/components/Job.vue';
import TransitionBtn from '@/components/Transition.vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {ref} from 'vue';

const props = defineProps(['scenario']);

const start = props['scenario'];
const scenario = ref(start);
const duration = ref(0);

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


  window.open(`https://dreampuf.github.io/GraphvizOnline/?engine=dot#${encodeURIComponent(content)}`, '_blank')
  // const link_el$ = document.createElement('a');
  // link_el$.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  // link_el$.setAttribute('target', '_blank');
  // link_el$.setAttribute('download', 'graph.dot');
  //
  // document.body.appendChild(link_el$);
  // link_el$.click();
  // document.body.removeChild(link_el$);
}

</script>

<template>
  <div class='d-flex flex-fill flex-column h-100'>
    <h2 class='text-center'>
      {{ scenario.title }}
      ({{ duration }}s)
      <font-awesome-icon :icon='["fas", "exclamation-triangle"]' @click='create_dot_graph'/>
    </h2>

    <section id='ci' class='d-flex flex-fill flex-row flex-grow-0'>
      <Job v-for='job in scenario.jobs' :job='job'/>
    </section>

    <section id='narration' class='flex-grow-1 p-4 fs-5'>
      <pre>{{ scenario.narration }}</pre>
    </section>

    <section id='transitions' class='d-flex flex-fill flex-row flex-grow-0'>
      <TransitionBtn
          v-for='transition in scenario.transitions'
          :transition='transition'
          @transition='on_transition(transition)'/>
    </section>
  </div>
</template>

<style scoped>
</style>