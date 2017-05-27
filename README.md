[![Build Status](https://travis-ci.org/eosjs/libtx.svg?branch=master)](https://travis-ci.org/eosjs/libtx)
[![Coverage Status](https://coveralls.io/repos/github/eosjs/libtx/badge.svg?branch=master)](https://coveralls.io/github/eosjs/libtx?branch=master)

# Transact

This library converts human readable data structures to and from the binary structures required by the blockchain.  This package does serialization and deserialization only, if you need fully functional transactions your better off using the [eosjs](https://github.com/eosjs/eosjs) package.

Warning: This API is still changing.  I may force push changes..

## API

```javascript
const assert = require('assert')
const Tx = require('.')//eosjs-libtx

// ### General Use Case

// Warning: Do not use {defaults: true} in production
const tx = Tx({defaults: true})
assert(tx.errors.length === 0, tx.errors)
const {Message} = tx.structs

// Message (see https://github.com/eosjs/json/blob/master/operations.json)
Message.toObject()
// Output: { from: '', to: '', cc: [ '' ], type: '', data: '' }

// Convert JSON into a binary buffer
const msg = Message.fromObject({ from: 'jc', to: 'charles', cc: [ 'abc' ], type: '', data: '0f0f0f' })
const msgBuf = Tx.toBuffer(Message, msg)
// toBuffer returns: <Buffer 02 6a 63 07 63 68 61 72 6c 65 73 01 03 61 62 63 00 03 0f 0f 0f>

const obj = Message.toObject(Tx.fromBuffer(Message, msgBuf))
assert.deepEqual(Message.toObject(msg), obj)


// ### Smart contracts may extend and define their own data-structures (see ./index.test.js for more)

const myTx = tx.extend({
    TimedPermission: {base: 'AccountPermission', fields: {expires: 'Time'}}
})
assert(myTx.errors.length === 0, myTx.errors)
const {TimedPermission} = myTx.structs
TimedPermission.toObject()
// toObject returns: { account: '', permission: '', expires: '1970-01-01T00:00:00Z' }

```

## Environment

ECMAScript 6 (ES6)
