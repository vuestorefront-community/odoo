<template>
  <a :href="href" class="not-prose group border transition-colors
      rounded-lg dark:bg-neutral-900 block card h-full
      text-black dark:text-white
      hover:bg-gray-50 dark:hover:bg-neutral-800
      ">
    <div class="p-8 w-full h-full flex flex-col">
      <div class="flex items-center">
        <slot name="icon" />
      </div>
      <p class="font-semibold text-xl">
        {{ title }}
      </p>
      <p class="mt-4 text-sm font-medium opacity-70">
        {{ description }}
      </p>
    </div>
  </a>
</template>

<script lang="ts" setup>
defineProps<{
  href: string;
  title: string;
  description: string;
}>();
</script>

<style></style>