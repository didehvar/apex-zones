<template>
  <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
    <div class="flex justify-between">
      <select
        v-model="selectedMap"
        class="mb-4 appearance-none text-xl border-b border-primary"
        @change="changeMap"
      >
        <option v-for="mapName in mapList" :key="mapName" :value="mapName">{{
          mapName
        }}</option>
      </select>

      <div v-if="authenticated">
        <button class="btn-delete" @click="deleteMap">-</button>
        <button class="btn-primary" @click="createMap">+</button>
      </div>
    </div>

    <div class="flex-1">
      <div v-for="zone in zoneList" :key="zone" class="flex items-center">
        <nuxt-link :to="`/${map}/${zone}`" class="flex-1 capitalize">{{
          zone
        }}</nuxt-link>

        <button
          v-if="authenticated"
          class="btn-delete"
          @click="deleteZone(zone)"
        >
          -
        </button>
      </div>
    </div>

    <button v-if="authenticated" class="btn-primary" @click="createZone">
      Add Zone
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    map: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedMap: this.map
    }
  },

  computed: {
    ...mapGetters(['authenticated', 'mapList']),

    zoneList() {
      return this.$store.getters.zoneList(this.map)
    }
  },

  methods: {
    changeMap(event) {
      this.$router.push(`/${event.target.value}`)
    },

    createMap() {
      const map = window.prompt('Map')

      if (map) {
        this.$store.dispatch('createMap', { map })
        this.$router.push(`/${map}`)
      }
    },

    deleteMap() {
      const { map } = this

      if (window.confirm(`Are you sure you want to delete ${map}?`) && map) {
        this.$store.dispatch('deleteMap', { map })
        this.$router.push(`/${this.mapList[0]}`)
      }
    },

    createZone() {
      const { map } = this
      const zone = window.prompt('Zone')

      if (zone) {
        this.$store.dispatch('createZone', { map, zone })
      }
    },

    deleteZone(zone) {
      const { map } = this

      if (window.confirm(`Are you sure you want to delete ${zone}?`) && zone) {
        this.$store.dispatch('deleteZone', { map, zone })
        this.$router.push(`/${this.map}`)
      }
    }
  }
}
</script>
