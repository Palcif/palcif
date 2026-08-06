/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, useLocation } from 'react-router'

import { DEFAULT_LANGUAGE } from '@/i18n/languages'

import { langChildRoutes } from './langRoutes'
import RootLayout from './RootLayout'

function RootRedirect() {
  const location = useLocation()
  return <Navigate to={`/${DEFAULT_LANGUAGE}${location.search}${location.hash}`} replace />
}

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    path: ':lang',
    element: <RootLayout />,
    children: langChildRoutes,
  },
])
