/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { Navigate, useParams } from 'react-router'

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

function NewsRedirect() {
  const { lang } = useParams<{ lang: string }>()
  return <Navigate to={`/${lang}/activities`} replace />
}

// The single source of truth for routes nested under `:lang`. router.tsx
// builds the actual route tree from this array; RootLayout's redirect guard
// derives its known-section list from the same array, so the two can never
// drift out of sync with each other.
export const langChildRoutes: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: 'events', element: <Events /> },
  { path: 'events/:slug', element: <EventDetail /> },
  { path: 'activities', element: <Activities /> },
  { path: 'activities/:slug', element: <ActivityDetail /> },
  { path: 'highlights', element: <Highlights /> },
  { path: 'highlights/:slug', element: <HighlightDetail /> },
  { path: 'news', element: <NewsRedirect /> },
  { path: 'blog', element: <Blog /> },
  { path: 'blog/:slug', element: <BlogPost /> },
  { path: 'about', element: <About /> },
  { path: 'contact', element: <Contact /> },
  { path: '*', element: <Home /> },
]

// Every real top-level section name (e.g. "activities" from both
// "activities" and "activities/:slug"), derived from langChildRoutes rather
// than hand-listed, so it always matches the actual route table.
export const TOP_LEVEL_SECTIONS = new Set(
  langChildRoutes
    .map((route) => route.path)
    .filter((path): path is string => Boolean(path) && path !== '*')
    .map((path) => path.split('/')[0])
)
