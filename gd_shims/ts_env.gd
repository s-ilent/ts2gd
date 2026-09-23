# Generic stand-in for the JavaScript runtime environment (window,
# document, fetch, timers, and friends). Property reads that were never
# assigned fall back to null so code that targets a browser host fails
# soft instead of breaking the surrounding script.
extends RefCounted

var _props := {}

func _set(property: StringName, value):
  _props[property] = value
  return true

func _get(property: StringName):
  if _props.has(property):
    return _props[property]
  return null

func fetch(_url, _init = null):
  return null

func setTimeout(_callback, _delay = 0):
  return null

func clearTimeout(_id):
  pass

func setInterval(_callback, _delay = 0):
  return null

func clearInterval(_id):
  pass

func requestAnimationFrame(_callback):
  return null

func cancelAnimationFrame(_id):
  pass

func atob(_s):
  return ""

func btoa(_s):
  return ""

func getComputedStyle(_element, _pseudo = null):
  return null
