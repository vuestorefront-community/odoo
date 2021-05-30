<template>
  <div class="sf-input__error-message">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>