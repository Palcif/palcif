/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router'

import RootLayout from './RootLayout'

const Home = lazy(() => import('@/pages/Home'))
const Events = lazy(() => import('@/pages/Events'))
const Activities = lazy(() => import('@/pages/Activities'))
const Blog = lazy(() => import('@/pages/Blog'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'activities', element: <Activities /> },
      { path: 'news', element: <Navigate to="/activities" replace /> },
      { path: 'blog', element: <Blog /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
])
