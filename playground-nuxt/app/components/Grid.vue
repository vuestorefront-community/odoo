<script setup lang="ts">
withDefaults(
  defineProps<{
    columns?: 2 | 3 | 4
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    columns: 2,
    gap: 'md'
  }
)

const slots = useSlots()
</script>

<template>
  <div class="grid grid-cols-12" :class="{
    'gap-2': gap === 'xs',
    'gap-4': gap === 'sm',
    'gap-8': gap === 'md',
    'gap-12': gap === 'lg',
    'gap-16': gap === 'xl'
  }">
    <div v-for="i in Object.keys(slots).length" :key="i" :class="{
      'md:col-span-6 col-span-12': columns === 2,
      'xl:col-span-4 md:col-span-6 col-span-12': columns === 3,
      'xl:col-span-3 md:col-span-6 col-span-12': columns === 4
    }">
      <slot :name="i.toString()" />
    </div>
  </div>
</template>
