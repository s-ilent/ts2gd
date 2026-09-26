export type LibraryFunctionName =
  | "map"
  | "filter"
  | "max_by"
  | "min_by"
  | "join"
  | "entries"
  | "flatten"
  | "random_element"
  | "dict_merge"
  | "ts_trunc"
  | "ts_hypot"
  | "ts_fround"
  | "ts_imul"
  | "ts_is_integer"
  | "ts_is_safe_integer"
  | "ts_parse_int"
  | "ts_includes"
  | "ts_pad_start"
  | "ts_number_to_string"
  | "ts_string_from_char_code"
  | "ts_array_from"
  | "ts_glob"
  | "ts_array_slice"
  | "ts_string_slice"
  | "ts_array_filled"
  | "ts_array_sorted"
  | "ts_array_push"
  | "ts_error_class"
  | "ts_date_class"
  | "ts_data_view_class"
  | "ts_weak_ref_class"
  | "ts_assert"
  | "ts_patch_captures"
  | "ts_symbol"
  | "ts_structured_clone"
  | "ts_encode_uri_component"
  | "ts_typed_array_set"
  | "ts_int32_from"
  | "ts_number"
  | "ts_new_set"
  | "ts_new_map"
  | "ts_new_weak_set"
  | "ts_new_weak_map"
  | "ts_new_float32"
  | "ts_new_float64"
  | "ts_new_int32"
  | "ts_new_uint32"
  | "ts_new_int16"
  | "ts_new_uint16"
  | "ts_new_int8"
  | "ts_new_uint8"
  | "ts_shr_unsigned"
  | "array_concat"
  | "ts_regex"
  | "ts_regex_replace"
  | "ts_env"
  | "ts_promise_all"
  | "ts_promise_resolve"
  | "ts_promise_reject"
  | "ts_new_promise"
  | "ts_new_text_codec"
  | "ts_new_url_search_params"
  | "ts_new_proxy"
  | "ts_reflect_get"
  | "ts_reflect_set"
  | "ts_reflect_has"
  | "ts_reflect_own_keys"
  | "ts_perf_now"
  | "ts_object_keys"
  | "ts_object_values"
  | "ts_object_entries"
  | "ts_object_freeze"
  | "ts_object_from_entries"
  | "ts_object_assign"
  | "ts_object_has_own"
  | "ts_object_create"
  | "ts_truthy"
  | "ts_call_fn"
  | "ts_array_map"
  | "ts_array_filter"
  | "ts_array_sort"
  | "ts_array_some"
  | "ts_array_every"
  | "ts_array_find"
  | "ts_array_find_index"
  | "ts_array_for_each"
  | "ts_array_reduce"
  | "ts_array_flat_map"
  | "ts_new_array"
  | "ts_string"
  | "add_vec_lib"
  | "sub_vec_lib"
  | "mul_vec_lib"
  | "div_vec_lib"
  | "ts_typeof"

