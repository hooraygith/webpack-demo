const config = require('../webpack.config.dev')
const rm = require('rimraf')
const webpack = require('webpack')
const path = require('path')

rm(path.resolve(__dirname, '../dist'), err => {
    if (err) {
        throw err
    }
    console.log('remove dist')
    webpack(config, (err, status) => {
        if (err) {
            throw err
        }
    })
})
