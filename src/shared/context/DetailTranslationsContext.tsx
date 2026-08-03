import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

export interface DetailTranslation {
  language: string
  slug: string
}

interface DetailTranslationsValue {
  translations: DetailTranslation[] | null
  setTranslations: (translations: DetailTranslation[] | null) => void
}

const DetailTranslationsContext = createContext<DetailTranslationsValue | null>(null)

export function DetailTranslationsProvider({ children }: { children: ReactNode }) {
  const [translations, setTranslations] = useState<DetailTranslation[] | null>(null)
  const location = useLocation()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTranslations(null)
  }, [location.pathname])

  const value = useMemo(() => ({ translations, setTranslations }), [translations])

  return (
    <DetailTranslationsContext.Provider value={value}>
      {children}
    </DetailTranslationsContext.Provider>
  )
}

function useDetailTranslationsContext(): DetailTranslationsValue {
  const context = useContext(DetailTranslationsContext)
  if (!context) {
    throw new Error('useDetailTranslationsContext must be used within a DetailTranslationsProvider')
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDetailTranslations(): DetailTranslation[] | null {
  return useDetailTranslationsContext().translations
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSetDetailTranslations(
  translations: DetailTranslation[] | null | undefined
): void {
  const { setTranslations } = useDetailTranslationsContext()
  useEffect(() => {
    setTranslations(translations ?? null)
  }, [translations, setTranslations])
}
