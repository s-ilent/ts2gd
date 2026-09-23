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
static func __ts_hypot(a, b):
  return sqrt(a * a + b * b)
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
  return (a & 0xFFFFFFFF) >> b
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
