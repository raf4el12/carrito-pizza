import express from 'express'
import * as authController from './auth.controller.js'

const router = express.Router()
router.post('/login', authController.login.bind(authController))
router.post('/refresh', authController.refresh.bind(authController))
router.post('/logout', authController.logout.bind(authController))
router.post('/signup', authController.signup.bind(authController))

export default router
