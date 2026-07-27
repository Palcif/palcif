import { NavLink } from 'react-router'

import activitiesCircleThumb from '@/assets/design/activities-circle-thumb.png'
import activitiesFlagThumb from '@/assets/design/activities-flag-thumb.png'
import activitiesIftarThumb from '@/assets/design/activities-iftar-thumb.png'
import blogOliveThumb from '@/assets/design/blog-olive-thumb.png'
import blogStudentThumb from '@/assets/design/blog-student-thumb.png'
import blogTatreezThumb from '@/assets/design/blog-tatreez-thumb.png'
import heroCollage from '@/assets/design/hero-collage-full.png'
import oliveSprig from '@/assets/design/olive-sprig-left.png'
import CulturalHighlights from '@/features/highlights/CulturalHighlights'
import { ArrowRight, FloralOrnament, OliveBranch } from '@/shared/components/icons'
import SectionHeader from '@/shared/components/SectionHeader'

const EVENTS = [
  {
    month: 'MAY',
    day: '18',
    title: 'Nakba Remembrance Gathering',
    date: 'Sun, May 18, 2025 · 18:00',
    loc: 'Helsinki · Community Hall',
    dateTime: '2025-05-18',
  },
  {
    month: 'JUN',
    day: '07',
    title: 'Palestinian Embroidery Workshop',
    date: 'Sat, Jun 7, 2025 · 13:00',
    loc: 'Espoo · Olohuone',
    dateTime: '2025-06-07',
  },
  {
    month: 'JUN',
    day: '21',
    title: 'Palestinian Film Evening',
    date: 'Sat, Jun 21, 2025 · 18:00',
    loc: 'Helsinki · Cinema Orion',
    dateTime: '2025-06-21',
  },
]

const ACTIVITIES = [
  {
    img: activitiesIftarThumb,
    title: 'Community Iftar Brings Generations Together',
    date: '2025-05-12',
    displayDate: '12 May 2025',
  },
  {
    img: activitiesFlagThumb,
    title: 'Palestinian Flag Day in Helsinki',
    date: '2025-05-02',
    displayDate: '2 May 2025',
  },
  {
    img: activitiesCircleThumb,
    title: 'New Arabic Language Circle Starting in May',
    date: '2025-04-28',
    displayDate: '28 Apr 2025',
  },
]

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
            <p className="hero-tagline">From Palestine, with heart. In Finland.</p>
            <h1 id="hero-heading">
              Our roots.
              <br />
              Our culture.
              <br />
              <span className="accent">Our community.</span>
            </h1>

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
              A welcoming space for Palestinians and friends in Finland to connect, celebrate our
              heritage, and build a stronger future together.
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
            {EVENTS.map((evt) => (
              <li key={evt.dateTime}>
                <article>
                  <NavLink to="/events" className="event-card">
                    <time className="event-date" dateTime={evt.dateTime}>
                      <span className="event-month">{evt.month}</span>
                      <span className="event-day">{evt.day}</span>
                    </time>
                    <div className="event-info">
                      <h4 className="line-clamp-2">{evt.title}</h4>
                      <p className="event-meta">{evt.date}</p>
                      <p className="event-loc">{evt.loc}</p>
                    </div>
                    <ArrowRight className="event-arrow" />
                  </NavLink>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Activities */}
        <div className="content-column">
          <SectionHeader title="Latest Activities" action="View all activities" to="/activities" />
          <ul className="article-list">
            {ACTIVITIES.map((item) => (
              <li key={item.date}>
                <article>
                  <NavLink to="/activities" className="article-card">
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
