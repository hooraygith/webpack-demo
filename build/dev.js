const config = require('../webpack.config.dev')
const rm = require('rimraf')
const webpack = require('webpack')
const path = require('path')

rm(path.resolve(__dirname, '../dist'), err => {
    if (err) {
        throw err
    }
    console.log('remove dist')
    webpack(config, (err, stats) => {
        if (err) {
            throw err
        }
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        console.log('Build complete.\n')
    })
})
