import express from 'express'
import * as userController from './user.controller.js'
const router = express.Router()
 
router.get('/', userController.getUsers.bind(userController))
router.get('/:id', userController.getUserById.bind(userController))
router.post('/', userController.createdUser.bind(userController))
router.put('/:id', userController.updateUser.bind(userController))
router.delete('/:id', userController.deleteUser.bind(userController))

export default router
