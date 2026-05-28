import { Link, Navigate, useParams } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { CaseHero } from '@/components/case-hero'
import { TranslationPending } from '@/components/translation-pending'
import { getCase } from '@/lib/cases'
import { mdxComponents } from '@/lib/mdx-components'
import { useLang } from '@/lib/use-lang'
import { useT } from '@/lib/i18n/use-t'

export function CaseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [lang] = useLang()
  const t = useT()
  const lookup = slug ? getCase(slug, lang) : undefined

  if (!lookup) {
    return <Navigate to="/" replace />
  }

  const { entry, isFallback } = lookup
  const { frontmatter, Component } = entry

  return (
    <Layout>
      {isFallback && <TranslationPending />}
      <div className="border-b border-ink-700/40 bg-ink-900/80 px-6 py-3 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-widest text-ink-500 transition hover:text-ink-300"
          >
            {t('case.back')}
          </Link>
        </div>
      </div>

      <CaseHero data={frontmatter} />

      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
        <Component components={mdxComponents} />
      </article>
    </Layout>
  )
}
