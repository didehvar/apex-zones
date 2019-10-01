const UPDATE_USER = 'UPDATE_USER'
const UPDATE_AREAS = 'UPDATE_AREAS'

export const state = () => ({
  user: null,
  areas: []
})

export const mutations = {
  [UPDATE_USER](state, user) {
    state.user = user
  },

  [UPDATE_AREAS](state, areas) {
    state.areas = areas
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

  mapSnapshot({ commit }, map) {
    this.$fireStore
      .collection('maps')
      .doc(map)
      .onSnapshot((doc) => commit(UPDATE_AREAS, doc.data().areas))
  },

  async createArea({ commit }, { map, area }) {
    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .update({ areas: this.$fireStoreObj.FieldValue.arrayUnion(area) })
    } catch (ex) {
      window.alert(ex)
    }
  }
}
