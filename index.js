const MongoClient = require('mongodb').MongoClient

function connect(url, timeout, options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      MongoClient.connect(url, options, (err, db) => {
        err ? reject(err) : resolve(true)
      })
    }, timeout)
  })
}

function tryConnection(url, timeout, tries, opts, attempt = 0) {
  if (attempt) console.debug(`Database not available. Trying to connect to Mongo again... ${attempt}/${tries}`)
  const nextTry = connect(url, timeout, opts)
  return attempt >= tries ? nextTry : nextTry.catch(() => tryConnection(url, timeout, tries, opts, attempt + 1))
}

module.exports = function(url, opts = {}) {
  const options = Object.assign({}, {
    timeout: 1000,
    tries: 10,
    mongo: {}
  }, opts)

  return tryConnection(url, options.timeout, options.tries, options.mongo)
}
