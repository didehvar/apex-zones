<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="loading">Loading ...</div>
    <button v-else class="btn" @click="signIn">Sign in with Google</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      redirectTo: null
    }
  },

  computed: {
    ...mapGetters(['authenticated', 'defaultMap'])
  },

  watch: {
    async authenticated() {
      let map = this.defaultMap

      if (!map) {
        const maps = await this.$store.dispatch('mapsSnapshot')
        map = Object.keys(maps)[0]
      }

      if (this.redirectTo) {
        return this.$router.replace(this.redirectTo)
      }

      this.$router.push(`/${map}`)
    }
  },

  async beforeCreate() {
    const { user } = await this.$fireAuth.getRedirectResult()

    if (user) {
      this.loading = true
      this.$store.dispatch('storeUser', user)
    }
  },

  methods: {
    ...mapActions(['signIn'])
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name) {
        vm.redirectTo = from.path
      }
    })
  }
}
</script>
