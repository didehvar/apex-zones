<template>
  <div v-if="user" class="text-primary">+</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user'])
}
</script>
