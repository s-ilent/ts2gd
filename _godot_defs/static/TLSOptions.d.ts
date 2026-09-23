/**
 * TLSOptions abstracts the configuration options for the [StreamPeerTLS] and [PacketPeerDTLS] classes.
 *
 * Objects of this class cannot be instantiated directly, and one of the static methods [method client], [method client_unsafe], or [method server] should be used instead.
 *
 * @example
 *
 *
 * # Create a TLS client configuration which uses our custom trusted CA chain.
 * var client_trusted_cas = load("res://my_trusted_cas.crt")
 * var client_tls_options = TLSOptions.client(client_trusted_cas)
 * # Create a TLS server configuration.
 * var server_certs = load("res://my_server_cas.crt")
 * var server_key = load("res://my_server_key.key")
 * var server_tls_options = TLSOptions.server(server_key, server_certs)
 *
 * @summary
 *
 *
 */
declare class TLSOptions extends RefCounted {
  /**
   * TLSOptions abstracts the configuration options for the [StreamPeerTLS] and [PacketPeerDTLS] classes.
   *
   * Objects of this class cannot be instantiated directly, and one of the static methods [method client], [method client_unsafe], or [method server] should be used instead.
   *
   * @example
   *
   *
   * # Create a TLS client configuration which uses our custom trusted CA chain.
   * var client_trusted_cas = load("res://my_trusted_cas.crt")
   * var client_tls_options = TLSOptions.client(client_trusted_cas)
   * # Create a TLS server configuration.
   * var server_certs = load("res://my_server_cas.crt")
   * var server_key = load("res://my_server_key.key")
   * var server_tls_options = TLSOptions.server(server_key, server_certs)
   *
   * @summary
   *
   *
   */
  new(): TLSOptions
  constructor()
  static new(): TLSOptions

  /**
   * Creates a TLS client configuration which validates certificates and their common names (fully qualified domain names).
   *
   * You can specify a custom [param trusted_chain] of certification authorities (the default CA list will be used if `null`), and optionally provide a [param common_name_override] if you expect the certificate to have a common name other than the server FQDN.
   *
   * **Note:** On the Web platform, TLS verification is always enforced against the CA list of the web browser. This is considered a security feature.
   *
   */
  static client(
    trusted_chain?: X509Certificate,
    common_name_override?: string
  ): TLSOptions

  /**
   * Creates an **unsafe** TLS client configuration where certificate validation is optional. You can optionally provide a valid [param trusted_chain], but the common name of the certificates will never be checked. Using this configuration for purposes other than testing **is not recommended**.
   *
   * **Note:** On the Web platform, TLS verification is always enforced against the CA list of the web browser. This is considered a security feature.
   *
   */
  static client_unsafe(trusted_chain?: X509Certificate): TLSOptions

  /** Returns the common name (domain name) override specified when creating with [method TLSOptions.client]. */
  get_common_name_override(): string

  /** Returns the [X509Certificate] specified when creating with [method TLSOptions.server]. */
  get_own_certificate(): X509Certificate

  /** Returns the [CryptoKey] specified when creating with [method TLSOptions.server]. */
  get_private_key(): CryptoKey

  /** Returns the CA [X509Certificate] chain specified when creating with [method TLSOptions.client] or [method TLSOptions.client_unsafe]. */
  get_trusted_ca_chain(): X509Certificate

  /** Returns [code]true[/code] if created with [method TLSOptions.server], [code]false[/code] otherwise. */
  is_server(): boolean

  /** Returns [code]true[/code] if created with [method TLSOptions.client_unsafe], [code]false[/code] otherwise. */
  is_unsafe_client(): boolean

  /**
   * Creates a TLS server configuration using the provided [param key] and [param certificate].
   *
   * **Note:** The [param certificate] should include the full certificate chain up to the signing CA (certificates file can be concatenated using a general purpose text editor).
   *
   */
  static server(key: CryptoKey, certificate: X509Certificate): TLSOptions

  connect<T extends SignalsOf<TLSOptions>>(
    signal: T,
    method: SignalFunction<TLSOptions[T]>
  ): number
}
