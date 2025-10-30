import { validAccessToken } from '../auth/auth.credential.js'
import { UnauthorizedError } from '../shared/shared.http.error.js'

export const authBearer = async (req, res, next) => {
  try {
    // Rutas públicas (no requieren token)
    const publicPaths = ['/api/auth/login', '/api/auth/signup', '/api/users']
    if (publicPaths.includes(req.path) && (req.method === 'POST' || req.path !== '/api/users')) {
      return next()
    }


    let token =
      req.headers.authorization?.replace('Bearer ', '') ||
      req.cookies?.accessToken

    if (!token) {
      throw new UnauthorizedError('Token no proporcionado')
    }

    const decoded = validAccessToken(token)
    if (!decoded) {
      throw new UnauthorizedError('Token inválido')
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}
