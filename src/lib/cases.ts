import type { MDXContent } from 'mdx/types'
import { caseFrontmatterSchema } from './schema'
import type { CaseFrontmatter } from './types'

export type Lang = 'ko' | 'en'

interface MdxModule {
  default: MDXContent
  frontmatter: unknown
}

const koModules = import.meta.glob<MdxModule>('../content/cases/ko/*.mdx', {
  eager: true,
})
const enModules = import.meta.glob<MdxModule>('../content/cases/en/*.mdx', {
  eager: true,
})

export interface CaseEntry {
  frontmatter: CaseFrontmatter
  Component: MDXContent
}

function build(modules: Record<string, MdxModule>): Record<string, CaseEntry> {
  const out: Record<string, CaseEntry> = {}
  for (const [path, mod] of Object.entries(modules)) {
    const result = caseFrontmatterSchema.safeParse(mod.frontmatter)
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in ${path}: ${result.error.message}`,
      )
    }
    out[result.data.slug] = { frontmatter: result.data, Component: mod.default }
  }
  return out
}

const koBySlug = build(koModules)
const enBySlug = build(enModules)

function sortByDate(entries: CaseEntry[]): CaseEntry[] {
  return [...entries].sort((a, b) =>
    b.frontmatter.incidentDate.localeCompare(a.frontmatter.incidentDate),
  )
}

export function getCases(lang: Lang): CaseEntry[] {
  // ko 슬러그 전체를 기준 — en 없으면 ko fallback
  return sortByDate(
    Object.values(koBySlug).map((koEntry) => {
      const slug = koEntry.frontmatter.slug
      return lang === 'en' ? (enBySlug[slug] ?? koEntry) : koEntry
    }),
  )
}

export interface CaseLookup {
  entry: CaseEntry
  isFallback: boolean
}

export function getCase(slug: string, lang: Lang): CaseLookup | undefined {
  if (lang === 'en') {
    const en = enBySlug[slug]
    if (en) return { entry: en, isFallback: false }
    const ko = koBySlug[slug]
    if (ko) return { entry: ko, isFallback: true }
    return undefined
  }
  const ko = koBySlug[slug]
  return ko ? { entry: ko, isFallback: false } : undefined
}

// 기존 호출자 호환 — 점진 마이그레이션용. 새 코드는 getCases(lang) 사용.
export const cases: CaseEntry[] = getCases('ko')
