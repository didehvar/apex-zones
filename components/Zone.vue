<template>
  <div>
    <div class="px-8">
      <h2 class="mb-4 capitalize">{{ name }}</h2>

      <div class="flex justify-between">
        <ul class="flex">
          <li
            v-for="areaVariation in areaVariations"
            :key="areaVariation"
            class="mr-4"
          >
            <nuxt-link :to="`/${name}/${areaVariation}`" class="capitalize">{{
              areaVariation
            }}</nuxt-link>
          </li>
        </ul>

        <div>
          View () () ()
        </div>
      </div>
    </div>

    <div class="my-4 px-6 flex flex-wrap">
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
export default {
  data() {
    return {
      name: this.$route.params.zone,
      variation: this.$route.params.variation
    }
  },
  computed: {
    screenshots() {
      return this.$store.getters.areaScreenshots(this.name, this.variation)
    },
    areaVariations() {
      return this.$store.getters.areaVariations(this.name)
    }
  }
}
</script>
