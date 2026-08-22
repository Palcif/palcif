/* eslint-disable react-refresh/only-export-components */
import type { ComponentType } from 'react'
import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { Navigate, useParams } from 'react-router'

import { SECTIONS } from '@/features/posts/sections'

const Home = lazy(() => import('@/pages/Home'))
const Events = lazy(() => import('@/pages/Events'))
const EventDetail = lazy(() => import('@/pages/EventDetail'))
const Activities = lazy(() => import('@/pages/Activities'))
const Highlights = lazy(() => import('@/pages/Highlights'))
const Blog = lazy(() => import('@/pages/Blog'))
const PostDetail = lazy(() => import('@/pages/PostDetail'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

const SECTION_LIST_PAGES: Record<string, ComponentType> = {
  blog: Blog,
  highlights: Highlights,
  activities: Activities,
}

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
  ...SECTIONS.flatMap((section) => {
    const ListPage = SECTION_LIST_PAGES[section.path]
    return [
      { path: section.path, element: <ListPage /> },
      { path: `${section.path}/:slug`, element: <PostDetail /> },
    ]
  }),
  { path: 'news', element: <NewsRedirect /> },
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
