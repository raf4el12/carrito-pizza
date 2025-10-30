class HttpError extends Error {
    constructor(message, status) {
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
  