import { HttpError } from '../shared/shared.http.error.js'

const errorMiddleware = (err, req, res, next) => {

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
      status: err.status,
    })
  }


  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      error: 'Error en la base de datos',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    })
  }

  console.error('Error no manejado:', err)
  res.status(500).json({
    error: 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
}

export default errorMiddleware
