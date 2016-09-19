import webpack from 'webpack'
import config from '../../config'
import webpackConfig from '../../build/webpack.config.server'
import _debug from 'debug'

const paths = config.utils_paths
const debug = _debug('app:server:universal')
const { __DEV__ } = config.globals
const output = paths.dist(config.universal.output)

function compileServer() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.plugin('done', stats => {
      debug('Hash: ' + stats.hash);
      resolve(true);
    })

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
    });
  });
}

export default async function () {
  debug('Enable universal middleware.')

  if (__DEV__) {
    try {
      debug('Compile server.');
      await compileServer();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.resolve(require(output));
}

