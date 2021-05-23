module.exports = {
  pwa: {
    name: 'Choreography Inproviser',
    themeColor: '#f2a119',
    msTileColor: '#f2a119',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/maskable_icon_x192.png',
    },
    manifestOptions: {
      icons: [
        {
          src: 'img/icons/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: `${process.env.BASE_URL}service-worker.js`,
    },
  },
}
