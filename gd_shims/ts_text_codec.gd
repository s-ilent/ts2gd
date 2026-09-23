# TextEncoder/TextDecoder stand-in over UTF-8 buffers.
extends RefCounted

var _props := {}

func _set(property: StringName, value):
  _props[property] = value
  return true

func _get(property: StringName):
  if _props.has(property):
    return _props[property]
  return null

func encode(s):
  return str(s).to_utf8_buffer()

func decode(buffer):
  if buffer is PackedByteArray:
    return buffer.get_string_from_utf8()
  if buffer is String:
    return buffer
  return ""
