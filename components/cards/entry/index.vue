<template>
  <vault-card v-if="isVault" v-bind="$attrs" v-on="$listeners"></vault-card>
  <folder-card
    v-else-if="isFolder"
    v-bind="$attrs"
    v-on="$listeners"
  ></folder-card>
  <item-card v-else-if="isItem" v-bind="$attrs" v-on="$listeners"></item-card>
</template>

<script>
import VaultCard from '../vault/index.vue';
import FolderCard from '../folder/index.vue';
import ItemCard from '../item/index.vue';

export default {
  name: 'EntryCard',
  components: {
    VaultCard,
    FolderCard,
    ItemCard,
  },
  props: {
    variant: {
      type: String,
      required: false,
      default: 'vault',
      validator(val) {
        return ['vault', 'folder', 'item'].includes(val);
      },
    },
  },
  computed: {
    isVault() {
      return this.variant === 'vault';
    },
    isFolder() {
      return this.variant === 'folder';
    },
    isItem() {
      return this.variant === 'item';
    },
  },
};
</script>
