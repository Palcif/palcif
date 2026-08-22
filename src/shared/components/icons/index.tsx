export function TatreezLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="4" fill="#8b2635" />
      <path d="M8 8h32v32H8z" fill="#f4efe6" />
      <path d="M12 12h24v24H12z" fill="#8b2635" />
      <path d="M16 16h16v16H16z" fill="#f4efe6" />
      <path d="M20 20h8v8h-8z" fill="#8b2635" />
      <rect x="23" y="8" width="2" height="32" fill="#f4efe6" />
      <rect x="8" y="23" width="32" height="2" fill="#f4efe6" />
    </svg>
  )
}

export function TatreezPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 72"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="tatreez-main"
          x="0"
          y="0"
          width="120"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <rect width="120" height="72" fill="#e8e0d2" />
          {/* Top border */}
          <rect x="0" y="6" width="120" height="3" fill="#8b2635" />
          <rect x="0" y="12" width="120" height="2" fill="#1f1f1f" />

          {/* Central diamond motif */}
          <path d="M60 22 L72 38 L60 54 L48 38 Z" fill="none" stroke="#8b2635" strokeWidth="2" />
          <path d="M60 26 L68 38 L60 50 L52 38 Z" fill="#8b2635" />
          <rect x="58" y="34" width="4" height="8" fill="#f4efe6" />

          {/* Side cross motifs */}
          <g fill="#1f1f1f">
            <rect x="18" y="28" width="4" height="4" />
            <rect x="22" y="24" width="4" height="4" />
            <rect x="22" y="32" width="4" height="4" />
            <rect x="26" y="28" width="4" height="4" />
          </g>
          <g fill="#8b2635">
            <rect x="90" y="28" width="4" height="4" />
            <rect x="94" y="24" width="4" height="4" />
            <rect x="94" y="32" width="4" height="4" />
            <rect x="98" y="28" width="4" height="4" />
          </g>

          {/* Olive green accent lines */}
          <rect x="10" y="18" width="3" height="3" fill="#4f5d2f" />
          <rect x="107" y="18" width="3" height="3" fill="#4f5d2f" />
          <rect x="6" y="44" width="3" height="3" fill="#4f5d2f" />
          <rect x="111" y="44" width="3" height="3" fill="#4f5d2f" />

          {/* Bottom zig-zag */}
          <polyline
            points="0,58 10,66 20,58 30,66 40,58 50,66 60,58 70,66 80,58 90,66 100,58 110,66 120,58"
            fill="none"
            stroke="#1f1f1f"
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tatreez-main)" />
    </svg>
  )
}

