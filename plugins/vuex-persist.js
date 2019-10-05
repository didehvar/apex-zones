import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({ reducer: (state) => ({ user: state.user }) }).plugin(
      store
    )
  })
}
