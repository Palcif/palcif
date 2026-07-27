import activitiesCircleThumb from '@/assets/design/activities-circle-thumb.png'
import activitiesFlagThumb from '@/assets/design/activities-flag-thumb.png'
import activitiesIftarThumb from '@/assets/design/activities-iftar-thumb.png'
import { ArrowRight, FloralOrnament } from '@/shared/components/icons'
import SectionHeader from '@/shared/components/SectionHeader'

const ACTIVITIES = [
  {
    img: activitiesIftarThumb,
    title: 'Community Iftar Brings Generations Together',
    excerpt:
      'Families gathered to break fast during Ramadan, sharing dishes, stories, and prayers in a warm evening of togetherness.',
    date: '2025-05-12',
    displayDate: '12 May 2025',
    category: 'Community',
  },
  {
    img: activitiesFlagThumb,
    title: 'Palestinian Flag Day in Helsinki',
    excerpt:
      'Members of the community came together in the city centre to raise the Palestinian flag and celebrate our identity.',
    date: '2025-05-02',
    displayDate: '2 May 2025',
    category: 'Advocacy',
  },
  {
    img: activitiesCircleThumb,
    title: 'New Arabic Language Circle Starting in May',
    excerpt:
      'A friendly weekly circle for all levels to practice Arabic, learn Palestinian dialect, and explore cultural expressions.',
    date: '2025-04-28',
    displayDate: '28 Apr 2025',
    category: 'Culture',
  },
]

const CATEGORIES = ['All', 'Community', 'Culture', 'Advocacy', 'Family']

export default function Activities() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero" aria-labelledby="activities-heading">
        <div className="page-hero-inner">
          <p className="page-hero-tagline">What we do together</p>
          <h1 id="activities-heading">Activities</h1>
          <div className="page-hero-divider">
            <span className="page-hero-line" />
            <FloralOrnament />
            <span className="page-hero-line" />
          </div>
          <p className="page-hero-description">
            Gatherings, workshops, and community moments that keep our culture alive in Finland.
          </p>
        </div>
      </section>

      <div className="tatreez-divider" role="presentation" />

      {/* ── Activities Feed ── */}
      <section className="page-section" aria-label="Latest activities">
        <div className="page-section-inner">
          <SectionHeader title="Latest Activities" action="View archive" />

          <div className="category-filter" role="group" aria-label="Filter activities by category">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-pill${category === 'All' ? ' active' : ''}`}
                aria-pressed={category === 'All'}
              >
                {category}
              </button>
            ))}
          </div>

          <ul className="activity-feed">
            {ACTIVITIES.map((item) => (
              <li key={item.date}>
                <article className="activity-card">
                  <div className="activity-card-thumb">
                    <img src={item.img} alt="" loading="lazy" />
                  </div>
                  <div className="activity-card-body">
                    <div className="activity-card-meta">
                      <span className="activity-category">{item.category}</span>
                      <time dateTime={item.date}>{item.displayDate}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <a href="#" className="activity-card-link">
                      Read more <ArrowRight />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
