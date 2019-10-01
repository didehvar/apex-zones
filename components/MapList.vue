<template>
  <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
    <div class="flex justify-between">
      <h1 class="mb-4">{{ map }}</h1>
      <plus @click="createZone" />
    </div>

    <ul class="flex-1">
      <li v-for="zone in zoneList" :key="zone">
        <nuxt-link :to="`/${map}/${zone}`" class="capitalize">{{
          zone
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Plus from '~/components/Plus'

export default {
  components: {
    Plus
  },
  computed: {
    map() {
      return this.$route.params.map || this.$store.getters.defaultMap
    },
    zoneList() {
      return this.$store.getters.zoneList(this.map)
    }
  },
  created() {
    this.$store.dispatch('mapsSnapshot')
  },
  methods: {
    createZone() {
      const { map } = this
      const zone = window.prompt('Zone')

      if (zone) {
        this.$store.dispatch('createZone', { map, zone })
      }
    }
  }
}
</script>
