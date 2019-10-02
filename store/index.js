const UPDATE_USER = 'UPDATE_USER'
const UPDATE_MAP = 'UPDATE_MAP'

export const state = () => ({
  user: null,
  maps: {}
})

export const getters = {
  mapList: (state) => Object.keys(state.maps),
  defaultMap: (state) => Object.keys(state.maps)[0],

  zoneList: (state) => (map) => Object.keys(state.maps[map] || {}),
  zoneVariations: (state) => (map, zone) =>
    Object.keys((state.maps[map] || {})[zone] || {}),

  variationScreenshots: (state) => (map, zone, variation) =>
    ((state.maps[map] || {})[zone] || {})[variation]
}

export const mutations = {
  [UPDATE_USER](state, user) {
    state.user = user
  },

  [UPDATE_MAP](state, { map, zones }) {
    state.maps = {
      ...state.maps,
      [map]: zones
    }
  }
}

export const actions = {
  mapsSnapshot({ commit }) {
    this.$fireStore.collection('maps').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit(UPDATE_MAP, { map: doc.id, zones: doc.data() })
      })
    })
  },

  async createZone({ state }, { map, zone }) {
    const mapName = map || state.maps[0]
    const name = zone.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(mapName)
        .update({ [name]: {} })
    } catch (ex) {
      window.alert(ex)
    }
  },

  async createVariation({ state }, { map, zone, variation }) {
    const mapName = map || state.maps[0]
    const name = variation.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(mapName)
        .update({
          [`${zone}.${name}`]: []
        })
    } catch (ex) {
      window.alert(ex)
    }
  },

  async addScreenshot({ state }, { map, zone, variation, url }) {
    const mapName = map || state.maps[0]
    const name = variation.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(mapName)
        .update({
          [`${zone}.${name}`]: this.$fireStoreObj.FieldValue.arrayUnion(url)
        })
    } catch (ex) {
      window.alert(ex)
    }
  },

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
  }
}
