import { useSiteShell } from '@/features/site-shell/useSiteShell'

export function useSiteSettings() {
  return useSiteShell((data) => ({ siteSettings: data.siteSettings }))
}
