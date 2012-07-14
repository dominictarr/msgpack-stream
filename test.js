

var mps = require('./index')

var encode = mps.createEncodeStream()
var decode = mps.createDecodeStream()
var assert = require('assert')

var expected = [
  1,
  0,
  null,
  true,
  "hello",
  'string\nwith\nlines',
  {object: true, name: 'no need for a name'},
  ['this', 'that', {}, [], [null]],
  Math.PI,
  true,
  false,
//  Infinity,   //doesn't work
//  NaN,        //doesn't work
  {obj: {}}
]

var toSend = expected.slice()
  , expectedItems = expected.slice()
  , actual = []

encode
.pipe(decode)
.on('data', function (obj) {
  console.log(obj)
  actual.push(obj)
  assert.deepEqual(obj, expectedItems.shift())
})
.on('end', function () {
  assert.deepEqual(actual, expected)
  console.log('passed')
})

while(toSend.length)
  encode.write(toSend.shift())
encode.end()
