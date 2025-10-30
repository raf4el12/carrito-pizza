import {
    ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
    REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
  } from '../shared/shared.constants.js'
  import * as authUserCase from './auth.usecase.js'
  
  const applyTokens = (res, { accessToken, refreshToken, userId }) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
    })
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
    })
  
    res.cookie('userId', userId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_MINUTE_SIGN_NOMINAL,
    })
  }
  
  const login = async (req, res) => {
    const { email, password } = req.body
    const user = await authUserCase.login(email, password)
    const { accessToken, refreshToken, ...userData } = user
  
    applyTokens(res, { accessToken, refreshToken, userId: userData.userId })
  
    res.json(userData)
  }
  
  const refresh = async (req, res) => {
    const { refreshToken: refreshTokenBefore } = req.cookies
  
    const { accessToken, refreshToken, userId } =
      await authUserCase.refreshToken(refreshTokenBefore)
  
    applyTokens(res, { accessToken, refreshToken, userId })
  
    res.json({ message: 'ok' })
  }
  
  const logout = (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.clearCookie('userId')
  
    res.json({ message: 'ok' })
  }
  
  const signup = async (req, res) => {
    await authUserCase.signup(req.body)
  
    res.json({ message: 'ok' })
  }
  
  export { login, refresh, logout, signup }
  