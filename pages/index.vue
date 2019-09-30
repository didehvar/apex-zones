<template>
  <div class="px-20 pt-12 pb-8 bg-gray-200 min-h-screen flex flex-col">
    <main class="flex-1 flex">
      <div class="min-w-1/5 bg-white shadow-md px-8 py-6 flex flex-col">
        <h1 class="mb-4">Kings Canyon</h1>

        <ul class="flex-1">
          <li>
            Artillery
          </li>
          <li>
            Relay
          </li>
        </ul>
      </div>

      <div class="min-w-1/5 bg-white shadow-md ml-6 pt-6">
        <div class="px-8">
          <h2 class="mb-4">Cave</h2>

          <div class="flex justify-between">
            <ul class="flex">
              <li>Variation 1</li>
              <li class="ml-3">Variation 2</li>
              <li class="ml-3">Variation 3</li>
            </ul>

            <div>
              View () () ()
            </div>
          </div>
        </div>

        <div class="my-4 px-6 flex flex-wrap">
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
          <div class="w-64 h-64 mx-2 my-2 bg-gray-100"></div>
        </div>
      </div>
    </main>

    <footer class="mt-4 self-end">
      <button class="text-gray-500 self-end" @click="signIn">Admin</button>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    async signIn() {
      try {
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        provider.addScope('email')

        await this.$fireAuth.signInWithPopup(provider)
      } catch (ex) {
        window.alert(ex)
      }
    }
  }
}
</script>
