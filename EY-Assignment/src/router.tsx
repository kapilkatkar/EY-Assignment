import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router'
import Home from './component/Home'
import CharacterDetail from './component/card'

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})


const homeRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: Home,
})

// eslint-disable-next-line react-refresh/only-export-components
export const characterRoute = createRoute({
  path: '/character/$id',
  getParentRoute: () => rootRoute,
  component: CharacterDetail,
})

const routeTree = rootRoute.addChildren([homeRoute, characterRoute])

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({ routeTree })

export function AppRouter() {
  return <RouterProvider router={router} />
}
