extends RefCounted
class_name TsMap

var _d := {}

func _init(initial = null):
	if initial != null:
		for pair in initial:
			_d[pair[0]] = pair[1]

func ts_set(k, v):
	_d[k] = v
	return self

func ts_get(k):
	return _d.get(k)

func has(k):
	return _d.has(k)

func delete(k):
	return _d.erase(k)

func clear():
	_d.clear()

var size:
	get:
		return _d.size()

func keys():
	return _d.keys()

func values():
	return _d.values()

func entries():
	var out := []
	for k in _d:
		out.append([k, _d[k]])
	return out

func forEach(fn):
	for k in _d:
		if fn is Array:
			fn[0].call(fn[1], _d[k], k, self)
		elif fn is Callable:
			fn.call(_d[k], k, self)

func _iter_init(state):
	state.clear()
	state.append(_d.keys())
	state.append(0)
	return _d.size() > 0

func _iter_next(state):
	state[1] += 1
	return state[1] < state[0].size()

func _iter_get(state):
	var k = state[0][state[1]]
	return [k, _d[k]]
