const UPDATE_USER = 'UPDATE_USER'
const UPDATE_AREAS = 'UPDATE_AREAS'

export const state = () => ({
  user: null,
  areas: {}
})

export const getters = {
  areaList: (state) => Object.keys(state.areas),
  areaVariations: (state) => (area) => Object.keys(state.areas[area] || {}),
  areaScreenshots: (state) => (area, variation) =>
    (state.areas[area] || {})[variation]
}

export const mutations = {
  [UPDATE_USER](state, user) {
    state.user = user
  },

  [UPDATE_AREAS](state, areas) {
    state.areas = {
      ...state.areas,
      ...areas
    }
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
      .onSnapshot((doc) => commit(UPDATE_AREAS, doc.data()))
  },

  async createArea({ commit }, { map, area }) {
    const name = area.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .update({ [name]: {} })
    } catch (ex) {
      window.alert(ex)
    }
  }
}
