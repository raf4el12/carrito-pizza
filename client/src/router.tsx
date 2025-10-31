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
])

export default router
