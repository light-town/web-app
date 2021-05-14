<template>
  <ui-dropdown :title="title" @close="$emit('close')">
    <template #anchor="{ open, opened }">
      <ui-button
        variant="outlined"
        class="item-field__control-btn"
        :class="{ 'item-field__control-btn_active': opened }"
        @click="handleDropdownAnchorClick($event, open)"
      >
        {{ title }}
      </ui-button>
    </template>
    <template #dropdown-items="{ close }">
      <ui-menu-item
        v-for="item in items"
        :id="item.key"
        :key="item.key"
        @click="handleDropdownItemClick($event, item, close)"
      >
        <template #text> {{ item.name }} </template>
      </ui-menu-item>
    </template>
  </ui-dropdown>
</template>

<script>
import UiDropdown from '~/ui/dropdown/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';

export default {
  name: 'FieldOptionsDropdownButton',
  components: {
    UiDropdown,
    UiButton,
    UiMenuItem,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    handleDropdownAnchorClick(e, open) {
      this.$emit('dropdown-anchor-click');
      open(e);
    },
    handleDropdownItemClick(e, item, close) {
      this.$emit('dropdown-item-click', item);
      close(e);
    },
  },
};
</script>

<style lang="scss" src="./index.vue"></style>
