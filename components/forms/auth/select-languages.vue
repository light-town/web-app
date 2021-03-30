<template>
  <ui-select v-model="selectedItem" :items="items">
    <template #anchor="{ selectedItem: item, handle }">
      <ui-button variant="text" class="links__btn" @click="handle">
        <ui-grid align-items="center">
          <p>{{ item.name }}</p>
          <arrow-icon class="links__icon"></arrow-icon>
        </ui-grid>
      </ui-button>
    </template>
    <template #items="{ handle }">
      <ui-grid direction="column" class="select-langs__items">
        <ui-grid
          v-for="item in items"
          :key="item.iso"
          class="select-langs__item"
          @click="handle(item)"
        >
          <p>{{ item.name }}</p>
        </ui-grid>
      </ui-grid>
    </template>
  </ui-select>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiSelect from '~/ui/select/index.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'SelectLanguages',
  components: {
    UiGrid,
    UiButton,
    UiSelect,
    ArrowIcon,
  },
  data() {
    return {
      selectedItem: null,
      items: [],
    };
  },
  watch: {
    selectedItem() {
      if (this.selectedItem?.code) this.$i18n.setLocale(this.selectedItem.code);
    },
  },
  created() {
    this.items = this.$i18n.locales;

    const currentLang = this.$cookies.get('i18n_locale');
    const lang = this.$i18n.locales.find(l => l.code === currentLang);

    this.selectedItem = lang;
  },
};
</script>

<style lang="scss" src="./select-languages.scss"></style>
