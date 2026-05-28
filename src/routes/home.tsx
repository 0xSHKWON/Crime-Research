import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { CaseCard } from '@/components/case-card'
import { PatternBadge } from '@/components/pattern-badge'
import { getCases } from '@/lib/cases'
import { useLang } from '@/lib/use-lang'
import { useT } from '@/lib/i18n/use-t'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [lang] = useLang()
  const t = useT()
  const cases = useMemo(() => getCases(lang), [lang])

  const activePatterns = useMemo(() => {
    const raw = searchParams.get('p')
    if (!raw) return [] as string[]
    return raw.split(',').filter(Boolean)
  }, [searchParams])

  const allPatterns = useMemo(() => {
    const counts = new Map<string, number>()
    for (const entry of cases) {
      for (const p of entry.frontmatter.patterns) {
        counts.set(p, (counts.get(p) ?? 0) + 1)
      }
    }
    return [...counts.entries()].sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]
      return a[0].localeCompare(b[0])
    })
  }, [cases])

  const togglePattern = (pattern: string) => {
    const next = activePatterns.includes(pattern)
      ? activePatterns.filter((p) => p !== pattern)
      : [...activePatterns, pattern]
    if (next.length === 0) {
      searchParams.delete('p')
    } else {
      searchParams.set('p', next.join(','))
    }
    setSearchParams(searchParams, { replace: true })
  }

  const clearFilter = () => {
    searchParams.delete('p')
    setSearchParams(searchParams, { replace: true })
  }

  const filteredCases = useMemo(() => {
    if (activePatterns.length === 0) return cases
    return cases.filter((entry) =>
      activePatterns.every((ap) => entry.frontmatter.patterns.includes(ap)),
    )
  }, [activePatterns, cases])

  return (
    <Layout>
      <section className="border-b border-ink-700/60 px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-50 md:text-4xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
            {t('home.hero.body1')}
            <br />
            {t('home.hero.body2')}
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink-200">
              {t('home.section.title')}
            </h2>
            <span className="font-mono text-xs text-ink-500">
              {activePatterns.length > 0
                ? t('home.count.filtered', {
                    n: filteredCases.length,
                    total: cases.length,
                  })
                : t('home.count.all', { n: cases.length })}
            </span>
          </div>

          {allPatterns.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-ink-500">
                {t('home.filter.label')}
              </span>
              {allPatterns.map(([pattern, count]) => (
                <PatternBadge
                  key={pattern}
                  pattern={pattern}
                  active={activePatterns.includes(pattern)}
                  onToggle={togglePattern}
                  countSuffix={String(count)}
                />
              ))}
              {activePatterns.length > 0 && (
                <button
                  type="button"
                  onClick={clearFilter}
                  className="ml-1 font-mono text-[10px] uppercase tracking-widest text-ink-400 transition hover:text-ink-100"
                >
                  {t('home.filter.clear')}
                </button>
              )}
            </div>
          )}

          {filteredCases.length === 0 ? (
            <div className="mt-6 rounded-md border border-dashed border-ink-700 bg-ink-800/40 px-6 py-20 text-center">
              <p className="text-sm text-ink-300">
                {activePatterns.length > 0
                  ? t('home.empty.filtered')
                  : t('home.empty.all')}
              </p>
              <p className="mt-2 text-xs text-ink-500">{t('home.empty.note')}</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((entry) => (
                <CaseCard
                  key={entry.frontmatter.slug}
                  data={entry.frontmatter}
                  activePatterns={activePatterns}
                  onTogglePattern={togglePattern}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
