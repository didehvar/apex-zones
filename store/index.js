const UPDATE_USER = 'UPDATE_USER'
const UPDATE_MAPS = 'UPDATE_MAPS'

export const state = () => ({
  user: null,
  maps: {}
})

export const getters = {
  authenticated: (state) => state.user !== null,

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

  [UPDATE_MAPS](state, maps) {
    state.maps = maps
  }
}

export const actions = {
  mapsSnapshot({ commit }) {
    return new Promise((resolve) => {
      this.$fireStore.collection('maps').onSnapshot((querySnapshot) => {
        const maps = {}

        querySnapshot.forEach((doc) => {
          maps[doc.id] = doc.data()
        })

        commit(UPDATE_MAPS, maps)
        resolve(maps)
      })
    })
  },

  async createMap(_, { map }) {
    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .set({})
    } catch (ex) {
      window.alert(ex)
    }
  },

  async deleteMap(_, { map }) {
    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .delete()
    } catch (ex) {
      window.alert(ex)
    }
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

  async deleteZone({ state }, { map, zone }) {
    const name = zone.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .update({ [name]: this.$fireStoreObj.FieldValue.delete() })
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

  async deleteVariation({ state }, { map, zone, variation }) {
    const name = variation.toLowerCase()

    try {
      await this.$fireStore
        .collection('maps')
        .doc(map)
        .update({
          [`${zone}.${name}`]: this.$fireStoreObj.FieldValue.delete()
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

  signIn() {
    try {
      const provider = new this.$fireAuthObj.GoogleAuthProvider()
      provider.addScope('email')

      this.$fireAuth.signInWithRedirect(provider)
    } catch (ex) {
      window.alert(ex)
    }
  },

  storeUser({ commit }, { email, displayName }) {
    commit(UPDATE_USER, { email, displayName })
  }
}
