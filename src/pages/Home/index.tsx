import { NavLink } from 'react-router'

import blogOliveThumb from '@/assets/design/blog-olive-thumb.png'
import blogStudentThumb from '@/assets/design/blog-student-thumb.png'
import blogTatreezThumb from '@/assets/design/blog-tatreez-thumb.png'
import heroCollage from '@/assets/design/hero-collage-full.png'
import oliveSprig from '@/assets/design/olive-sprig-left.png'
import { useActivities } from '@/features/activities/useActivities'
import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import CulturalHighlights from '@/features/highlights/CulturalHighlights'
import { useHomePage } from '@/features/page-copy/useHomePage'
import { ArrowRight, FloralOrnament, OliveBranch } from '@/shared/components/icons'
import SectionHeader from '@/shared/components/SectionHeader'

const BLOG_POSTS = [
  {
    img: blogTatreezThumb,
    title: 'Tatreez: Stitches of Memory and Identity',
    date: '2025-05-08',
    displayDate: '8 May 2025',
  },
  {
    img: blogStudentThumb,
    title: 'A Day in the Life of a Palestinian Student in Finland',
    date: '2025-04-25',
    displayDate: '25 Apr 2025',
  },
  {
    img: blogOliveThumb,
    title: 'Olive Trees in Our Culture: Rooted and Resilient',
    date: '2025-04-14',
    displayDate: '14 Apr 2025',
  },
]

export default function Home() {
  const { data: eventsData } = useEvents()
  const upcomingEvents = splitEventsByDate(eventsData?.events?.nodes ?? []).upcoming.slice(0, 3)
  const { data: activitiesData } = useActivities()
  const latestActivities = (activitiesData?.activities?.nodes ?? []).slice(0, 3)
  const { data: homeData } = useHomePage()
  const home = homeData?.page?.homeFields

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-grid">
          <div className="hero-left">
            <img
              src={oliveSprig}
              alt=""
              className="hero-olive"
              aria-hidden="true"
              width="88"
              height="340"
            />
            <p className="hero-tagline">
              {home?.heroTagline ?? 'From Palestine, with heart. In Finland.'}
            </p>
            <h1
              id="hero-heading"
              dangerouslySetInnerHTML={{
                __html:
                  home?.heroHeading ??
                  'Our roots.<br />Our culture.<br /><span class="accent">Our community.</span>',
              }}
            />

            <div className="hero-divider">
              <span className="hero-divider-line" />
              <span className="hero-divider-ornament">
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
                <FloralOrnament />
              </span>
              <span className="hero-divider-line" />
            </div>

            <p className="hero-description">
              {home?.heroDescription ??
                'A welcoming space for Palestinians and friends in Finland to connect, celebrate our heritage, and build a stronger future together.'}
            </p>
            <div className="hero-actions">
              <NavLink to="/about" className="btn-primary">
                Join Our Community
                <OliveBranch className="btn-icon" />
              </NavLink>
              <NavLink to="/events" className="btn-text">
                Explore Events <ArrowRight />
              </NavLink>
            </div>
          </div>

          <div className="hero-right">
            <img
              src={heroCollage}
              alt="Collage of Helsinki, community gathering, welcome message, and Palestinian heritage symbols"
              className="hero-right-img"
              loading="eager"
              width="1280"
              height="980"
            />
          </div>
        </div>
      </section>

      {/* ── Tatreez Divider ── */}
      <div className="tatreez-divider" role="presentation" />

      {/* ── Content Grid ── */}
      <section className="content-grid" aria-label="Community updates">
        {/* Upcoming Events */}
        <div className="content-column">
          <SectionHeader title="Upcoming Events" action="View all events" to="/events" />
          <ul className="event-list">
            {upcomingEvents.map((evt) => {
              const eventdate = evt.eventsFields?.eventdate
              const date = eventdate ? new Date(eventdate) : null
              const isoDate = date ? date.toISOString().slice(0, 10) : undefined
              const month = date
                ? date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
                : ''
              const day = date ? date.toLocaleDateString('en-US', { day: '2-digit' }) : ''
              return (
                <li key={evt.id}>
                  <article>
                    <NavLink to="/events" className="event-card">
                      <time className="event-date" dateTime={isoDate}>
                        <span className="event-month">{month}</span>
                        <span className="event-day">{day}</span>
                      </time>
                      <div className="event-info">
                        <h4
                          className="line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: evt.title ?? '' }}
                        />
                        <p className="event-meta">{evt.eventsFields?.eventtime}</p>
                        <p className="event-loc">{evt.eventsFields?.location}</p>
                      </div>
                      <ArrowRight className="event-arrow" />
                    </NavLink>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Latest Activities */}
        <div className="content-column">
          <SectionHeader title="Latest Activities" action="View all activities" to="/activities" />
          <ul className="article-list">
            {latestActivities.map((item) => (
              <li key={item.id}>
                <article>
                  <NavLink to="/activities" className="article-card">
                    <div className="article-thumb">
                      <img
                        src={item.featuredImage?.node.sourceUrl ?? undefined}
                        alt={item.featuredImage?.node.altText ?? ''}
                      />
                    </div>
                    <div className="article-info">
                      <h4
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.title ?? '' }}
                      />
                      <time dateTime={item.date ?? ''}>
                        {item.date ? new Date(item.date).toLocaleDateString() : ''}
                      </time>
                    </div>
                  </NavLink>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* From the Blog */}
        <div className="content-column">
          <SectionHeader title="From the Blog" action="View all posts" to="/blog" />
          <ul className="article-list">
            {BLOG_POSTS.map((item) => (
              <li key={item.date}>
                <article>
                  <NavLink to="/blog" className="article-card">
                    <div className="article-thumb">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="article-info">
                      <h4 className="line-clamp-2">{item.title}</h4>
                      <time dateTime={item.date}>{item.displayDate}</time>
                    </div>
                  </NavLink>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Cultural Highlights ── */}
      <CulturalHighlights />
    </>
  )
}
