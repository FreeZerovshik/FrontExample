const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/api': {
        target: `${process.env.VUE_APP_API_HOST || 'localhost'}:${
          process.env.VUE_APP_API_PORT || '8080'
        }`,
        ws: true,
        changeOrigin: true,
        // secure: false,
      },
    },
    client: {
      logging: 'info',
    },
  },
});
