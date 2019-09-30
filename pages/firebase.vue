<template>
  <div>
    <h2>
      Write to Firestore.
    </h2>
    <div>
      <button :disabled="writeSuccessful" @click="writeToFirestore">
        <span v-if="!writeSuccessful">Write now</span>
        <span v-else>Successful!</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      writeSuccessful: false
    }
  },
  methods: {
    async writeToFirestore() {
      try {
        const ref = this.$fireStore.collection('test').doc('test')
        const document = {
          text: 'This is a test message.'
        }
        await ref.set(document)
      } catch (e) {
        console.error(e)
      }
      this.writeSuccessful = true
    }
  }
}
</script>

<style></style>
