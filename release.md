### Key and Record Conversion

Update the `key` and `record` functions to skip the encoding of the key or value
if it is already encoded and to coerce the key or value to string before
encoding. Without the string coercion, numeric values where used as buffer
lengths, not as buffer values by the [Encode](https://github.com/bigeasy/encode)
library.

### Issue by Issue

 * Do not encode key if it is a buffer in `record`. #26.
