<template>
  <div v-if="user" class="text-primary">
    <button @click="$emit('click')">{{ text }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: '+'
    }
  },
  computed: mapState(['user'])
}
</script>
