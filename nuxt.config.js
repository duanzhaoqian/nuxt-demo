const pkg = require('./package');
// const path = require('path');
// function resolve(dir) {
//   return path.join(__dirname, '..', dir);
// }
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: ['normalize.css', 'element-ui/lib/theme-chalk/index.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/icons-svg',
    // '@/plugins/permission.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    // loaders: [
    //   {
    //     test: /\.svg$/,
    //     loader: 'svg-sprite-loader',
    //     // include: [resolve('static/svg')],
    //     options: {
    //       symbolId: 'icon-[name]',
    //     },
    //   },
    //   {
    //     test: /\.(png|jpe?g|gif|svg)$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 1000, // 1KO
    //       name: 'img/[name].[hash:7].[ext]',
    //     },
    //   },
    //   {
    //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 1000, // 1 KO
    //       name: 'fonts/[name].[hash:7].[ext]',
    //     },
    //   },
    // ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // get and remove file loader
      const rule = config.module.rules.find(
        r => r.test.toString() === '/\\.(png|jpe?g|gif|svg)$/',
      );
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      // add it again, but now without 'assets\/svg'
      config.module.rules.push({
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        // exclude: [resolve('@/static/svg')],
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]',
        },
      });
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        // include: ['@/static/svg/'],
        options: {
          symbolId: 'icon-[name]',
        },
      });
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
