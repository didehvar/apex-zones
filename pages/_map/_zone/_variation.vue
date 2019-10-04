<template>
  <div class="px-20 pt-12 pb-8 bg-gray-200 min-h-screen flex flex-col">
    <main class="flex-1 flex">
      <zone-list :map="map" />

      <div class="min-w-1/5 bg-white shadow-md ml-6 pt-6 flex-1">
        <zone :map="map" />
      </div>
    </main>

    <footer-links />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Zone from '~/components/Zone'
import ZoneList from '~/components/ZoneList'
import FooterLinks from '~/components/FooterLinks'

export default {
  components: {
    Zone,
    ZoneList,
    FooterLinks
  },

  data() {
    return {
      map: this.$route.params.map
    }
  },

  computed: {
    ...mapGetters(['defaultMap'])
  },

  created() {
    this.$store.dispatch('mapsSnapshot')
  }
}
</script>
