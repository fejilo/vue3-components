const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  outputDir: 'dist', // Carpeta donde se generará la librería
  configureWebpack: {
    output: {
      library: 'vue3-components', // Nombre global de la librería (para UMD)
      libraryTarget: 'umd', // Compatible con varios entornos (ES, CommonJS, Global)
      umdNamedDefine: true,
    },
    externals: {
      vue: 'Vue', // Evita incluir Vue en el bundle (el proyecto que la use debe instalarlo)
    },
  },
  transpileDependencies: true,
});
