import { useSyncExternalStore } from 'react'
import type { Lang } from './cases'

const LANG_KEY = 'lang'
const LANG_EVENT = 'lang-change'

function read(): Lang {
  if (typeof document === 'undefined') return 'ko'
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'ko' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en')) {
    return 'en'
  }
  return 'ko'
}

function subscribe(callback: () => void): () => void {
  const handler = () => callback()
  window.addEventListener('storage', handler)
  window.addEventListener(LANG_EVENT, handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(LANG_EVENT, handler)
  }
}

const serverRead = (): Lang => 'ko'

export function useLang(): readonly [Lang, (next: Lang) => void] {
  const lang = useSyncExternalStore<Lang>(subscribe, read, serverRead)
  const setLang = (next: Lang) => {
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
    window.dispatchEvent(new Event(LANG_EVENT))
  }
  return [lang, setLang] as const
}
