<template>
  <ui-select v-if="selectedItem" v-model="selectedItem" :items="items">
    <template #anchor="{ selectedItem: item, open }">
      <ui-button variant="text" class="links__btn" @click="open">
        <p>{{ item.name }}</p>
        <arrow-icon class="links__icon"></arrow-icon>
      </ui-button>
    </template>
  </ui-select>
</template>

<script>
import { UiButton, UiSelect } from '@light-town/ui';
import ArrowIcon from '@/assets/right-arrow.svg?inline';

export default {
  name: 'SelectLanguages',
  components: {
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

<style lang="scss" src="./index.scss"></style>
