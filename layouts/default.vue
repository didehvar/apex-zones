<template>
  <div class="px-20 pt-12 pb-8 bg-gray-200 min-h-screen flex flex-col">
    <main class="flex-1 flex">
      <zone-list v-if="render" />

      <div class="min-w-1/5 bg-white shadow-md ml-6 pt-6 flex-1">
        <nuxt v-if="render" />
      </div>
    </main>

    <footer-links />
  </div>
</template>

<script>
import FooterLinks from '~/components/FooterLinks'
import ZoneList from '~/components/ZoneList'

export default {
  components: {
    FooterLinks,
    ZoneList
  },
  data() {
    return {
      render: false
    }
  },
  async created() {
    await this.$store.dispatch('mapsSnapshot')
    this.render = true
  }
}
</script>
