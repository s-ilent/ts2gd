extends RefCounted
class_name TsSet

var _d := {}

func _init(initial = null):
	if initial != null:
		for item in initial:
			_d[item] = true

func add(v):
	_d[v] = true
	return self

func has(v):
	return _d.has(v)

func delete(v):
	return _d.erase(v)

func clear():
	_d.clear()

var size:
	get:
		return _d.size()

func values():
	return _d.keys()

func forEach(fn):
	for k in _d.keys():
		if fn is Array:
			fn[0].call(fn[1], k, k, self)
		elif fn is Callable:
			fn.call(k, k, self)

func _iter_init(state):
	state.clear()
	state.append(_d.keys())
	state.append(0)
	return _d.size() > 0

func _iter_next(state):
	state[1] += 1
	return state[1] < state[0].size()

func _iter_get(state):
	return state[0][state[1]]
