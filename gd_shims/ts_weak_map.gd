extends "res://_ts_shims/ts_map.gd"
class_name TsWeakMap

# Weak references cannot be modeled precisely in GDScript; this shim keeps
# strong references and preserves the Map API surface.
