type SkeletonProps = {
  width?: string | number
  height?: string | number
  radius?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Skeleton({ width, height, radius, className = '' }: SkeletonProps) {
  const radiusClass = radius ? ` skeleton-radius-${radius}` : ''
  return (
    <div
      className={`skeleton${radiusClass} ${className}`.trim()}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
