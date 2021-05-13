<template>
  <ui-breadcrumbs :items="items" class="h-9" @item-click="handleItemClick">
    <template #item-tempalte="{ item, click }">
      <ui-button
        variant="text"
        class="ui-breadcrumbs__item__btn"
        @click="click"
      >
        {{ item.overview.name }}
      </ui-button>
    </template>
    <template #dropdown-item-template="{ click, item }">
      <ui-menu-item :id="item.uuid" @click="click">
        <template #icon>
          <folder-icon
            class="ui-breadcrumbs__dropdown-item__icon"
          ></folder-icon>
        </template>
        <template #text>
          <p class="ui-breadcrumbs__dropdown-item__text">
            {{ item.overview.name }}
          </p>
        </template>
      </ui-menu-item>
    </template>
  </ui-breadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex';
import UiButton from '~/ui/button/index.vue';
import UiBreadcrumbs from '~/ui/breadcrumbs/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import FolderIcon from '~/assets/folder.svg?inline';

export default {
  name: 'Breadcrumbs',
  components: {
    UiButton,
    UiBreadcrumbs,
    UiMenuItem,
    FolderIcon,
  },
  computed: {
    ...mapGetters(['currentVault', 'currentVaultFolder', 'pathToFolder']),
    items() {
      return [
        { ...this.currentVault, isVault: true },
        ...this.pathToFolder(this.currentVaultFolder?.uuid),
      ];
    },
  },
  methods: {
    handleItemClick(item) {
      if (item.isVault)
        return this.$router.push(`/vaults/${this.currentVault.uuid}/`);

      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${item.uuid}`
      );
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
