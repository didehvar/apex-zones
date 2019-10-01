const UPDATE_USER = 'UPDATE_USER'

export const state = () => ({
  user: null
})

export const mutations = {
  [UPDATE_USER](state, user) {
    state.user = user
  }
}

export const actions = {
  async signIn({ commit }) {
    try {
      const provider = new this.$fireAuthObj.GoogleAuthProvider()
      provider.addScope('email')

      const {
        user: { email, displayName }
      } = await this.$fireAuth.signInWithPopup(provider)

      commit(UPDATE_USER, { email, displayName })
    } catch (ex) {
      window.alert(ex)
    }
  },

  async createArea({ commit }, area) {
    try {
      await this.$fireStore
        .collection('zones')
        .doc(area)
        .set({ area })
    } catch (ex) {
      window.alert(ex)
    }
  }
}
