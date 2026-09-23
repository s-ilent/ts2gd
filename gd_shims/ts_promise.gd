# Promise stand-in. The executor runs synchronously and the settled value
# is stored; there is no scheduler, so awaiting one of these returns the
# shim itself rather than the stored value. Callback-style consumers keep
# working through then/catch.
extends RefCounted

var _value = null
var _reason = null
var _settled := false

func resolve(value = null):
  _value = value
  _settled = true

func reject(reason = null):
  _reason = reason
  _settled = true

func then(on_fulfilled = null, _on_rejected = null):
  if _settled and _reason == null and on_fulfilled != null:
    var f = on_fulfilled
    if f is Array:
      f[0].callv(f[1], [_value])
    elif f is Callable:
      f.call(_value)
  return self

func catch(_on_rejected = null):
  return self
