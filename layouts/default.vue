<template>
  <div class="px-20 pt-12 pb-8 bg-gray-200 min-h-screen flex flex-col">
    <main class="flex-1 flex">
      <map-list />

      <div class="min-w-1/5 bg-white shadow-md ml-6 pt-6 flex-1">
        <nuxt />
      </div>
    </main>

    <footer-links />
  </div>
</template>

<script>
import FooterLinks from '~/components/FooterLinks'
import MapList from '~/components/MapList'

export default {
  components: {
    FooterLinks,
    MapList
  }
}
</script>
