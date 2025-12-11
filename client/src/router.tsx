import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layouts
const LayoutAuth = lazy(
    () =>
        import(
            './components/layout/LayoutAuth' /* webpackChunkName: "layout-auth" */
        )
)
const LayoutMain = lazy(
    () =>
        import(
            './components/layout/LayoutMain' /* webpackChunkName: "layout-main" */
        )
)
const LayoutAdmin = lazy(
    () =>
        import(
            './components/layout/LayoutAdmin' /* webpackChunkName: "layout-admin" */
        )
)

// Components
const ProtectedRoute = lazy(
    () =>
        import(
            './components/auth/ProtectedRoute' /* webpackChunkName: "protected-route" */
        )
)

// Pages
const MainPage = lazy(
    () => import('./pages/Main' /* webpackChunkName: "main-page" */)
)
const LoginPage = lazy(
    () => import('./pages/auth/LoginPage' /* webpackChunkName: "login-page" */)
)
const SignupPage = lazy(
    () => import('./pages/auth/SignupPage' /* webpackChunkName: "signup-page" */)
)
const AdminDashboard = lazy(
    () =>
        import(
            './pages/admin/AdminDashboard' /* webpackChunkName: "admin-dashboard" */
        )
)
const CategoriesListTablePage = lazy(
    () =>
        import(
            './pages/categories/categoriesListTablePage' /* webpackChunkName: "categories-page" */
        )
)
const UsersListPage = lazy(
    () =>
        import(
            './pages/admin/UsersListPage' /* webpackChunkName: "users-page" */
        )
)
const ProductsPage = lazy(
    () =>
        import(
            './pages/products/ProductsPage' /* webpackChunkName: "products-page" */
        )
)
const ReviewsListPage = lazy(
    () =>
        import(
            './pages/admin/ReviewsListPage' /* webpackChunkName: "reviews-page" */
        )
)
const IngredientsPage = lazy(
    () =>
        import(
            './pages/ingredients/IngredientsPage' /* webpackChunkName: "ingredients-page" */
        )
)
const SizesPage = lazy(
    () => import('./pages/sizes/SizesPage' /* webpackChunkName: "sizes-page" */)
)
const MasaTypesPage = lazy(
    () =>
        import(
            './pages/masa-types/MasaTypesPage' /* webpackChunkName: "masa-types-page" */
        )
)
const MenuPage = lazy(
    () => import('./pages/menu/MenuPage' /* webpackChunkName: "menu-page" */)
)
const CartPage = lazy(
    () => import('./pages/cart/CartPage' /* webpackChunkName: "cart-page" */)
)
const CheckoutPage = lazy(
    () => import('./pages/checkout/CheckoutPage' /* webpackChunkName: "checkout-page" */)
)

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'menu',
                element: <MenuPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'checkout',
                element: <CheckoutPage />,
            },
        ],
    },
    {
        path: 'auth',
        element: <LayoutAuth />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'signup',
                element: <SignupPage />,
            },
        ],
    },
    {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['administrador']} />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: 'dashboard',
                        element: <AdminDashboard />,
                    },
                    {
                        path: 'categorias',
                        element: <CategoriesListTablePage />,
                    },
                    {
                        path: 'usuarios',
                        element: <UsersListPage />,
                    },
                    {
                        path: 'productos',
                        element: <ProductsPage />,
                    },
                    {
                        path: 'resenas',
                        element: <ReviewsListPage />,
                    },
                    {
                        path: 'ingredientes',
                        element: <IngredientsPage />,
                    },
                    {
                        path: 'tamanos',
                        element: <SizesPage />,
                    },
                    {
                        path: 'tipos-masa',
                        element: <MasaTypesPage />,
                    },
                ],
            },
        ],
    },
])

export default router
