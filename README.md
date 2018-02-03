node-await-mongo
================

## Why?

I didn't see anything that did what I wanted already. I wanted a promise-based tool to wait for Mongo.

## Installation

~~~
npm install await-mongo
~~~

## Usage

~~~
var wait = require('await-mongo')

wait('mongodb://localhost:27017', {
  timeout: 1000, // time(ms) between tries
  tries: 5       // times to try connection
  mongo: {}      // options to pass to Mongo
}).then(() => {
  // do stuff
}).catch((err) => {
  // handle error
})
~~~

Or with ES6

~~~
const wait = require('await-mongo')

const connect = async function() {
  try {
    await wait('mongodb://localhost:27017')
    // do stuff
  } catch (err) {
    // handle error
  }
}
~~~
