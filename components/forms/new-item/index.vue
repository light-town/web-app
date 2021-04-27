<template>
  <ui-grid direction="column" align-items="center" class="new-item-form">
    <ui-grid component="form" direction="column" class="new-item-form__form">
      <avatar-item-field :name="name" :mode="mode"></avatar-item-field>
      <template v-for="field in fields">
        <component
          :is="field.component"
          :key="field.position"
          v-model="itemFields[field.index].value"
          :title="field.name"
          :value="field.value"
          :mode="mode"
          :control-btns="field.controlBtns"
          :copyable="true"
        >
          <template
            #control-btn-template(options)="{ btn, activate, deactivate }"
          >
            <ui-dropdown
              :title="btn.name"
              :items="btn.items"
              @close="deactivate"
              @dropdown-item-click="item => handleOptionsItemClick(item, field)"
            >
              <template #anchor="{ open, opened }">
                <ui-button
                  variant="outlined"
                  :class="[
                    'item-field__control-btn',
                    { 'item-field__control-btn_active': opened },
                  ]"
                  @click="
                    e => {
                      activate();
                      open(e);
                    }
                  "
                >
                  {{ btn.name }}
                </ui-button>
              </template>
            </ui-dropdown>
          </template>
        </component>
      </template>
      <text-item-field
        v-if="mode === 'viewing'"
        title="last modified"
        :value="lastModified"
      ></text-item-field>
      <text-item-field
        v-if="mode === 'viewing'"
        title="created"
        :value="created"
      ></text-item-field>
      <button-item-field
        v-if="mode === 'editing'"
        :title="$t('Add field')"
        variant="outlined"
      >
        <template #button-template>
          <add-field-dropdown-button
            :items="schemaFields"
            @dropdown-item-click="item => addNewField(item.key)"
          ></add-field-dropdown-button>
        </template>
      </button-item-field>
    </ui-grid>
  </ui-grid>
</template>

<script>
import TextItemField from './fields/text/index.vue';
import PasswordItemField from './fields/password/index.vue';
import LinkItemField from './fields/link/index.vue';
import AvatarItemField from './fields/avatar/index.vue';
import ButtonItemField from './fields/button/index.vue';
import AddFieldDropdownButton from './add-field-dropdown-button.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiButton from '~/ui/button/index.vue';
import DateFormater from '~/tools/date-formater';

export default {
  name: 'NewItemForm',
  components: {
    UiGrid,
    UiDropdown,
    UiButton,
    TextItemField,
    PasswordItemField,
    LinkItemField,
    AvatarItemField,
    ButtonItemField,
    AddFieldDropdownButton,
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
    name() {
      return this.item?.overview.name ?? '';
    },
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
    schemaFields() {
      return Object.values(this.schema.fields)
        .filter(f => this.isPossibleCreateField(f.name))
        .map(f => ({
          key: f.name,
          name: this.$t(f.name),
        }));
    },
    fields() {
      let index = 0;
      return this.itemFields
        .map(field => {
          const schemasField = this.schema.fields[field.fieldName];
          const options =
            this.mode === 'viewing'
              ? []
              : this.getAvailableFieldOptions(schemasField, field);
          return {
            ...field,
            component: `${schemasField.editor.element}-item-field`,
            controlBtns: options.length
              ? [
                  {
                    key: 'options',
                    name: this.$t('Options'),
                    items: options,
                    click: () => {},
                  },
                ]
              : [],
            index: index++,
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
      this.$emit('input', this.itemFields);
    },
  },
  created() {
    if (this.item?.details) {
      this.itemFields = this.item.details.fields;
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

      this.itemFields.push({
        fieldName,
        name:
          countExistsFields > 0
            ? `${fieldName} ${countExistsFields + 1}`
            : fieldName,
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
      let count = 0;
      this.itemFields.forEach(f => (f.fieldName === fieldName ? count++ : {}));
      return count;
    },
    getAvailableFieldOptions(schemasField, itemField) {
      const options = [];
      const currentPosition = itemField.position - 1;

      if (schemasField.pinned) return options;

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
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
