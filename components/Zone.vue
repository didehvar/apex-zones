<template>
  <div class="h-full flex flex-col">
    <div class="px-8">
      <h2 class="mb-4 capitalize text-xl">{{ zone }}</h2>

      <div class="flex justify-between items-center">
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

            <button class="btn-delete" @click="deleteVariation">-</button>
          </li>
        </ul>

        <div class="mx-4">
          <button class="btn-primary" @click="createVariation">
            Add Variation
          </button>
        </div>

        <div>
          View () () ()
        </div>
      </div>
    </div>

    <div class="flex-1">
      <div class="my-4 px-6 flex flex-wrap">
        <div
          v-for="screenshot in screenshots"
          :key="screenshot"
          class="w-64 h-64 mx-2 my-2 bg-gray-100"
        >
          <img :src="screenshot" />
        </div>
      </div>
    </div>

    <div class="px-8 pb-6 text-right">
      <screenshot-upload
        v-if="map && zone && variation"
        :map="map"
        :zone="zone"
        :variation="variation"
      />
    </div>
  </div>
</template>

<script>
import ScreenshotUpload from '~/components/ScreenshotUpload'

export default {
  components: {
    ScreenshotUpload
  },

  props: {
    map: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      zone: this.$route.params.zone
    }
  },

  computed: {
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
    },

    deleteVariation() {
      const { map, zone, variation } = this

      if (
        window.confirm(`Are you sure you want to delete ${variation}?`) &&
        variation
      ) {
        this.$store.dispatch('deleteVariation', { map, zone, variation })
        this.$router.push(`/${map}/${zone}`)
      }
    }
  }
}
</script>
