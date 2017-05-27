const Types = require('./src/types')
const {create, fromBuffer, toBuffer} = require('./src')
const operations = require('eosjson/operations')

/** @typedef {object} CreateStruct
    @property {Array<String>} CreateStruct.errors - If errors exists, no struts will be created.
    @property {Object} CreateStruct.struct - Struct objects keyed by operation name
    @property {String} CreateStruct.struct.structName - Struct object that will serialize this type.
    @property {Struct} CreateStruct.struct.struct - Struct object that will serialize this type.
*/

/**
    @arg {SerializerConfig} config
    @return {CreateStruct}
*/
module.exports = config => {
  const types = Types(config)
  const {errors, structs} = create(operations, types)
  const extend = (parent, child) => {
    const combined = Object.assign(parent, child)
    const {structs, errors} = create(combined, types)
    return {
      errors,
      structs,
      extend: child => extend(combined, child)
    }
  }
  return {
    errors,
    structs,
    extend: child => extend(operations, child)
  }
}

module.exports.fromBuffer = fromBuffer
module.exports.toBuffer = toBuffer
