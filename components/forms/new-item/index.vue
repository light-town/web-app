<template>
  <ui-grid direction="column" align-items="center" class="item-model">
    <ui-grid direction="column" class="item-model__model">
      <template v-for="field in fields">
        <component
          :is="field.component"
          :key="field.position"
          v-model="itemFields.find(f => f.id === field.id).value"
          :title="field.name"
          :value="field.value"
          :mode="mode"
          :control-btns="field.controlBtns"
          :copyable="true"
        >
          <template
            #control-btn-template(options)="{ btn, activate, deactivate }"
          >
            <field-options-dropdown-button
              :title="btn.name"
              :items="btn.items"
              @close="deactivate"
              @dropdown-anchor-click="activate()"
              @dropdown-item-click="item => handleOptionsItemClick(item, field)"
            />
          </template>
        </component>
      </template>
      <text-item-field
        v-if="mode === 'viewing'"
        :title="$t('Last modified')"
        :value="lastModified"
      />
      <text-item-field
        v-if="mode === 'viewing'"
        :title="$t('Created')"
        :value="created"
      />
      <button-item-field
        v-if="mode === 'editing'"
        :title="$t('Add field')"
        variant="outlined"
      >
        <template #button-template>
          <add-field-dropdown-button
            :items="avalableCreationFields"
            @dropdown-item-click="item => addNewField(item.key)"
          />
        </template>
      </button-item-field>
    </ui-grid>
  </ui-grid>
</template>

<script>
import core from '@light-town/core';
import { UiGrid } from '@light-town/ui';
import TextItemField from './fields/text/index.vue';
import PasswordItemField from './fields/password/index.vue';
import LinkItemField from './fields/link/index.vue';
import AvatarItemField from './fields/avatar/index.vue';
import ButtonItemField from './fields/button/index.vue';
import AddFieldDropdownButton from './add-field-dropdown-button.vue';
import FieldOptionsDropdownButton from './field-options-dropdown-button.vue';
import DateFormater from '~/tools/date-formater';