export const LibraryFunctions: {
  [key in LibraryFunctionName]: {
    name: LibraryFunctionName
    definition: (name: string) => string
  }
} = {
  entries: {
    name: "entries",
    definition: () => `
static func __entries(dict):
  var result = []

  for key in dict.keys():
    var value = dict[key]

    result.push_back([key, value])
  
  return result
`,
  },

  ts_typeof: {
    name: "ts_typeof",
    definition: (name) => `
static func ${name}(v):
  match typeof(v):
    TYPE_NIL:
      return "undefined"
    TYPE_BOOL:
      return "boolean"
    TYPE_INT, TYPE_FLOAT:
      return "number"
    TYPE_STRING:
      return "string"
    TYPE_CALLABLE:
      return "function"
    _:
      return "object"
`,
  },

  array_concat: {
    name: "array_concat",
    definition: () => `
static func __ts_array_concat(base, extra):
  var result = []

  if base != null:
    result.append_array(base)

  if extra != null:
    result.append_array(extra)

  return result
`,
  },

  ts_regex: {
    name: "ts_regex",
    definition: () => `
static func __ts_regex(pattern: String, flags: String) -> RegEx:
  var regex = RegEx.new()
  var effective = pattern

  if flags.contains("i"):
    effective = "(?i)" + effective

  regex.compile(effective)
  return regex
`,
  },

  ts_regex_replace: {
    name: "ts_regex_replace",
    definition: () => `
static func __ts_regex_replace(subject, pattern, flags, repl):
  var regex = RegEx.new()
  var effective = pattern

  if flags.contains("i"):
    effective = "(?i)" + effective

  if flags.contains("m"):
    effective = "(?m)" + effective

  if flags.contains("s"):
    effective = "(?s)" + effective

  regex.compile(effective)
  var matches: Array = regex.search_all(subject)
  var out := ""
  var cursor := 0

  for m in matches:
    var start: int = m.get_start(0)
    var call_args: Array = [m.get_string(0)]

    for gi in range(1, m.get_group_count() + 1):
      call_args.append(m.get_string(gi))

    out += subject.substr(cursor, start - cursor)

    if repl is Array and repl.size() == 2 and repl[0] is Callable:
      call_args.append(repl[1])
      out += repl[0].callv(call_args)
    elif repl is Callable:
      out += repl.callv(call_args)
    else:
      var expanded: String = repl
      var dollar := String.chr(1)

      expanded = expanded.replace("$$", dollar)
      expanded = expanded.replace("$&", m.get_string(0))

      for gi in range(1, m.get_group_count() + 1):
        expanded = expanded.replace("$" + str(gi), m.get_string(gi))

      expanded = expanded.replace(dollar, "$")
      out += expanded

    cursor = m.get_end(0)

    if not flags.contains("g"):
      break

  out += subject.substr(cursor)
  return out
`,
  },

  dict_merge: {
    name: "dict_merge",
    definition: () => `
static func __dict_merge(base, extra):
  var result = {}

  if base != null:
    for key in base:
      result[key] = base[key]

  if extra != null:
    for key in extra:
      result[key] = extra[key]

  return result
`,
  },

  ts_trunc: {
    name: "ts_trunc",
    definition: () => `
static func __ts_trunc(x):
  return int(x)
`,
  },

  ts_hypot: {
    name: "ts_hypot",
    definition: () => `
static func __ts_hypot(a, b, c = 0.0, d = 0.0):
  return sqrt(a * a + b * b + c * c + d * d)
`,
  },

  ts_env: {
    name: "ts_env",
    definition: () => `
static var __ts_env_instance = null

static func __ts_env():
  if __ts_env_instance == null:
    __ts_env_instance = load("res://_ts_shims/ts_env.gd").new()
  return __ts_env_instance
`,
  },

  ts_promise_all: {
    name: "ts_promise_all",
    definition: () => `
static func __ts_promise_all(values):
  return values if values != null else []
`,
  },

  ts_promise_resolve: {
    name: "ts_promise_resolve",
    definition: () => `
static func __ts_promise_resolve(value = null):
  return value
`,
  },

  ts_promise_reject: {
    name: "ts_promise_reject",
    definition: () => `
static func __ts_promise_reject(reason = null):
  push_error(str(reason))
  return null
`,
  },

  ts_new_promise: {
    name: "ts_new_promise",
    definition: () => `
static func __ts_new_promise(executor):
  var p = load("res://_ts_shims/ts_promise.gd").new()
  if executor is Array:
    executor[0].callv(executor[1], [Callable(p, "resolve"), Callable(p, "reject")])
  elif executor is Callable:
    executor.call(Callable(p, "resolve"), Callable(p, "reject"))
  return p
`,
  },

  ts_new_text_codec: {
    name: "ts_new_text_codec",
    definition: () => `
static func __ts_new_text_codec():
  return load("res://_ts_shims/ts_text_codec.gd").new()
`,
  },

  ts_new_url_search_params: {
    name: "ts_new_url_search_params",
    definition: () => `
static func __ts_new_url_search_params(query = null):
  var params := {}
  if query is String:
    var q = query.trim_prefix("?").trim_prefix("#")
    for pair in q.split("&", false):
      var kv = pair.split("=", true, 1)
      if kv.size() == 2:
        params[kv[0].uri_decode()] = kv[1].uri_decode()
      elif kv.size() == 1 and kv[0] != "":
        params[kv[0].uri_decode()] = ""
  return params
`,
  },

  ts_new_proxy: {
    name: "ts_new_proxy",
    definition: () => `
static func __ts_new_proxy(target, _handler = null):
  return target
`,
  },

  ts_reflect_get: {
    name: "ts_reflect_get",
    definition: () => `
static func __ts_reflect_get(target, key, _receiver = null):
  if target == null:
    return null
  return target.get(key)
`,
  },

  ts_reflect_set: {
    name: "ts_reflect_set",
    definition: () => `
static func __ts_reflect_set(target, key, value):
  if target == null:
    return false
  if target is Dictionary:
    target[key] = value
    return true
  target.set(key, value)
  return true
`,
  },

  ts_reflect_has: {
    name: "ts_reflect_has",
    definition: () => `
static func __ts_reflect_has(target, key):
  if target == null:
    return false
  if target is Dictionary:
    return target.has(key)
  return target.has_method(key)
`,
  },

  ts_reflect_own_keys: {
    name: "ts_reflect_own_keys",
    definition: () => `
static func __ts_reflect_own_keys(target):
  if target is Dictionary:
    return target.keys()
  return []
`,
  },

  ts_perf_now: {
    name: "ts_perf_now",
    definition: () => `
static func __ts_perf_now():
  return float(Time.get_ticks_msec())
`,
  },

  ts_object_keys: {
    name: "ts_object_keys",
    definition: () => `
static func __ts_object_keys(obj):
  if obj is Dictionary:
    return obj.keys()
  return []
`,
  },

  ts_object_values: {
    name: "ts_object_values",
    definition: () => `
static func __ts_object_values(obj):
  if obj is Dictionary:
    return obj.values()
  return []
`,
  },

  ts_object_entries: {
    name: "ts_object_entries",
    definition: () => `
static func __ts_object_entries(obj):
  var out := []
  if obj is Dictionary:
    for k in obj:
      out.append([k, obj[k]])
  return out
`,
  },

  ts_object_freeze: {
    name: "ts_object_freeze",
    definition: () => `
static func __ts_object_freeze(obj):
  return obj
`,
  },

  ts_object_from_entries: {
    name: "ts_object_from_entries",
    definition: () => `
static func __ts_object_from_entries(pairs):
  var out := {}
  if pairs is Array:
    for pair in pairs:
      if pair is Array and pair.size() >= 2:
        out[pair[0]] = pair[1]
  return out
`,
  },

  ts_object_assign: {
    name: "ts_object_assign",
    definition: () => `
static func __ts_object_assign(target, s1, s2 = null, s3 = null):
  if target is Dictionary:
    for src in [s1, s2, s3]:
      if src is Dictionary:
        for k in src:
          target[k] = src[k]
  return target
`,
  },

  ts_object_has_own: {
    name: "ts_object_has_own",
    definition: () => `
static func __ts_object_has_own(obj, key):
  if obj is Dictionary:
    return obj.has(key)
  return false
`,
  },

  ts_object_create: {
    name: "ts_object_create",
    definition: () => `
static func __ts_object_create(_proto = null):
  return {}
`,
  },

  ts_patch_captures: {
    name: "ts_patch_captures",
    definition: () => `
static func __ts_patch_captures(root, name, value):
  __ts_patch_captures_walk(root, name, value, [])


static func __ts_patch_captures_walk(node, name, value, seen):
  if node == null:
    return
  if not (node is Array or node is Dictionary):
    return
  for prior in seen:
    if is_same(prior, node):
      return
  seen.append(node)
  if node is Array and node.size() == 2 and node[0] is Callable and node[1] is Dictionary:
    var caps: Dictionary = node[1]
    if caps.has(name) and caps[name] == null:
      caps[name] = value
    __ts_patch_captures_walk(caps, name, value, seen)
  elif node is Dictionary:
    for k in node:
      __ts_patch_captures_walk(node[k], name, value, seen)
  else:
    for entry in node:
      __ts_patch_captures_walk(entry, name, value, seen)
`,
  },

  ts_truthy: {
    name: "ts_truthy",
    definition: () => `
static func __ts_truthy(v):
  match typeof(v):
    TYPE_BOOL:
      return v
    TYPE_INT, TYPE_FLOAT:
      return v != 0
    TYPE_STRING:
      return v != ""
    TYPE_NIL:
      return false
    _:
      return v != null
`,
  },

  ts_call_fn: {
    name: "ts_call_fn",
    definition: () => `
static func __ts_call_fn(f, args):
  if f is Array and f.size() == 2 and f[0] is Callable:
    var all_args: Array = args.duplicate()
    if f[1] is Dictionary and not f[1].is_empty():
      all_args.append(f[1])
    return f[0].callv(all_args)
  if f is Callable:
    return f.callv(args)
  return null
`,
  },

  ts_array_map: {
    name: "ts_array_map",
    definition: () => `
static func __ts_array_map(arr, f):
  var out := []
  for item in arr:
    out.append(__ts_call_fn(f, [item]))
  return out
`,
  },

  ts_array_filter: {
    name: "ts_array_filter",
    definition: () => `
static func __ts_array_filter(arr, f):
  var out := []
  for item in arr:
    if __ts_truthy(__ts_call_fn(f, [item])):
      out.append(item)
  return out
`,
  },

  ts_array_sort: {
    name: "ts_array_sort",
    definition: () => `
static func __ts_array_sort(arr, f):
  arr.sort_custom(func(a, b): return __ts_truthy(__ts_call_fn(f, [a, b])))
  return arr
`,
  },

  ts_array_some: {
    name: "ts_array_some",
    definition: () => `
static func __ts_array_some(arr, f):
  for item in arr:
    if __ts_truthy(__ts_call_fn(f, [item])):
      return true
  return false
`,
  },

  ts_array_every: {
    name: "ts_array_every",
    definition: () => `
static func __ts_array_every(arr, f):
  for item in arr:
    if not __ts_truthy(__ts_call_fn(f, [item])):
      return false
  return true
`,
  },

  ts_array_find: {
    name: "ts_array_find",
    definition: () => `
static func __ts_array_find(arr, f, from = 0):
  for i in range(from, arr.size()):
    if __ts_truthy(__ts_call_fn(f, [arr[i]])):
      return arr[i]
  return null
`,
  },

  ts_array_find_index: {
    name: "ts_array_find_index",
    definition: () => `
static func __ts_array_find_index(arr, f, from = 0):
  for i in range(from, arr.size()):
    if __ts_truthy(__ts_call_fn(f, [arr[i]])):
      return i
  return -1
`,
  },

  ts_array_for_each: {
    name: "ts_array_for_each",
    definition: () => `
static func __ts_array_for_each(arr, f):
  for item in arr:
    __ts_call_fn(f, [item])
  return null
`,
  },

  ts_array_reduce: {
    name: "ts_array_reduce",
    definition: () => `
static func __ts_array_reduce(arr, f, acc = null):
  var start := 0
  if acc == null and arr.size() > 0:
    acc = arr[0]
    start = 1
  for i in range(start, arr.size()):
    acc = __ts_call_fn(f, [acc, arr[i]])
  return acc
`,
  },

  ts_array_flat_map: {
    name: "ts_array_flat_map",
    definition: () => `
static func __ts_array_flat_map(arr, f):
  var out := []
  for item in arr:
    var mapped = __ts_call_fn(f, [item])
    if mapped is Array:
      out.append_array(mapped)
    else:
      out.append(mapped)
  return out
`,
  },

  ts_new_array: {
    name: "ts_new_array",
    definition: () => `
static func __ts_new_array(size = null):
  var a := []
  if size is int or size is float:
    a.resize(int(size))
  return a
`,
  },

  ts_string: {
    name: "ts_string",
    definition: () => `
static func __ts_string(x):
  return str(x)
`,
  },

  ts_fround: {
    name: "ts_fround",
    definition: () => `
static func __ts_fround(x):
  var packed := PackedFloat32Array([x])
  return packed[0]
`,
  },

  ts_imul: {
    name: "ts_imul",
    definition: () => `
static func __ts_imul(a, b):
  var r := int(a) * int(b)
  r = r & 0xFFFFFFFF
  if r >= 0x80000000:
    r -= 0x100000000
  return r
`,
  },

  ts_is_integer: {
    name: "ts_is_integer",
    definition: () => `
static func __ts_is_integer(x):
  if x is int:
    return true
  if x is float:
    return not is_nan(x) and not is_inf(x) and x == floor(x)
  return false
`,
  },

  ts_number: {
    name: "ts_number",
    definition: () => `
static func __ts_number(x):
  if x is bool:
    return 1.0 if x else 0.0
  if x is String:
    return x.to_float()
  return float(x)
`,
  },

  ts_new_set: {
    name: "ts_new_set",
    definition: () => `
static func __ts_new_set(initial = null):
  return load("res://_ts_shims/ts_set.gd").new(initial)
`,
  },

  ts_is_safe_integer: {
    name: "ts_is_safe_integer",
    definition: () => `
static func __ts_is_safe_integer(x):
  return typeof(x) == TYPE_INT and abs(x) <= 9007199254740991
`,
  },

  ts_parse_int: {
    name: "ts_parse_int",
    definition: () => `
static func __ts_parse_int(s, radix = 10):
  if radix == 16:
    return str(s).trim_prefix("0x").hex_to_int()
  if radix == 2:
    return str(s).bin_to_int()
  return int(str(s))
`,
  },

  ts_includes: {
    name: "ts_includes",
    definition: () => `
static func __ts_includes(hay, needle):
  return needle in hay
`,
  },

  ts_pad_start: {
    name: "ts_pad_start",
    definition: () => `
static func __ts_pad_start(s, length, ch = " "):
  var out := str(s)
  while out.length() < length:
    out = ch + out
  return out
`,
  },

  ts_number_to_string: {
    name: "ts_number_to_string",
    definition: () => `
static func __ts_number_to_string(x, radix = 10):
  if radix == 16:
    return String.num_int64(int(x), 16)
  if radix == 2:
    return String.num_int64(int(x), 2)
  return str(x)
`,
  },

  ts_string_from_char_code: {
    name: "ts_string_from_char_code",
    definition: () => `
static func __ts_string_from_char_code(codes):
  var s := ""
  for c in codes:
    s += String.chr(c)
  return s
`,
  },

  ts_array_from: {
    name: "ts_array_from",
    definition: () => `
static func __ts_array_from(src, f = null):
  var out := []
  if src is Dictionary and src.has("length"):
    for i in range(int(src.get("length"))):
      out.append(null if f == null else __ts_call_fn(f, [i]))
  elif src is String:
    for i in range(src.length()):
      out.append(src[i] if f == null else __ts_call_fn(f, [src[i]]))
  else:
    for item in src:
      out.append(item if f == null else __ts_call_fn(f, [item]))
  return out
`,
  },

  ts_glob: {
    name: "ts_glob",
    definition: () => `
static func __ts_glob(pattern, options = null):
  return load("res://_ts_shims/ts_glob.gd").glob(pattern, options)
`,
  },

  ts_array_slice: {
    name: "ts_array_slice",
    definition: () => `
static func __ts_array_slice(arr, start = null, end = null):
  var n: int = arr.size()
  var b: int = 0 if start == null else (start if start >= 0 else n + start)
  var e: int = n if end == null else (end if end >= 0 else n + end)
  b = max(b, 0)
  e = min(e, n)
  var out := []
  for i in range(b, e):
    out.append(arr[i])
  return out
`,
  },

  ts_string_slice: {
    name: "ts_string_slice",
    definition: () => `
static func __ts_string_slice(s, start = null, end = null):
  var n: int = s.length()
  var b: int = 0 if start == null else (start if start >= 0 else n + start)
  var e: int = n if end == null else (end if end >= 0 else n + end)
  b = max(b, 0)
  e = min(e, n)
  var out := ""
  for i in range(b, e):
    out += s[i]
  return out
`,
  },

  ts_array_filled: {
    name: "ts_array_filled",
    definition: () => `
static func __ts_array_filled(arr, value):
  arr.fill(value)
  return arr
`,
  },

  ts_array_sorted: {
    name: "ts_array_sorted",
    definition: () => `
static func __ts_array_sorted(arr):
  arr.sort()
  return arr
`,
  },

  ts_error_class: {
    name: "ts_error_class",
    definition: () => `
static var __ts_Error = load("res://_ts_shims/ts_error.gd")
`,
  },

  ts_date_class: {
    name: "ts_date_class",
    definition: () => `
static var __ts_Date = load("res://_ts_shims/ts_date.gd")
`,
  },

  ts_data_view_class: {
    name: "ts_data_view_class",
    definition: () => `
static var __ts_DataView = load("res://_ts_shims/ts_data_view.gd")
`,
  },

  ts_weak_ref_class: {
    name: "ts_weak_ref_class",
    definition: () => `
static var __ts_WeakRef = load("res://_ts_shims/ts_weak_ref.gd")
`,
  },

  ts_assert: {
    name: "ts_assert",
    definition: () => `
static func __ts_assert(condition, message = null):
  if not __ts_truthy(condition):
    var text := "Assertion failed"
    if message != null:
      text = str(message)
    push_error(text)
    assert(false, text)
`,
  },

  ts_symbol: {
    name: "ts_symbol",
    definition: () => `
static var __ts_symbol_next_id := 0

static func __ts_symbol(description = ""):
  __ts_symbol_next_id += 1
  return "symbol:%s#%d" % [str(description), __ts_symbol_next_id]
`,
  },

  ts_structured_clone: {
    name: "ts_structured_clone",
    definition: () => `
static func __ts_structured_clone(value):
  if value is Array or value is Dictionary:
    return value.duplicate(true)
  return value
`,
  },

  ts_encode_uri_component: {
    name: "ts_encode_uri_component",
    definition: () => `
static func __ts_encode_uri_component(s):
  var out := ""
  for b in str(s).to_utf8_buffer():
    var unreserved := (b >= 0x41 and b <= 0x5a) or (b >= 0x61 and b <= 0x7a) or (b >= 0x30 and b <= 0x39) or b == 0x2d or b == 0x5f or b == 0x2e or b == 0x7e
    if unreserved:
      out += char(b)
    else:
      out += "%%%02X" % b
  return out
`,
  },

  ts_array_push: {
    name: "ts_array_push",
    definition: () => `
static func __ts_array_push(arr, value):
  arr.append(value)
  return arr.size()
`,
  },

  ts_typed_array_set: {
    name: "ts_typed_array_set",
    definition: () => `
static func __ts_typed_array_set(dest, src, offset = 0):
  var start := int(offset)
  var count: int = src.size()
  for i in range(count):
    var idx := start + i
    if idx >= dest.size():
      break
    dest[idx] = src[i]
`,
  },

  ts_int32_from: {
    name: "ts_int32_from",
    definition: () => `
static func __ts_int32_from(src):
  var a := PackedInt32Array()
  a.resize(src.size())
  for i in src.size():
    a[i] = src[i]
  return a
`,
  },

  ts_new_float32: {
    name: "ts_new_float32",
    definition: () => `
static func __ts_new_float32(size = null):
  if size is int or size is float:
    var a := PackedFloat32Array()
    a.resize(int(size))
    return a
  return PackedFloat32Array(size) if size != null else PackedFloat32Array()
`,
  },

  ts_new_float64: {
    name: "ts_new_float64",
    definition: () => `
static func __ts_new_float64(size = null):
  if size is int or size is float:
    var a := PackedFloat64Array()
    a.resize(int(size))
    return a
  return PackedFloat64Array(size) if size != null else PackedFloat64Array()
`,
  },

  ts_new_int32: {
    name: "ts_new_int32",
    definition: () => `
static func __ts_new_int32(size = null):
  if size is int or size is float:
    var a := PackedInt32Array()
    a.resize(int(size))
    return a
  return PackedInt32Array(size) if size != null else PackedInt32Array()
`,
  },

  ts_new_uint32: {
    name: "ts_new_uint32",
    definition: () => `
static func __ts_new_uint32(size = null):
  if size is int or size is float:
    var a := PackedInt64Array()
    a.resize(int(size))
    return a
  return PackedInt64Array(size) if size != null else PackedInt64Array()
`,
  },

  ts_new_int16: {
    name: "ts_new_int16",
    definition: () => `
static func __ts_new_int16(size = null):
  if size is int or size is float:
    var a := PackedInt32Array()
    a.resize(int(size))
    return a
  return PackedInt32Array(size) if size != null else PackedInt32Array()
`,
  },

  ts_new_uint16: {
    name: "ts_new_uint16",
    definition: () => `
static func __ts_new_uint16(size = null):
  if size is int or size is float:
    var a := PackedInt32Array()
    a.resize(int(size))
    return a
  return PackedInt32Array(size) if size != null else PackedInt32Array()
`,
  },

  ts_new_int8: {
    name: "ts_new_int8",
    definition: () => `
static func __ts_new_int8(size = null):
  if size is int or size is float:
    var a := PackedInt32Array()
    a.resize(int(size))
    return a
  return PackedInt32Array(size) if size != null else PackedInt32Array()
`,
  },

  ts_new_uint8: {
    name: "ts_new_uint8",
    definition: () => `
static func __ts_new_uint8(size = null):
  if size is int or size is float:
    var a := PackedByteArray()
    a.resize(int(size))
    return a
  return PackedByteArray(size) if size != null else PackedByteArray()
`,
  },

  ts_new_map: {
    name: "ts_new_map",
    definition: () => `
static func __ts_new_map(initial = null):
  return load("res://_ts_shims/ts_map.gd").new(initial)
`,
  },

  ts_new_weak_set: {
    name: "ts_new_weak_set",
    definition: () => `
static func __ts_new_weak_set(initial = null):
  return load("res://_ts_shims/ts_weak_set.gd").new(initial)
`,
  },

  ts_new_weak_map: {
    name: "ts_new_weak_map",
    definition: () => `
static func __ts_new_weak_map(initial = null):
  return load("res://_ts_shims/ts_weak_map.gd").new(initial)
`,
  },

  ts_shr_unsigned: {
    name: "ts_shr_unsigned",
    definition: () => `
static func __ts_shr_unsigned(a, b):
  return (int(a) & 0xFFFFFFFF) >> int(b)
`,
  },

  add_vec_lib: {
    name: "add_vec_lib",
    definition: () => `
static func add_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 + v2
`,
  },

  sub_vec_lib: {
    name: "sub_vec_lib",
    definition: () => `
static func sub_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 - v2
`,
  },

  div_vec_lib: {
    name: "div_vec_lib",
    definition: () => `
static func div_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 / v2
`,
  },

  mul_vec_lib: {
    name: "mul_vec_lib",
    definition: () => `
static func mul_vec_lib(v1, v2):
  return null if (v1 == null or v2 == null) else v1 * v2
`,
  },

  map: {
    name: "map",
    definition: (name: string) => `
static func ${name}(list, fn):
  var result = []

  for item in list:
    result.append(fn[0].call(item, fn[1]))

  return result
    `,
  },

  flatten: {
    name: "flatten",
    definition: (name: string) => `
static func ${name}(list):
  var result = []

  for item in list:
    if (typeof(item) == TYPE_ARRAY):
      var inner_result = ${name}(item)

      for inner in inner_result:
        result.append(inner)
    else:
      result.append(item)

  return result
    `,
  },

  filter: {
    name: "filter",
    definition: (name: string) => `
static func ${name}(list, fn):
  var result = []

  for item in list:
    if fn[0].call(item, fn[1]):
      result.append(item)

  return result
    `,
  },

  max_by: {
    name: "max_by",
    definition: (name: string) => `
static func ${name}(list, fn):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = -INF

  for item in list:
    var score = fn[0].call(item, fn[1])

    if score > best_score:
      best_score = score
      best = item

  return best
    `,
  },

  min_by: {
    name: "min_by",
    definition: (name: string) => `
static func ${name}(list, fn):
  if len(list) == 0: 
    return null

  var result = []
  var best = null
  var best_score = INF

  for item in list:
    var score = fn[0].call(item, fn[1])

    if score < best_score:
      best_score = score
      best = item

  return best
    `,
  },

  join: {
    name: "join",
    definition: (name: string) => `
static func ${name}(list, join_str):
  var result = ""

  for i in range(len(list)):
    result += str(list[i])

    if i != len(list) - 1:
      result += join_str

  return result
    `,
  },

  random_element: {
    name: "random_element",
    definition: (name: string) => `
static func ${name}(list):
  if len(list) == 0: 
    return null
  return list[randi() % len(list)]
    `,
  },
}