export function KeffiyehPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 80"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="keffiyeh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#1a1a1a" />
          <path d="M0 0 L20 20 L40 0" fill="none" stroke="#f4efe6" strokeWidth="2" opacity="0.9" />
          <path
            d="M0 40 L20 20 L40 40"
            fill="none"
            stroke="#f4efe6"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M0 20 L20 0 L40 20"
            fill="none"
            stroke="#f4efe6"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M0 20 L20 40 L40 20"
            fill="none"
            stroke="#f4efe6"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <rect x="18" y="18" width="4" height="4" fill="#f4efe6" opacity="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#keffiyeh)" />
    </svg>
  )
}

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronLeft({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUp({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 19V5M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OliveBranch({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M60 150 V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="45" cy="50" rx="14" ry="7" fill="currentColor" transform="rotate(-30 45 50)" />
      <ellipse
        cx="75"
        cy="55"
        rx="14"
        ry="7"
        fill="currentColor"
        transform="rotate(30 75 55)"
        opacity="0.85"
      />
      <ellipse cx="42" cy="75" rx="13" ry="6.5" fill="currentColor" transform="rotate(-25 42 75)" />
      <ellipse
        cx="78"
        cy="80"
        rx="13"
        ry="6.5"
        fill="currentColor"
        transform="rotate(25 78 80)"
        opacity="0.85"
      />
      <ellipse cx="48" cy="100" rx="12" ry="6" fill="currentColor" transform="rotate(-20 48 100)" />
      <ellipse
        cx="72"
        cy="105"
        rx="12"
        ry="6"
        fill="currentColor"
        transform="rotate(20 72 105)"
        opacity="0.85"
      />
      <ellipse cx="55" cy="125" rx="10" ry="5" fill="currentColor" transform="rotate(-15 55 125)" />
      <ellipse
        cx="65"
        cy="128"
        rx="10"
        ry="5"
        fill="currentColor"
        transform="rotate(15 65 128)"
        opacity="0.85"
      />
    </svg>
  )
}

export function DetailedOliveBranch({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M70 185 V25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <g fill="currentColor">
        <ellipse cx="50" cy="45" rx="18" ry="8" transform="rotate(-35 50 45)" />
        <ellipse cx="90" cy="52" rx="18" ry="8" transform="rotate(35 90 52)" opacity="0.9" />
        <ellipse cx="46" cy="75" rx="16" ry="7" transform="rotate(-30 46 75)" />
        <ellipse cx="94" cy="82" rx="16" ry="7" transform="rotate(30 94 82)" opacity="0.9" />
        <ellipse cx="52" cy="105" rx="15" ry="6.5" transform="rotate(-25 52 105)" />
        <ellipse cx="88" cy="112" rx="15" ry="6.5" transform="rotate(25 88 112)" opacity="0.9" />
        <ellipse cx="56" cy="135" rx="13" ry="6" transform="rotate(-20 56 135)" />
        <ellipse cx="84" cy="142" rx="13" ry="6" transform="rotate(20 84 142)" opacity="0.9" />
        <ellipse cx="62" cy="162" rx="11" ry="5" transform="rotate(-15 62 162)" />
        <ellipse cx="78" cy="168" rx="11" ry="5" transform="rotate(15 78 168)" opacity="0.9" />
      </g>
    </svg>
  )
}

export function FloralOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 4 L14 10 L20 12 L14 14 L12 20 L10 14 L4 12 L10 10 Z" fill="#8b2635" />
      <circle cx="12" cy="12" r="3" fill="#f4efe6" />
      <circle cx="12" cy="12" r="1.5" fill="#4f5d2f" />
    </svg>
  )
}

export function PalestineMap({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="200" height="160" rx="16" fill="#4f5d2f" />
      <path
        d="M105 28 L118 32 L128 46 L132 64 L138 78 L142 96 L138 114 L128 128 L112 134 L96 132 L84 124 L76 110 L72 92 L68 74 L72 56 L82 42 L94 32 Z"
        fill="none"
        stroke="#e8e0d2"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      <path
        d="M108 42 L118 46 L124 58 L126 72 L130 84 L132 98 L128 112 L120 122 L108 126 L96 124 L86 116 L80 104 L78 88 L76 72 L80 58 L90 48 L100 42 Z"
        fill="none"
        stroke="#e8e0d2"
        strokeWidth="1"
      />
      <g fill="#e8e0d2">
        <circle cx="104" cy="82" r="4" />
        <path d="M100 82 L104 74 L108 82 L104 86 Z" fill="#4f5d2f" />
      </g>
      <text
        x="100"
        y="148"
        textAnchor="middle"
        fill="#e8e0d2"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fontWeight="500"
      >
        Helsinki
      </text>
      <text
        x="100"
        y="158"
        textAnchor="middle"
        fill="rgba(232, 224, 210, 0.7)"
        fontSize="10"
        fontFamily="var(--font-sans)"
      >
        Finland
      </text>
    </svg>
  )
}

export function HelsinkiMap({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="200" height="200" rx="16" fill="#4f5d2f" />
      <path
        d="M60 160 Q50 140 55 120 Q60 100 80 90 Q100 80 120 85 Q140 90 150 110 Q160 130 155 150 Q150 170 130 175 Q110 180 90 175 Q70 170 60 160 Z"
        fill="none"
        stroke="#e8e0d2"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <path
        d="M70 150 Q65 135 70 120 Q75 105 90 98 Q105 92 115 95 Q130 100 138 115 Q145 130 140 145 Q135 160 120 165 Q105 170 90 165 Q75 160 70 150 Z"
        fill="none"
        stroke="#e8e0d2"
        strokeWidth="1"
      />
      <circle cx="110" cy="130" r="5" fill="#e8e0d2" />
      <circle cx="110" cy="130" r="2.5" fill="#4f5d2f" />
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fill="#e8e0d2"
        fontSize="11"
        fontFamily="var(--font-sans)"
        fontWeight="500"
      >
        Helsinki
      </text>
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fill="rgba(232, 224, 210, 0.7)"
        fontSize="10"
        fontFamily="var(--font-sans)"
      >
        Finland
      </text>
    </svg>
  )
}

export function SocialFacebook({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

export function SocialInstagram({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function SocialEmail({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function SocialWhatsApp({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  )
}

export function MapPin({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Calendar({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export function Users({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

export function Heart({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

export function BookOpen({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  )
}

export function Mail({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function Send({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
