<template>
  <Button
    :type="type"
    :disabled="disabled"
    :severity="severityMap[variant]"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false
  }
);

defineEmits<{
  click: [];
}>();

const severityMap = {
  primary: undefined, // default
  secondary: 'secondary',
  success: 'success',
  danger: 'danger'
};
</script>
