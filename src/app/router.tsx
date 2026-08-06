import { createBrowserRouter, Navigate } from 'react-router'

import { langChildRoutes } from './langRoutes'
import RootLayout from './RootLayout'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/en" replace /> },
  {
    path: ':lang',
    element: <RootLayout />,
    children: langChildRoutes,
  },
])
