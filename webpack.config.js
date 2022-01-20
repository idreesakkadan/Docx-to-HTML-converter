const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
          
        })
    ],
    resolve: {
        fallback:{
             "path": require.resolve("path-browserify"),
             "util": require.resolve("util/"),
             "stream": require.resolve("stream-browserify"),
             "zlib": require.resolve("browserify-zlib")

        }
    },
    target:'node'
    };``
// 	- add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
// - add a fallback 'resolve.fallback: { "zlib": require.resolve("browserify-zlib") }'
