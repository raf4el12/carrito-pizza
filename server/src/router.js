import express from 'express'
import authRoutes from './auth/auth.routes.js'
import userRoutes from './modules/users/user.routes.js'
import productsRoutes from './modules/products/products.router.js'
import categoriesRoutes from './modules/categories/categories.routes.js'
import sizesRoutes from './modules/sizes/sizes.routes.js'



const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/products', productsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/sizes', sizesRoutes)
export default router