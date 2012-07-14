#MsgPackStream

Streams of framed [msgpack](http://wiki.msgpack.org/display/MSGPACK/Format+specification) messages.

## usage

``` js

var mps = require('msgpack-stream')

var encode = mps.createEncodeStream()
var decode = mps.createDecodeStream()

encode.pipe(decode)

decode.on('data', console.log)

encode.write('HELLO')
encode.write({object: true})
encode.write(true)
encode.write(AnyValidJsObject) //!
```

## remarks

this is mostly pulled out of [smith](https://github.com/c9/smith) and slightly refactored to fit a stream.

## lies

actually, msgpack does not support much loved js objects such as `Infinity`, or `Nan`.
