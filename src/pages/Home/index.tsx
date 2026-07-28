import { NavLink } from 'react-router'

import heroCollage from '@/assets/design/hero-collage-full.png'
import oliveSprig from '@/assets/design/olive-sprig-left.png'
import { useActivities } from '@/features/activities/useActivities'
import { useBlogPosts } from '@/features/blog/useBlogPosts'
import { splitEventsByDate, useEvents } from '@/features/events/useEvents'
import CulturalHighlights from '@/features/highlights/CulturalHighlights'
import { useHomePage } from '@/features/page-copy/useHomePage'
import { ArrowRight, FloralOrnament, OliveBranch } from '@/shared/components/icons'
import SectionHeader from '@/shared/components/SectionHeader'
import { sanitizeHtml } from '@/shared/utils/sanitizeHtml'

export default function Home() {
  const { data: eventsData } = useEvents()
  const upcomingEvents = splitEventsByDate(eventsData?.events?.nodes ?? []).upcoming.slice(0, 3)
  const { data: activitiesData } = useActivities()
  const latestActivities = (activitiesData?.activities?.nodes ?? []).slice(0, 3)
  const { data: blogData } = useBlogPosts()
  const latestPosts = (blogData?.posts?.nodes ?? []).slice(0, 3)
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
                __html: sanitizeHtml(
                  home?.heroHeading ??
                    'Our roots.<br />Our culture.<br /><span class="accent">Our community.</span>'
                ),
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
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(evt.title) }}
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
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
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
            {latestPosts.map((post) => (
              <li key={post.id}>
                <article>
                  <NavLink to="/blog" className="article-card">
                    <div className="article-thumb">
                      <img
                        src={post.featuredImage?.node.sourceUrl ?? undefined}
                        alt={post.featuredImage?.node.altText ?? ''}
                      />
                    </div>
                    <div className="article-info">
                      <h4
                        className="line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title) }}
                      />
                      <time dateTime={post.date ?? ''}>
                        {post.date ? new Date(post.date).toLocaleDateString() : ''}
                      </time>
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
