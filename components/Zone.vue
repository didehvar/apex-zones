<template>
  <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
    <div class="flex justify-between">
      <h1 class="mb-4">Kings Canyon</h1>
      <plus @click="createArea" />
    </div>

    <ul class="flex-1">
      <li>
        Artillery
      </li>
      <li>
        Relay
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
  methods: {
    createArea() {
      const name = window.prompt('Zone')
      if (name) {
        this.$store.dispatch('createArea', name)
      }
    }
  }
}
</script>
