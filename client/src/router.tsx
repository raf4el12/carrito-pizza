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

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
        ],
      },
    ],
  },
])

export default router
