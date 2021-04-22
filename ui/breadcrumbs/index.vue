<template>
  <ui-grid component="ul" align-items="center" class="ui-breadcrumbs">
    <ui-grid
      v-for="item in visibleItems"
      :key="item[uniqueKey]"
      component="li"
      class="ui-breadcrumbs__item"
      align-items="center"
    >
      <template v-if="!item.isDropdown">
        <slot
          name="item-tempalte"
          :item="item"
          :click="e => hadnleItemClick(item, e)"
        >
          <slot
            :name="`item-tempalte(${item[uniqueKey]})`"
            :item="item"
            :click="e => hadnleItemClick(item, e)"
          >
            <ui-button
              variant="text"
              class="ui-breadcrumbs__item__btn"
              @click="hadnleItemClick(item, $event)"
            >
              {{ item[labelKey] }}
            </ui-button>
          </slot>
        </slot>
      </template>
      <template v-else>
        <ui-dropdown :items="hiddenItems">
          <template #anchor="{ open, opened }">
            <ui-button
              variant="text"
              :class="[
                'ui-breadcrumbs__dotted-btn',
                { 'ui-breadcrumbs__dotted-btn_active': opened },
              ]"
              @click="open"
            >
              <more-icon class="ui-breadcrumbs__dotted-btn__icon"></more-icon>
            </ui-button>
          </template>
          <template #dropdown-item-template="{ item: dropdownItem }">
            <slot
              name="dropdown-item-template"
              :click="e => hadnleItemClick(dropdownItem, e)"
              :item="dropdownItem"
            >
              <ui-menu-item @click="e => hadnleItemClick(dropdownItem, e)">
                <template #text>
                  <p class="ui-breadcrumbs__dropdown-item__text">
                    {{ dropdownItem[labelKey] }}
                  </p>
                </template>
              </ui-menu-item>
            </slot>
          </template>
        </ui-dropdown>
      </template>
      <arrow-icon
        v-if="lastItem !== item"
        class="ui-breadcrumbs__separator"
      ></arrow-icon>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';
import MoreIcon from '~/assets/more.svg?inline';

export default {
  name: 'UiBreadcrumbs',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiMenuItem,
    ArrowIcon,
    MoreIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    uniqueKey: {
      type: String,
      required: false,
      default: 'uuid',
    },
    labelKey: {
      type: String,
      required: false,
      default: 'name',
    },
  },
  computed: {
    visibleItems() {
      if (this.short) {
        return [
          this.items[0],
          { isDropdown: true },
          this.items[this.items.length - 2],
          this.items[this.items.length - 1],
        ];
      }

      return this.items;
    },
    hiddenItems() {
      if (this.short) {
        return this.items.slice(1, this.items.length - 2);
      }

      return [];
    },
    short() {
      return this.items.length > 4;
    },
    lastItem() {
      return this.items.length ? this.items[this.items.length - 1] : null;
    },
  },
  methods: {
    hadnleItemClick(item, e) {
      if (item.isDropdown) return;

      this.$emit('item-click', item, e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
