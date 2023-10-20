<template>
  <div>
    <div class="flex px-4 bg-neutral-600 rounded-t-lg py-2 gap-x-2">
      <button v-for="(lang, index) in  data" :key="lang.language" @click="selectTab(index)"
        class="font-mono text-sm px-2 py-1 rounded text-white" :class="{
          'bg-primary-600': selectedTab === index
        }">
        {{ lang.language }}
      </button>
    </div>
    <div class="bg-neutral-800 rounded-b-lg p-4">
      <div class="mb-2" v-for="(command, index) in data[selectedTab]" :key="index">
        <div class="font-mono text-sm text-gray-200">
          {{ command.command }}
        </div>
        <div class="text-sm text-gray-600">{{ command.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface LanguageCommands {
  language: string;
  commands: {
    command: string;
    description: string;
  }
};

const props = defineProps({
  data: {
    type: Array as PropType<LanguageCommands[]>,
    required: true
  }
})

const selectedTab = ref(0);

function selectTab(index: number) {
  selectedTab.value = index;
}
</script>

<style></style>