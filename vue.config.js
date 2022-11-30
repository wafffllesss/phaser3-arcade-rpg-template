const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    const rules = ['images', 'media']

    rules.forEach(rule => {
      const ruleConf = config.module.rule(rule)
      ruleConf.type('asset/resource')
    })
  },

  devServer: {
    hot: false
  },

  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '.': '/src',
    //   },
    // },
    plugins: [
      require('unplugin-auto-import/webpack')({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          {
            // '@vueuse/core': [
            // ],
            'axios': [
              ['default', 'axios'],
            ],
          },
        ],

        // Auto import for module exports under directories
        dirs: [
          // './hooks',
          // 'src/composables/*', // only root modules
          'src/composables/**', // all nested modules
          // ...
        ],

        // Filepath to generate corresponding .d.ts file.
        // Defaults to 'src/auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: 'src/auto-imports.d.ts',

        // Auto import inside Vue template
        // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
        vueTemplate: false,

        // Custom resolvers, compatible with `unplugin-vue-components`
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [
          /* ... */
        ],

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: 'src/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],
  },
})
