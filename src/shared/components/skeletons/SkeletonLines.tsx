import { Skeleton } from './Skeleton'

type SkeletonLinesProps = {
  widths: (string | number)[]
  height?: number
}

export function SkeletonLines({ widths, height = 14 }: SkeletonLinesProps) {
  return (
    <>
      {widths.map((width, index) => (
        <Skeleton key={index} width={width} height={height} className="skeleton-line" />
      ))}
    </>
  )
}
