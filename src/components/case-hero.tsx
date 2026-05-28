import type { ReactNode } from 'react'
import type { CaseFrontmatter } from '@/lib/types'
import { PatternBadge } from './pattern-badge'
import { useT } from '@/lib/i18n/use-t'
import type { MessageKey } from '@/lib/i18n/messages'

const statusKey: Record<CaseFrontmatter['status'], MessageKey> = {
  documented: 'case.status.documented',
  alleged: 'case.status.alleged',
  'pattern-match': 'case.status.patternMatch',
}

const severityLabel: Record<CaseFrontmatter['severity'], string> = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
}

function formatUsd(value?: number): string {
  if (typeof value !== 'number') return '—'
  if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  if (Math.abs(value) >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
  return `$${value.toFixed(2)}`
}

function formatPrice(value?: number): string {
  if (typeof value !== 'number') return '—'
  return `$${value.toFixed(2)}`
}

function formatPct(value?: number): string {
  if (typeof value !== 'number') return '—'
  const pct = value * 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`
}

interface CaseHeroProps {
  data: CaseFrontmatter
}

export function CaseHero({ data }: CaseHeroProps) {
  const t = useT()
  const m = data.metrics

  const stats: Array<{ label: string; value: string; emphasis?: boolean }> = []
  if (m) {
    if (typeof m.startPrice === 'number' && typeof m.peakPrice === 'number') {
      stats.push({
        label: t('case.stat.priceRange'),
        value: `${formatPrice(m.startPrice)} → ${formatPrice(m.peakPrice)}`,
      })
    }
    if (typeof m.maxGain === 'number') {
      stats.push({ label: t('case.stat.maxGain'), value: formatPct(m.maxGain) })
    }
    if (typeof m.maxDrawdown === 'number') {
      stats.push({
        label: t('case.stat.maxDrawdown'),
        value: formatPct(m.maxDrawdown),
        emphasis: true,
      })
    }
    if (typeof m.marketCapPeak === 'number') {
      stats.push({
        label: t('case.stat.marketCapPeak'),
        value: formatUsd(m.marketCapPeak),
      })
    }
    if (typeof m.marketCapEvaporated === 'number') {
      stats.push({
        label: t('case.stat.marketCapEvaporated'),
        value: `-${formatUsd(m.marketCapEvaporated)}`,
        emphasis: true,
      })
    }
    if (
      typeof m.pumpDurationDays === 'number' ||
      typeof m.crashDurationHours === 'number'
    ) {
      stats.push({
        label: t('case.stat.pumpCrash'),
        value: `${m.pumpDurationDays ?? '—'}d / ${m.crashDurationHours ?? '—'}h`,
      })
    }
    if (typeof m.liquidationVolume24h === 'number') {
      stats.push({
        label: t('case.stat.liquidation24h'),
        value: formatUsd(m.liquidationVolume24h),
      })
    }
  }

  return (
    <section className="border-b border-ink-700/60 bg-gradient-to-b from-ink-800/30 to-transparent">
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-8 md:px-10 md:pb-14 md:pt-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-ink-700/40 pb-3 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-ink-300">Case · {data.tokenSymbol}</span>
          <span className="text-ink-700">/</span>
          <span className="text-ink-400">{t(statusKey[data.status])}</span>
          <span className="ml-auto rounded-sm border border-ink-600 px-1.5 py-0.5 text-ink-100">
            {severityLabel[data.severity]}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-ink-50 md:text-5xl">
          {data.title}
        </h1>
        <p className="mt-3 font-mono text-xs text-ink-500">
          {t('case.hero.incident')} {data.incidentDate} · {t('case.hero.published')} {data.publishedDate}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {data.patterns.map((p) => (
            <PatternBadge key={p} pattern={p} />
          ))}
        </div>

        {stats.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-ink-700/60 bg-ink-700/60 sm:grid-cols-3 lg:grid-cols-6">
            {stats.slice(0, 6).map((s) => (
              <StatCell key={s.label} {...s} />
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}

function StatCell({
  label,
  value,
  emphasis,
}: {
  label: string
  value: ReactNode
  emphasis?: boolean
}) {
  return (
    <div className="bg-ink-900 px-4 py-4">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
        {label}
      </dt>
      <dd
        className={`mt-2 font-mono text-lg leading-tight md:text-xl ${
          emphasis ? 'text-ink-50' : 'text-ink-100'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
