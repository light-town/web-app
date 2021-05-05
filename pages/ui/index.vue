<template>
  <client-only>
    <ui-grid direction="column" class="templates">
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Buttons</p>
        <ui-grid direction="column" class="templates__section">
          <ui-button variant="text" class="templates__button"
            >Text button</ui-button
          >
          <ui-button variant="outlined" class="templates__button"
            >Outlined button</ui-button
          >
          <ui-button variant="contained" class="templates__button"
            >Contained button</ui-button
          >
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Disabled Buttons</p>
          <ui-button variant="text" class="templates__button" :disabled="true"
            >Disabled Text button</ui-button
          >
          <ui-button
            variant="outlined"
            class="templates__button"
            :disabled="true"
            >Disabled Outlined button</ui-button
          >
          <ui-button
            variant="contained"
            class="templates__button"
            :disabled="true"
            >Disabled Contained button</ui-button
          >
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Loading Buttons</p>
          <ui-button variant="text" class="templates__button" :loading="true"
            >Loading Text button</ui-button
          >
          <ui-button
            variant="outlined"
            class="templates__button"
            :loading="true"
            >Loading Outlined button</ui-button
          >
          <ui-button
            variant="contained"
            class="templates__button"
            :loading="true"
            >Loading Contained button</ui-button
          >
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Token Selector</p>
        <ui-grid direction="column" class="templates__section">
          <ui-token-selector
            :dropdown-items="[
              {
                id: '1',
                name: 'Vault',
              },
              {
                id: '2',
                name: 'Folder',
              },
              {
                id: '3',
                name: 'Creator',
              },
            ]"
            :loading="false"
          ></ui-token-selector>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Loading Token Selector</p>
          <ui-token-selector
            :dropdown-items="[]"
            :loading="true"
          ></ui-token-selector>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Empty Token Selector</p>
          <ui-token-selector
            :dropdown-items="[]"
            :loading="false"
          ></ui-token-selector>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Editable Token Selector</p>
          <ui-token-selector
            :dropdown-items="[]"
            :allow-user-defined-tokens="true"
            :loading="false"
          ></ui-token-selector>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Editable Token Selector</p>
          <search-teams-by-tokens></search-teams-by-tokens>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Dropdown</p>
        <ui-grid direction="column" class="templates__section">
          <ui-dropdown
            title="dropdown"
            :items="[
              { key: '2', name: 'First Item' },
              { key: '3', name: 'Second Item' },
              { key: '4', name: 'Third Item' },
            ]"
            @dropdown-item-click="handleDropdownItemClick"
          >
            <template #dropdown-item-template="{ item, click }">
              <ui-menu-item :id="item.key" :key="item.key" @click="click">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </template>
          </ui-dropdown>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Loading Dropdown</p>
          <ui-dropdown
            title="dropdown"
            :items="[]"
            :loading="true"
            @dropdown-item-click="handleDropdownItemClick"
          >
            <template #dropdown-item-template="{ item, click }">
              <ui-menu-item :id="item.key" :key="item.key" @click="click">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </template>
          </ui-dropdown>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Select</p>
        <ui-grid direction="column" class="templates__section">
          <ui-select
            :items="[
              { key: '1', name: 'none' },
              { key: '2', name: 'First Item' },
              { key: '3', name: 'Second Item' },
              { key: '4', name: 'Third Item' },
            ]"
            :value="{ key: '3', name: 'Second Item' }"
            class="templates__select"
          >
            <template #anchor="{ selectedItem, open }">
              <ui-button variant="text" @click="open">
                {{ selectedItem.name }}
              </ui-button>
            </template>
            <template #items="{ item, select }">
              <ui-menu-item :id="item.key" :key="item.key" @click="select">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </template>
          </ui-select>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Loading Select</p>
          <ui-select
            :items="[]"
            :value="{ key: '3', name: 'Second Item' }"
            :loading="true"
          >
            <template #anchor="{ selectedItem, open }">
              <ui-button variant="text" @click="open">
                {{ selectedItem.name }}
              </ui-button>
            </template>
            <template #items="{ item, select }">
              <ui-menu-item :id="item.key" :key="item.key" @click="select">
                <template #text>
                  {{ item.name }}
                </template>
              </ui-menu-item>
            </template>
          </ui-select>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Context Menu</p>
        <ui-context-menu @menu-item-click="handleItemClick">
          <ui-grid
            ref="contextmenu"
            class="templates__context-menu"
            align-items="center"
            justify="center"
          >
            Click Right Button
          </ui-grid>
          <template #menu-items>
            <ui-menu-item id="create">
              <template #text> Create </template>
              <template #submenu:items>
                <ui-menu-item id="create-folder">
                  <template #text> Folder </template>
                </ui-menu-item>
                <ui-menu-separator></ui-menu-separator>
                <ui-menu-item id="create-item">
                  <template #text> Item </template>
                  <template #submenu:items>
                    <ui-menu-item id="create-item-password">
                      <template #text> Password </template>
                    </ui-menu-item>
                    <ui-menu-item id="create-item-secure-note">
                      <template #text> Secure Note </template>
                    </ui-menu-item>
                  </template>
                </ui-menu-item>
              </template>
            </ui-menu-item>
            <ui-menu-separator></ui-menu-separator>
            <ui-menu-item id="rename">
              <template #text> Rename </template>
            </ui-menu-item>
            <ui-menu-separator></ui-menu-separator>
            <ui-menu-item id="detele-folder">
              <template #text> Delete </template>
            </ui-menu-item>
          </template>
        </ui-context-menu>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Breadcrumbs</p>
        <ui-grid direction="column" class="templates__section">
          <ui-breadcrumbs
            :items="[
              { uuid: '1', name: 'Folder' },
              { uuid: '2', name: 'Folder 2' },
              { uuid: '3', name: 'Folder 3' },
            ]"
          ></ui-breadcrumbs>
        </ui-grid>
        <ui-grid direction="column" class="templates__section">
          <p class="templates__title">Breadcrumbs More</p>
          <ui-breadcrumbs
            :items="[
              { uuid: '1', name: 'Folder' },
              { uuid: '2', name: 'Folder 2' },
              { uuid: '3', name: 'Folder 3' },
              { uuid: '4', name: 'Folder 4' },
              { uuid: '5', name: 'Folder 5' },
              { uuid: '6', name: 'Folder 6' },
            ]"
          ></ui-breadcrumbs>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="templates__section">
        <p class="templates__title">Cards</p>
        <ui-grid direction="row" class="templates__row">
          <entry-card
            variant="vault"
            name="Personal"
            desc="Your default vault for storing items. zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            :entries-count="11"
          ></entry-card>
          <entry-card
            variant="vault"
            name="Personal zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            desc="Your default vault for storing items."
          ></entry-card>
          <entry-card variant="vault" name="Personal" desc=""></entry-card>
          <entry-card
            variant="vault"
            name="Personal"
            desc=""
            :entries-count="9"
          ></entry-card>
          <skeleton-card variant="primary"></skeleton-card>
        </ui-grid>
        <ui-grid direction="row" class="templates__row">
          <entry-card
            variant="folder"
            name="Folder"
            desc="Your default folder for storing items. zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            :entries-count="11"
          ></entry-card>
          <entry-card
            variant="folder"
            name="Folder zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            desc="Your default folder for storing items."
          ></entry-card>
          <entry-card variant="folder" name="Folder" desc=""></entry-card>
          <entry-card
            variant="folder"
            name="Folder"
            desc=""
            :entries-count="9"
          ></entry-card>
          <skeleton-card variant="primary"></skeleton-card>
        </ui-grid>
        <ui-grid direction="row" class="templates__row">
          <entry-card
            variant="item"
            name="Light Town Account"
            desc="A3-A6488L •••••• ••••• ••••• ••••• •••••"
            datetime="18.09.17 at 15:58"
            category-name="Password"
            :tags="['Starter Kit']"
          ></entry-card>
          <entry-card
            variant="item"
            name="Item Name zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            desc="Item Desc zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            datetime="18.09.17 at 15:58"
            category-name="Note"
            :tags="['Security']"
          ></entry-card>
          <skeleton-card variant="secondary"></skeleton-card>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </client-only>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiSelect from '~/ui/select/index.vue';
import UiContextMenu from '~/ui/context-menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuSeparator from '~/ui/menu/separator.vue';
import UiTokenSelector from '~/ui/token-selector/index.vue';
import UiBreadcrumbs from '~/ui/breadcrumbs/index.vue';

import SearchTeamsByTokens from '~/components/search-lines/vault-content/index.vue';
import EntryCard from '~/components/cards/entry/index.vue';
import SkeletonCard from '~/components/cards/skeleton/index.vue';

export default {
  name: 'IndexPage',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiSelect,
    UiContextMenu,
    UiMenuItem,
    UiMenuSeparator,
    UiTokenSelector,
    UiBreadcrumbs,
    SearchTeamsByTokens,
    EntryCard,
    SkeletonCard,
  },
  methods: {
    handleItemClick(vm) {
      console.log(vm.id);
    },
    handleDropdownItemClick(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
