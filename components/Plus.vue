<template>
  <div v-if="user" class="text-primary">
    <button @click="$emit('click')">+</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['user'])
}
</script>
