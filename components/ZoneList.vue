<template>
  <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
    <div class="flex justify-between">
      <select
        v-model="map"
        class="mb-4 appearance-none text-xl border-b border-primary"
      >
        <option v-for="mapName in mapList" :key="mapName" :value="mapName">{{
          mapName
        }}</option>
      </select>

      <admin-button @click="createMap" />
    </div>

    <ul class="flex-1">
      <li v-for="zone in zoneList" :key="zone">
        <nuxt-link :to="`/${map}/${zone}`" class="capitalize">{{
          zone
        }}</nuxt-link>
      </li>
    </ul>

    <admin-button text="Add Zone" @click="createZone" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminButton from '~/components/AdminButton'

export default {
  components: {
    AdminButton
  },
  data() {
    return {
      map: this.$route.params.map || this.$store.getters.defaultMap
    }
  },
  computed: {
    ...mapGetters(['mapList']),
    zoneList() {
      return this.$store.getters.zoneList(this.map)
    }
  },
  methods: {
    createMap() {
      const map = window.prompt('Map')

      if (map) {
        this.$store.dispatch('createMap', { map })
      }
    },

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
