<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
    default: "Insira uma label",
  },
  type: {
    type: String,
    default: "text",
  },
  icon: {
    type: String,
    default: "info",
  },
  appendIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <q-input class="login-input" outlined :label="label" :type="type">
    <template v-slot:prepend v-if="!appendIcon">
      <q-icon :name="icon" />
    </template>
    <template v-slot:append v-if="appendIcon">
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<style lang="scss">
.login-input .q-field__control {
  border-radius: 16px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fd 100%);
}

.login-input {
  &.q-field--focused {
    .q-field__control {
      box-shadow:
        0 0 0 3px rgba(91, 158, 240, 0.2),
        0 4px 15px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
  }

  .q-field__control {
    transition: all 0.3s ease-in-out;
  }
}

.q-field--focused {
  .q-field__prepend .q-icon {
    color: $primary;
  }
}
</style>
