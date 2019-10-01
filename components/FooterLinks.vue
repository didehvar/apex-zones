<template>
  <footer class="mt-4 self-end">
    <button class="text-gray-500 self-end" @click="signIn">Admin</button>
  </footer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['signIn'])
  }
}
</script>
