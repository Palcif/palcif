/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router'

import RootLayout from './RootLayout'

const Home = lazy(() => import('@/pages/Home'))
const Events = lazy(() => import('@/pages/Events'))
const EventDetail = lazy(() => import('@/pages/EventDetail'))
const Activities = lazy(() => import('@/pages/Activities'))
const ActivityDetail = lazy(() => import('@/pages/ActivityDetail'))
const Highlights = lazy(() => import('@/pages/Highlights'))
const HighlightDetail = lazy(() => import('@/pages/HighlightDetail'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:slug', element: <EventDetail /> },
      { path: 'activities', element: <Activities /> },
      { path: 'activities/:slug', element: <ActivityDetail /> },
      { path: 'highlights', element: <Highlights /> },
      { path: 'highlights/:slug', element: <HighlightDetail /> },
      { path: 'news', element: <Navigate to="/activities" replace /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
])
