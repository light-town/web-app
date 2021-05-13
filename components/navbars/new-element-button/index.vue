<template>
  <ui-dropdown>
    <template #anchor="{ open }">
      <ui-button variant="outlined" class="new-element-button" @click="open">
        <add-icon class="new-element-button__icon" />
        <p class="new-element-button__text">{{ $t('New') }}</p>
      </ui-button>
    </template>
    <template #dropdown-items="{ close }">
      <ui-menu-item id="folder" @click="close">
        <template #text>
          {{ $t('Folder') }}
        </template>
      </ui-menu-item>
      <ui-menu-separator />
      <ui-menu-title :text="$t('Categories')" />
    </template>
  </ui-dropdown>
</template>

<script>
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuTitle from '~/ui/menu/title.vue';
import UiMenuSeparator from '~/ui/menu/separator.vue';
import AddIcon from '~/assets/add.svg?inline';

export default {
  name: 'NewElementButton',
  components: {
    UiButton,
    UiDropdown,
    UiMenuItem,
    UiMenuTitle,
    UiMenuSeparator,
    AddIcon,
  },
  methods: {
    handleDropdownItemClick(e, item) {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
