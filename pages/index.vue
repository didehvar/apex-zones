<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="error">Unauthorised</div>
    <div v-else-if="loading">Loading ...</div>
    <button v-else class="btn" @click="signIn">Sign in with Google</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      user: null,
      error: false,
      loading: false,
      redirectTo: null
    }
  },

  computed: {
    ...mapState(['admins']),
    ...mapGetters(['authenticated', 'defaultMap'])
  },

  async beforeMount() {
    const redirectTo = window.localStorage.getItem('redirectTo')
    const { user } = await this.$fireAuth.getRedirectResult()

    if (user) {
      const { email, displayName } = user

      this.loading = true
      this.user = { email, displayName }

      if (!this.admins) {
        await this.$store.dispatch('adminSnapshot')
      }

      if (!this.admins.includes(email)) {
        this.error = true
        this.loading = false
        return
      }

      this.$store.dispatch('storeUser', { email, displayName })

      if (!this.defaultMap) {
        await this.$store.dispatch('mapsSnapshot')
      }

      if (redirectTo) {
        window.localStorage.removeItem('redirectTo')
        return this.$router.replace(redirectTo)
      }

      this.$router.push(`/${this.defaultMap}`)
    }
  },

  methods: {
    async signIn() {
      if (this.redirectTo) {
        window.localStorage.setItem('redirectTo', this.redirectTo)
      }

      await this.$store.dispatch('signIn')
    }
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
