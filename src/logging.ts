/**
 * Created by tozawa on 2017/07/17.
 */

import * as loglevel from 'loglevel'

// Loglevelを使う場合
function initLoglevel (name) {
  let logger = loglevel.getLogger(name)
  logger.setLevel('TRACE')
  return logger
}


export default function getLogger (name) {
  // let logger = initLogdown(name);
  let logger = initLoglevel(name)

  logger.printOpts = (opts) => {
    let ary: string[] = []
    for (let [k, v] of Object.entries(opts)) {
      ary.push(`${k}: ${v}`)
    }
    logger.info(`opts: ${ary.join(', ')}`)
  }

  return logger
};
