<template>
  <Navbar />
  <main class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
    <NuxtPage class="flex flex-col items-center h-full max-w-[1336px] " />
  </main>

  <CartDrawer />

  <Newsletter class="my-10" />
  <Footer />
</template>

<script lang="ts" setup>

</script>