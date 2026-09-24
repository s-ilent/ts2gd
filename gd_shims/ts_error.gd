# Minimal stand-in for the JavaScript Error class. Carries a message, a
# name and a best-effort stack string; thrown values in converted code are
# plain instances of this class, and classes that extended Error in TS
# extend this script instead.
extends RefCounted

var message: String = ""
var name: String = "Error"
var stack: String = ""


func _init(msg = ""):
  message = String(msg) if msg != null else ""
  stack = str(get_stack()) if get_stack() != null else ""


func toString() -> String:
  return name + ": " + message if message != "" else name