export default {
  name: 'ItemModel',
  components: {
    UiGrid,
    TextItemField,
    PasswordItemField,
    LinkItemField,
    AvatarItemField,
    ButtonItemField,
    AddFieldDropdownButton,
    FieldOptionsDropdownButton,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: false,
      default: 'viewing',
    },
  },
  data() {
    return {
      itemFields: [],
    };
  },
  computed: {
    lastModified() {
      return DateFormater.formatFromString(this.item.lastUpdatedAt);
    },
    created() {
      return DateFormater.formatFromString(this.item.createdAt);
    },
    pinnedPositions() {
      return Object.values(this.schema.fields)
        .filter(t => t.pinned)
        .map(t => t.position - 1);
    },
    avalableCreationFields() {
      return Object.values(this.schema.fields)
        .filter(f => this.isPossibleCreateField(f.name))
        .map(f => ({
          key: f.name,
          name: this.$t(f.name),
        }));
    },
    fields() {
      return this.itemFields
        .map(field => {
          const fieldStructure = this.schema.fields[field.fieldName];
          const component = this.getViewComponent(fieldStructure);
          const options = this.getAvailableFieldOptions(fieldStructure, field);
          const controlBtns = this.getControlBtns(options);

          return {
            ...field,
            component,
            controlBtns,
          };
        })
        .sort((a, b) => {
          if (a.position < b.position) return -1;
          if (a.position > b.position) return 1;
          return 0;
        });
    },
  },
  watch: {
    itemFields() {
      if (!this.itemFields.length) return;

      const name = this.itemFields.find(f => f.fieldName === 'Avatar')?.value;

      this.$emit('input', {
        ...(this.item ?? {}),
        overview: {
          name,
          fields: this.itemFields.filter(
            field => this.schema.fields[field.fieldName].useInOverview
          ),
        },
        details: {
          fields: this.itemFields.filter(
            field => !this.schema.fields[field.fieldName].useInOverview
          ),
        },
      });
    },
  },
  created() {
    if (this.item) {
      this.itemFields = [
        ...this.item?.overview?.fields,
        ...this.item?.details?.fields,
      ];
      return;
    }

    const schemasFields = Object.values(this.schema.fields).sort((a, b) => {
      if (a.position < b.position) return -1;
      if (a.position > b.position) return 1;
      return 0;
    });

    for (const schemasField of schemasFields) {
      if (schemasField.required) {
        for (let i = 0; i < schemasField.count.min; ++i)
          this.addNewField(schemasField.name);
      }
    }
  },
  methods: {
    handleOptionsItemClick(item, field) {
      switch (item.key) {
        case 'delete': {
          const currentFieldPosition = field.position;

          this.itemFields = this.itemFields
            .filter(f => f.name !== field.name)
            .map(f => {
              if (f.position < currentFieldPosition) return f;
              return {
                ...f,
                position: f.position - 1,
              };
            });
          return;
        }
        case 'move-up': {
          const currentFieldIndex = this.itemFields.findIndex(
            f => f.position === field.position
          );
          const upperFieldIndex = this.itemFields.findIndex(
            f => f.position === field.position - 1
          );

          this.itemFields[currentFieldIndex].position--;
          this.itemFields[upperFieldIndex].position++;

          return;
        }
        case 'move-down': {
          const currentFieldIndex = this.itemFields.findIndex(
            f => f.position === field.position
          );
          const bottomFieldIndex = this.itemFields.findIndex(
            f => f.position === field.position + 1
          );

          this.itemFields[currentFieldIndex].position++;
          this.itemFields[bottomFieldIndex].position--;
        }
      }
    },
    addNewField(fieldName) {
      const countExistsFields = this.countExistsFields(fieldName);
      const name =
        countExistsFields > 0
          ? `${fieldName} ${countExistsFields + 1}`
          : fieldName;

      this.itemFields.push({
        id: core.encryption.common.generateCryptoRandomString(16),
        fieldName,
        name,
        position: this.itemFields.length + 1,
      });
    },
    isPossibleCreateField(fieldName) {
      const countExistsFields = this.countExistsFields(fieldName);
      const schemasField = this.schema.fields[fieldName];

      return (
        !schemasField.count?.max ||
        schemasField.count.max >= countExistsFields + 1
      );
    },
    countExistsFields(fieldName) {
      return this.itemFields.filter(f => f.fieldName === fieldName).length;
    },
    getAvailableFieldOptions(schemasField, itemField) {
      const options = [];
      const currentPosition = itemField.position - 1;

      if (schemasField.pinned || this.mode === 'viewing') return options;

      if (
        currentPosition - 1 >= 0 &&
        !this.pinnedPositions.includes(currentPosition - 1)
      )
        options.push({ key: 'move-up', name: this.$t('Move up') });

      if (
        currentPosition + 1 < this.itemFields.length &&
        !this.pinnedPositions.includes(currentPosition + 1)
      )
        options.push({ key: 'move-down', name: this.$t('Move down') });

      options.push({ key: 'delete', name: this.$t('Delete') });

      return options;
    },
    getViewComponent(fieldStructure) {
      const el =
        this.mode === 'viewing'
          ? fieldStructure.view.element
          : fieldStructure.editor.element;
      return `${el}-item-field`;
    },
    getControlBtns(options) {
      if (!options.length) return [];
      return [
        {
          key: 'options',
          name: this.$t('Options'),
          items: options,
          click: () => {},
        },
      ];
    },
  },

  /* category: {
        details: {
          schema: {
            fields: {
              Password: {
                name: 'Password',
                view: {
                  element: 'password',
                },
                editor: {
                  element: 'password',
                },
                position: 2,
                count: {
                  max: 1,
                  min: 1,
                },
                required: true,
                pinned: true,
                useInOverview: false,
              },
              Username: {
                name: 'Username',
                view: {
                  element: 'text',
                },
                editor: {
                  element: 'text',
                },
                position: 1,
                count: {
                  max: 1,
                  min: 1,
                },
                required: true,
                pinned: true,
                useInOverview: true,
              },
              'Website URL': {
                name: 'Website URL',
                view: {
                  element: 'link',
                },
                editor: {
                  element: 'link',
                },
                required: false,
                pinned: false,
                useInOverview: true
              },
            },
          },
        },
      }, */

  /**
   *      overview: {
   *        name: '...',
   *        desc: '...',
   *        fields: [{...}, {...}, {...}]
   *      },
   *      details: {
   *        fields: []
   *      }
   */
};
</script>

<style lang="scss" src="./index.scss"></style>
