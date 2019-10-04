<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['mapList'])
  },

  async created() {
    await this.$store.dispatch('mapsSnapshot')
    this.$router.push(`/${this.mapList[0]}`)
  }
}
</script>
