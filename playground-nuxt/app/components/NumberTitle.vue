<template>
  <article class="flex flex-col items-center gap-8">
    <div class="flex relative items-center">
      <div class="mr-4 ">
        <p
          class="flex items-center relative justify-center w-6 h-6 text-xs rounded-md bg-gray-200 dark:bg-neutral-800 font-bold border !border-primary-500">
          {{ number }}
        </p>
      </div>
      <div class="prose dark:prose-invert">
        {{ title }}
      </div>
    </div>
    <slot />
  </article>
</template>

<script lang="ts" setup>
const props = defineProps({
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

</script>

<style></style>