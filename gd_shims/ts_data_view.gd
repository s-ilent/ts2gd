# Stand-in for the JavaScript DataView: typed reads and writes over a
# byte buffer with explicit endianness per access. Backed by a
# StreamPeerBuffer so integer and float widths map one-to-one.
extends RefCounted

var byteOffset := 0
var byteLength := 0

var _peer := StreamPeerBuffer.new()

func _init(buffer = null, offset = 0, length = -1):
  var data: PackedByteArray = (
    buffer if buffer is PackedByteArray else PackedByteArray()
  )
  byteOffset = int(offset)
  byteLength = (
    data.size() - byteOffset if length == null or length < 0 else int(length)
  )
  byteLength = maxi(byteLength, 0)
  if byteOffset <= data.size():
    _peer.data_array = data.slice(byteOffset, byteOffset + byteLength)
  _peer.big_endian = false

func _check(offset, width) -> bool:
  if offset < 0 or offset + width > _peer.data_array.size():
    push_error("DataView access out of bounds")
    return false
  return true

func getUint8(offset) -> int:
  if not _check(offset, 1):
    return 0
  _peer.seek(offset)
  return _peer.get_u8()

func getInt8(offset) -> int:
  if not _check(offset, 1):
    return 0
  _peer.seek(offset)
  return _peer.get_8()

func getUint16(offset, little_endian = false) -> int:
  if not _check(offset, 2):
    return 0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_u16()

func getInt16(offset, little_endian = false) -> int:
  if not _check(offset, 2):
    return 0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_16()

func getUint32(offset, little_endian = false) -> int:
  if not _check(offset, 4):
    return 0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_u32()

func getInt32(offset, little_endian = false) -> int:
  if not _check(offset, 4):
    return 0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_32()

func getFloat32(offset, little_endian = false) -> float:
  if not _check(offset, 4):
    return 0.0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_float()

func getFloat64(offset, little_endian = false) -> float:
  if not _check(offset, 8):
    return 0.0
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  return _peer.get_double()

func setUint8(offset, value) -> void:
  if not _check(offset, 1):
    return
  _peer.seek(offset)
  _peer.put_u8(int(value) & 0xFF)

func setInt8(offset, value) -> void:
  if not _check(offset, 1):
    return
  _peer.seek(offset)
  _peer.put_8(int(value))

func setUint16(offset, value, little_endian = false) -> void:
  if not _check(offset, 2):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_u16(int(value))

func setInt16(offset, value, little_endian = false) -> void:
  if not _check(offset, 2):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_16(int(value))

func setUint32(offset, value, little_endian = false) -> void:
  if not _check(offset, 4):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_u32(int(value))

func setInt32(offset, value, little_endian = false) -> void:
  if not _check(offset, 4):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_32(int(value))

func setFloat32(offset, value, little_endian = false) -> void:
  if not _check(offset, 4):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_float(float(value))

func setFloat64(offset, value, little_endian = false) -> void:
  if not _check(offset, 8):
    return
  _peer.big_endian = not little_endian
  _peer.seek(offset)
  _peer.put_double(float(value))
