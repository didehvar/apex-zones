<template>
  <div class="px-20 pt-12 pb-8 bg-gray-200 min-h-screen flex flex-col">
    <main class="flex-1 flex">
      <zone-list :map="map" />

      <div class="min-w-1/5 bg-white shadow-md ml-6 pt-6 flex-1">
        <zone :map="map" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Zone from '~/components/Zone'
import ZoneList from '~/components/ZoneList'

export default {
  components: {
    Zone,
    ZoneList
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
    if (!this.defaultMap) {
      this.$store.dispatch('mapsSnapshot')
    }
  },

  middleware: 'auth'
}
</script>
