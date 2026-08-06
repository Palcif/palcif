import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router'

export interface DetailTranslation {
  language: string
  slug: string
}

interface DetailTranslationsState {
  pathname: string
  translations: DetailTranslation[] | null
}

interface DetailTranslationsValue {
  state: DetailTranslationsState | null
  setTranslations: (pathname: string, translations: DetailTranslation[] | null) => void
}

const DetailTranslationsContext = createContext<DetailTranslationsValue | null>(null)

export function DetailTranslationsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DetailTranslationsState | null>(null)

  const setTranslations = useCallback(
    (pathname: string, translations: DetailTranslation[] | null) => {
      setState({ pathname, translations })
    },
    []
  )

  const value = useMemo(() => ({ state, setTranslations }), [state, setTranslations])

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
  const { state } = useDetailTranslationsContext()
  const location = useLocation()
  return state?.pathname === location.pathname ? state.translations : null
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSetDetailTranslations(
  translations: DetailTranslation[] | null | undefined
): void {
  const { setTranslations } = useDetailTranslationsContext()
  const location = useLocation()
  useEffect(() => {
    setTranslations(location.pathname, translations ?? null)
  }, [location.pathname, translations, setTranslations])
}
