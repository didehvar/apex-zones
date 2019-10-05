export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: {
      class: 'antialiased font-sans'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-fire',
      {
        // Required:
        config: {
          development: {
            apiKey: 'AIzaSyChKZtFWMkYRm1OcXmAcXjESNGpw52Cj7w',
            authDomain: 'apex-zones.firebaseapp.com',
            databaseURL: 'https://apex-zones.firebaseio.com',
            projectId: 'apex-zones',
            storageBucket: 'gs://apex-zones.appspot.com',
            messagingSenderId: '1050652942269',
            appId: '1:1050652942269:web:44bad1c9d19437d4bd7cd4'
          },
          production: {
            apiKey: 'AIzaSyChKZtFWMkYRm1OcXmAcXjESNGpw52Cj7w',
            authDomain: 'apex-zones.firebaseapp.com',
            databaseURL: 'https://apex-zones.firebaseio.com',
            projectId: 'apex-zones',
            storageBucket: 'gs://apex-zones.appspot.com',
            messagingSenderId: '1050652942269',
            appId: '1:1050652942269:web:44bad1c9d19437d4bd7cd4'
          }
        },
        // The following options are optional:
        useOnly: ['auth', 'firestore', 'storage']
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
