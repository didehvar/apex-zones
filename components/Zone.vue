<template>
  <div>
    <div class="px-8">
      <h2 class="mb-4 capitalize">{{ name }}</h2>

      <div class="flex justify-between">
        <ul class="flex">
          <li>Variation 1</li>
          <li class="ml-3">Variation 2</li>
          <li class="ml-3">Variation 3</li>
        </ul>

        <div>
          View () () ()
        </div>
      </div>
    </div>

    <div class="my-4 px-6 flex flex-wrap">
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
      <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.params.zone
    }
  },
  computed: {
    area() {
      return this.$store.areas[this.name]
    }
  }
}
</script>
