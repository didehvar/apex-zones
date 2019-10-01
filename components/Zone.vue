<template>
  <div class="h-full flex flex-col">
    <div class="px-8">
      <h2 class="mb-4 capitalize">{{ zone }}</h2>

      <div class="flex justify-between">
        <ul class="flex flex-1">
          <li
            v-for="zoneVariation in zoneVariations"
            :key="zoneVariation"
            class="mr-4"
          >
            <nuxt-link
              :to="`/${map}/${zone}/${zoneVariation}`"
              class="capitalize"
              >{{ zoneVariation }}</nuxt-link
            >
          </li>
        </ul>

        <div class="mx-4">
          <plus @click="createVariation" />
        </div>

        <div>
          View () () ()
        </div>
      </div>
    </div>

    <div class="my-4 px-6 flex-1 flex flex-wrap">
      <div
        v-for="screenshot in screenshots"
        :key="screenshot"
        class="w-64 h-64 mx-2 my-2 bg-gray-100"
      >
        {{ screenshot }}
      </div>
    </div>
  </div>
</template>

<script>
import Plus from '~/components/Plus'

export default {
  components: {
    Plus
  },
  data() {
    return {
      zone: this.$route.params.zone
    }
  },
  computed: {
    map() {
      return this.$route.params.map || this.$store.getters.defaultMap
    },
    variation() {
      return this.$route.params.variation || this.zoneVariations[0]
    },
    screenshots() {
      return this.$store.getters.variationScreenshots(
        this.map,
        this.zone,
        this.variation
      )
    },
    zoneVariations() {
      return this.$store.getters.zoneVariations(this.map, this.zone)
    }
  },
  methods: {
    createVariation() {
      const { map, zone } = this
      const variation = window.prompt('Variation')

      if (variation) {
        this.$store.dispatch('createVariation', { map, zone, variation })
      }
    }
  }
}
</script>
