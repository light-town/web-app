<template>
  <ui-grid component="ul" direction="column" class="ui-tree-view">
    <nested-node
      v-for="node in upperNodes"
      :key="node[uniqueNodeKey]"
      :node="node"
      :nested-node-key="nestedNodeKey"
      :unique-node-key="uniqueNodeKey"
    >
      <template #default="{ node, nestedNodes }">
        <slot
          :node="node"
          :nestedNodes="nestedNodes"
          :nested-node-key="nestedNodeKey"
          :unique-node-key="uniqueNodeKey"
        ></slot>
      </template>
    </nested-node>
  </ui-grid>
</template>

<script>
import NestedNode from './nested-node.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiTreeView',
  components: {
    UiGrid,
    NestedNode,
  },
  provide() {
    const data = {};
    Object.defineProperty(data, 'nodes', {
      enumerable: true,
      get: () => this.nodes,
    });

    return {
      'tree-view-data': data,
    };
  },
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    nestedNodeKey: {
      type: String,
      required: true,
    },
    uniqueNodeKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    upperNodes() {
      return this.nodes.filter(n => !n[this.nestedNodeKey]);
    },
  },
  methods: {
    nestedNodes(node) {
      return this.nodes.filter(
        n =>
          n[this.uniqueNodeKey] !== node[this.uniqueNodeKey] &&
          n[this.nestedNodeKey] === node[this.uniqueNodeKey]
      );
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
