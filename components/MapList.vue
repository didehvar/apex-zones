<template>
  <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
    <div class="flex justify-between">
      <h1 class="mb-4">{{ map }}</h1>
      <plus @click="createArea" />
    </div>

    <ul class="flex-1">
      <li v-for="area in areas" :key="area">
        {{ area }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Plus from '~/components/Plus'

export default {
  components: {
    Plus
  },
  data() {
    return {
      map: "King's Canyon"
    }
  },
  computed: {
    ...mapState(['areas'])
  },
  created() {
    this.$store.dispatch('mapSnapshot', this.map)
  },
  methods: {
    createArea() {
      const { map } = this
      const area = window.prompt('Zone')

      if (area) {
        this.$store.dispatch('createArea', { map, area })
      }
    }
  }
}
</script>
