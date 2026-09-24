# Generic stand-in for Vite's import.meta.glob. Returns a Dictionary
# mapping each matched asset path to its res:// URL. Only `*` wildcards are
# honored (one per segment; `**` behaves like `*`), and because the
# importing module's directory is not known at runtime, leading `./` and
# `../` segments are collapsed so matching starts at the first concrete
# directory segment under res://. Query strings (?url) are stripped and the
# options argument is accepted but ignored: results behave as if
# `eager: true, import: 'default'`.
extends RefCounted


func glob(pattern, _options = null):
  var out := {}
  var clean: String = String(pattern).split("?")[0]

  while clean.begins_with("./") or clean.begins_with("../"):
    clean = clean.substr(clean.find("/") + 1)

  var segments: PackedStringArray = clean.split("/", false)

  _walk("res://", segments, 0, out)
  return out


func _walk(dir: String, segments: PackedStringArray, depth: int, out: Dictionary):
  if depth >= segments.size():
    return

  var d := DirAccess.open(dir)

  if d == null:
    return

  var seg := segments[depth]
  var last := depth == segments.size() - 1

  d.list_dir_begin()
  var name := d.get_next()

  while name != "":
    if seg == "*" or seg == "**" or String(name).match(seg):
      var path := dir + name

      if d.current_is_dir():
        var next_depth := depth if seg == "**" else depth + 1

        _walk(path + "/", segments, next_depth, out)
      elif last:
        out[path] = path

    name = d.get_next()

  d.list_dir_end()
