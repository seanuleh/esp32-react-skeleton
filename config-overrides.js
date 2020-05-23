module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    
    config.output.filename = "s/js/[name].[contenthash:3].js"
    config.output.chunkFilename = "s/js/[name].[contenthash:3].c.js"
    config.resolve.extensions.push(".css")

    for(let i = 0 ; i < config.plugins.length; i++ ){
      if (config.plugins[i].constructor.name == "GenerateSW") {
        config.plugins[i].config.precacheManifestFilename = "pm.[manifestHash].js"
      }

      if (config.plugins[i].constructor.name == "MiniCssExtractPlugin") {
        config.plugins[i].options.filename = "s/css/[name].[contenthash:3].css"
        config.plugins[i].options.chunkFilename = "s/css/[name].[contenthash:3].c.css"
      }
    }

    return config;
  },
}