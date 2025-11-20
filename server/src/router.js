import express from 'express'
import authRoutes from './auth/auth.routes.js'
import userRoutes from './modules/users/user.routes.js'
import productsRoutes from './modules/products/products.router.js'
import categoriesRoutes from './modules/categories/categories.routes.js'
import sizesRoutes from './modules/sizes/sizes.routes.js'
import variantsRoutes from './modules/variantsProducts/variants.routes.js'
import ingredientsRoutes from './modules/ingredients/ingredients.routes.js'
import carritoRoutes from './modules/carrito/carrito.routes.js'
import pedidosRoutes from './modules/pedidos/pedidos.routes.js'
import masaTypesRoutes from './modules/masaTypes/masaTypes.routes.js'
import reviewsRoutes from './modules/reviews/reviews.routes.js'



const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/products', productsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/sizes', sizesRoutes)
router.use('/variants', variantsRoutes)
router.use('/ingredients', ingredientsRoutes)
router.use('/carrito', carritoRoutes)
router.use('/pedidos', pedidosRoutes)
router.use('/masa-types', masaTypesRoutes)
router.use('/reviews', reviewsRoutes)

export default router