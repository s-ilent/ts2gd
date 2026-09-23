/**
 */
declare class Skin extends Resource {
  /**
   */
  new(): Skin
  constructor()
  static new(): Skin

  /** No documentation provided. */
  add_bind(bone: int, pose: Transform3D): void

  /** No documentation provided. */
  add_named_bind(name: string, pose: Transform3D): void

  /** No documentation provided. */
  clear_binds(): void

  /** No documentation provided. */
  get_bind_bone(bind_index: int): int

  /** No documentation provided. */
  get_bind_count(): int

  /** No documentation provided. */
  get_bind_name(bind_index: int): StringName

  /** No documentation provided. */
  get_bind_pose(bind_index: int): Transform3D

  /** No documentation provided. */
  set_bind_bone(bind_index: int, bone: int): void

  /** No documentation provided. */
  set_bind_count(bind_count: int): void

  /** No documentation provided. */
  set_bind_name(bind_index: int, name: StringName): void

  /** No documentation provided. */
  set_bind_pose(bind_index: int, pose: Transform3D): void

  connect<T extends SignalsOf<Skin>>(
    signal: T,
    method: SignalFunction<Skin[T]>
  ): number
}
