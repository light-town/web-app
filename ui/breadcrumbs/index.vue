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
          :click="e => handleItemClick(e, item, () => {})"
        >
          <slot
            :name="`item-tempalte(${item[uniqueKey]})`"
            :item="item"
            :click="e => handleItemClick(e, item, () => {})"
          >
            <ui-button
              variant="text"
              class="ui-breadcrumbs__item__btn"
              @click="handleItemClick($event, item, () => {})"
            >
              {{ item[labelKey] }}
            </ui-button>
          </slot>
        </slot>
      </template>
      <template v-else>
        <ui-dropdown>
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
          <template #dropdown-items="{ close }">
            <template v-for="dropdownItem in hiddenItems">
              <slot
                name="dropdown-item-template"
                :click="e => handleItemClick(e, dropdownItem, close)"
                :item="dropdownItem"
              >
                <ui-menu-item
                  :id="dropdownItem[uniqueKey]"
                  @click="e => handleItemClick(e, dropdownItem, close)"
                >
                  <template #text>
                    <p class="ui-breadcrumbs__dropdown-item__text">
                      {{ dropdownItem[labelKey] }}
                    </p>
                  </template>
                </ui-menu-item>
              </slot>
            </template>
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
    handleItemClick(e, item, click) {
      if (item.isDropdown) return;

      click(e);

      this.$emit('item-click', item, e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
