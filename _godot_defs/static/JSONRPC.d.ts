/**
 * [url=https://www.jsonrpc.org/]JSON-RPC[/url] is a standard which wraps a method call in a [JSON] object. The object has a particular structure and identifies which method is called, the parameters to that function, and carries an ID to keep track of responses. This class implements that standard on top of [Dictionary]; you will have to convert between a [Dictionary] and [JSON] with other functions.
 *
 */
declare class JSONRPC extends Object {
  /**
   * [url=https://www.jsonrpc.org/]JSON-RPC[/url] is a standard which wraps a method call in a [JSON] object. The object has a particular structure and identifies which method is called, the parameters to that function, and carries an ID to keep track of responses. This class implements that standard on top of [Dictionary]; you will have to convert between a [Dictionary] and [JSON] with other functions.
   *
   */
  new(): JSONRPC
  constructor()
  static new(): JSONRPC

  /**
   * Returns a dictionary in the form of a JSON-RPC notification. Notifications are one-shot messages which do not expect a response.
   *
   * - [param method]: Name of the method being called.
   *
   * - [param params]: An array or dictionary of parameters being passed to the method.
   *
   */
  make_notification(method: string, params: any): Dictionary<any, any>

  /**
   * Returns a dictionary in the form of a JSON-RPC request. Requests are sent to a server with the expectation of a response. The ID field is used for the server to specify which exact request it is responding to.
   *
   * - [param method]: Name of the method being called.
   *
   * - [param params]: An array or dictionary of parameters being passed to the method.
   *
   * - [param id]: Uniquely identifies this request. The server is expected to send a response with the same ID.
   *
   */
  make_request(method: string, params: any, id: any): Dictionary<any, any>

  /**
   * When a server has received and processed a request, it is expected to send a response. If you did not want a response then you need to have sent a Notification instead.
   *
   * - [param result]: The return value of the function which was called.
   *
   * - [param id]: The ID of the request this response is targeted to.
   *
   */
  make_response(result: any, id: any): Dictionary<any, any>

  /**
   * Creates a response which indicates a previous reply has failed in some way.
   *
   * - [param code]: The error code corresponding to what kind of error this is. See the [enum ErrorCode] constants.
   *
   * - [param message]: A custom message about this error.
   *
   * - [param id]: The request this error is a response to.
   *
   */
  make_response_error(
    code: int,
    message: string,
    id?: any
  ): Dictionary<any, any>

  /**
   * Given a Dictionary which takes the form of a JSON-RPC request: unpack the request and run it. Methods are resolved by looking at the field called "method" and looking for an equivalently named function in the JSONRPC object. If one is found that method is called.
   *
   * To add new supported methods extend the JSONRPC class and call [method process_action] on your subclass.
   *
   * [param action]: The action to be run, as a Dictionary in the form of a JSON-RPC request or notification.
   *
   */
  process_action(action: any, recurse?: boolean): any

  /** No documentation provided. */
  process_string(action: string): string

  /**
   * Registers a callback for the given method name.
   *
   * - [param name]: The name that clients can use to access the callback.
   *
   * - [param callback]: The callback which will handle the specified method.
   *
   */
  set_method(name: string, callback: Callable): void

  connect<T extends SignalsOf<JSONRPC>>(
    signal: T,
    method: SignalFunction<JSONRPC[T]>
  ): number

  /**
   * The request could not be parsed as it was not valid by JSON standard ([method JSON.parse] failed).
   *
   */
  static PARSE_ERROR: any

  /**
   * A method call was requested but the request's format is not valid.
   *
   */
  static INVALID_REQUEST: any

  /**
   * A method call was requested but no function of that name existed in the JSONRPC subclass.
   *
   */
  static METHOD_NOT_FOUND: any

  /**
   * A method call was requested but the given method parameters are not valid. Not used by the built-in JSONRPC.
   *
   */
  static INVALID_PARAMS: any

  /**
   * An internal error occurred while processing the request. Not used by the built-in JSONRPC.
   *
   */
  static INTERNAL_ERROR: any
}
