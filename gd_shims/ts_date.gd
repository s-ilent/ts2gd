# Stand-in for the JavaScript Date object. Instances hold a moment in
# time as milliseconds since the Unix epoch; UTC conversions use Godot's
# Time singleton so results stay stable across platforms.
extends RefCounted

var _ms := 0.0

func _init(value = null):
  if value == null:
    _ms = float(Time.get_unix_time_from_system()) * 1000.0
  elif value is bool:
    _ms = 1.0 if value else 0.0
  elif value is float or value is int:
    _ms = float(value)
  elif value is String:
    var parsed := Time.get_unix_time_from_datetime_string(value)
    if parsed != 0:
      _ms = float(parsed) * 1000.0
    else:
      _ms = float(Time.get_unix_time_from_system()) * 1000.0
  elif value is RefCounted and "_ms" in value:
    _ms = value._ms
  else:
    _ms = float(Time.get_unix_time_from_system()) * 1000.0

static func now() -> int:
  return int(float(Time.get_unix_time_from_system()) * 1000.0)

static func parse(value) -> int:
  var parsed := Time.get_unix_time_from_datetime_string(str(value))
  return int(float(parsed) * 1000.0) if parsed != 0 else int(_invalid_date())

func _invalid_date():
  return NAN

func getTime() -> int:
  return int(_ms)

func valueOf() -> float:
  return _ms

func toISOString() -> String:
  var total_seconds := int(_ms / 1000.0)
  var millis := int(fmod(_ms, 1000.0))
  if millis < 0:
    millis += 1000
    total_seconds -= 1
  var d := Time.get_datetime_dict_from_unix_time(total_seconds)
  return "%04d-%02d-%02dT%02d:%02d:%02d.%03dZ" % [
    d.year, d.month, d.day, d.hour, d.minute, d.second, millis,
  ]

func getFullYear() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).year

func getMonth() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).month - 1

func getDate() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).day

func getDay() -> int:
  var weekday: int = Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).weekday
  return (weekday + 1) % 7

func getHours() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).hour

func getMinutes() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).minute

func getSeconds() -> int:
  return Time.get_datetime_dict_from_unix_time(int(_ms / 1000.0)).second

func getMilliseconds() -> int:
  return int(fmod(_ms, 1000.0))

func getTimezoneOffset() -> int:
  return 0

func toString() -> String:
  return toISOString()
