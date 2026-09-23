extends "res://_ts_shims/ts_set.gd"
class_name TsWeakSet

# Weak references cannot be modeled precisely in GDScript; this shim keeps
# strong references and preserves the Set API surface.
