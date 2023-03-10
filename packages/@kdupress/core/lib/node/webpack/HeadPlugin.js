'use strict'

/**
 * Module dependencies.
 */

const { normalizeHeadTag } = require('../util/index')

/**
 * Expose HeadPlugin class.
 */

module.exports = class HeadPlugin {
  constructor ({ tags }) {
    this.tags = tags
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('kdupress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('kdupress-site-data', (data, cb) => {
        try {
          this.tags.forEach(tag => {
            data.head.push(normalizeHeadTag(tag))
          })
        } catch (e) {
          return cb(e)
        }
        cb(null, data)
      })
    })
  }
}
