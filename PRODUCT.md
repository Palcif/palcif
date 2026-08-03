# Product

## Register

brand

## Users

Members and friends of the Palestinian community in Finland (PALCIF), and visitors discovering the organization for the first time. They browse on desktop and mobile, in Finnish, English, or Arabic, to find community news, cultural highlights, events, and ways to get involved (registration, activities, blog/articles from WordPress). Includes older community members who may be less comfortable with dense, app-like UI, and Arabic-speaking users who need a correct RTL reading experience.

## Product Purpose

A public community and cultural website that informs, connects, and activates the Palestinian community in Finland: surfacing cultural highlights, upcoming events, and blog content, and inviting people to register and participate in PALCIF activities. Success looks like visitors quickly understanding what's happening and why it matters, and feeling welcome enough to register or explore further.

## Brand Personality

Warm, editorial, dignified. Feels like a cultural magazine rooted in Palestinian identity, not a tech product: welcoming rather than corporate, rooted rather than trendy.

## Anti-references

Avoid the generic SaaS/startup look: templated icon+heading+text card grids, identical equal-weight cards, hero-metric stat blocks, gradient accents, glassy panels. This is a community/cultural site, not a tech product, and should not read as one.

## Design Principles

- Warmth over slickness: editorial serif headings, warm cream surfaces, and burgundy/olive accents over cool neutrals or corporate blue.
- Content is the hero: photography and stories carry the page; chrome (cards, borders, badges) stays quiet.
- One primary action per card: keep calls to action (Register, view highlight) clear and singular rather than stacking competing affordances.
- Respect multilingual, bidirectional readers: layouts must hold up in Finnish, English, and Arabic (RTL), not just English.
- Accessible to a broad community, not just tech-fluent users: legible type sizes, clear tap targets, no reliance on hover-only affordances.

## Accessibility & Inclusion

Site is localized into Finnish, English, and Arabic (`src/i18n/locales/{fi,en,ar}`), so Arabic RTL layout must remain correct through any redesign. Standard WCAG AA expectations apply (contrast, focus states, alt text); no additional constraints specified beyond avoiding hover-only or fine-motor-dependent interactions, given the community includes older, less tech-fluent members.
