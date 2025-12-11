class HttpError extends Error {
  constructor(message, status) {
    // Soporta orden flexible: (message, status) o (status, message)
    if (typeof message === 'number' && typeof status === 'string') {
      [message, status] = [status, message]
    }

    super(message)
    this.name = this.constructor.name
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}
  
  class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized') {
      super(message, 401)
    }
  }
  
  export { HttpError, UnauthorizedError }
  