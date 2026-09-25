# Stand-in for the JavaScript WeakRef: holds a weak reference to an
# Object instance; deref() returns the referenced object or null once it
# has been freed. Non-object values are held strongly, mirroring how the
# port treats primitives kept behind weak references.
extends RefCounted

var _ref: WeakRef = null
var _value = null

func _init(obj = null):
  if obj is Object:
    _ref = weakref(obj)
  else:
    _value = obj

func deref():
  if _ref != null:
    return _ref.get_ref()
  return _value
