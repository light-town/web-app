<template>
  <ui-dropdown :title="$t('Add field')">
    <template #anchor="{ open }">
      <ui-button
        variant="outlined"
        class="button-item-field__btn item-model__add-field-btn"
        @click="open"
      >
        {{ $t('Add field') }}
      </ui-button>
    </template>
    <template #dropdown-items="{ close }">
      <ui-menu-item
        v-for="item in items"
        :id="item.key"
        :key="item.key"
        @click="handleMenuItemClick($event, item, close)"
      >
        <template #text>
          {{ item.name }}
        </template>
      </ui-menu-item>
    </template>
  </ui-dropdown>
</template>

<script>
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';

export default {
  name: 'AddItemDropdownButton',
  components: {
    UiButton,
    UiDropdown,
    UiMenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleMenuItemClick(event, item, close) {
      this.$emit('dropdown-item-click', item);
      close(event);
    },
  },
};
</script>

<style lang="scss"></style>
