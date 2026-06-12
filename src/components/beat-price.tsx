import { useLang } from '@/lib/use-lang'

// Exact CoinGecko anchors (2026-06-12 snapshot). Only measured points are plotted;
// the long Nov→May base is drawn dashed to signal a sparse accumulation base, not detail.
interface Anchor {
  date: string
  day: number // days since 2025-11-02 (ATL)
  price: number
  tag?: 'atl' | 'ath' | 'now'
}

const anchors: Anchor[] = [
  { date: '11/02', day: 0, price: 0.06792, tag: 'atl' },
  { date: '05/13', day: 192, price: 0.5515 },
  { date: '06/05', day: 215, price: 1.618 },
  { date: '06/11', day: 221, price: 10.14, tag: 'ath' },
  { date: '06/12', day: 222, price: 7.54, tag: 'now' },
]

const xTicks = [
  { label: "'25/11", day: 0 },
  { label: "'26/01", day: 60 },
  { label: "'26/03", day: 119 },
  { label: "'26/05", day: 180 },
  { label: "'26/06", day: 212 },
]

const text = {
  ko: {
    ariaLabel:
      'BEAT (Audiera) 가격 궤적 (로그 스케일, CoinGecko 앵커, 2025-11 ~ 2026-06). 약 11개월간 $0.068(ATL)에서 $0.55 부근까지 완만히 오른 뒤, 6월 한 달 만에 $10.14(ATH, 6/11)까지 수직 급등하고 6/12 현재 $7.54로 약 -25% 되돌림. 30일 +1,267%, 7일 +366%.',
    base: '≈11개월 누적 베이스',
    spike: '30일 +1,267% · 7일 +366%',
    pullback: 'ATH 대비 ≈ -25%',
    atl: 'ATL $0.068',
    ath: 'ATH $10.14',
    now: '현재 $7.54',
  },
  en: {
    ariaLabel:
      'BEAT (Audiera) price trajectory (log scale, CoinGecko anchors, Nov 2025 to Jun 2026). After an ~11-month drift from $0.068 (ATL) to about $0.55, it spiked vertically within June to $10.14 (ATH, Jun 11), then pulled back about -25% to $7.54 by Jun 12. 30-day +1,267%, 7-day +366%.',
    base: '≈11-month base',
    spike: '30d +1,267% · 7d +366%',
    pullback: '≈ -25% from ATH',
    atl: 'ATL $0.068',
    ath: 'ATH $10.14',
    now: 'now $7.54',
  },
} as const

export function BeatPrice() {
  const [lang] = useLang()
  const t = text[lang]

  const W = 720
  const H = 300
  const M = { l: 48, r: 26, t: 26, b: 38 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b

  const logMin = -1.3 // ~$0.05
  const logMax = 1.12 // ~$13
  const totalDays = 222

  const xScale = (day: number) => M.l + (day / totalDays) * innerW
  const yScale = (p: number) =>
    M.t + innerH - ((Math.log10(p) - logMin) / (logMax - logMin)) * innerH

  const pt = (a: Anchor) => `${xScale(a.day).toFixed(1)} ${yScale(a.price).toFixed(1)}`

  // base: ATL → May (dashed, sparse); spike: May → now (solid)
  const basePath = `M ${pt(anchors[0])} L ${pt(anchors[1])}`
  const spikePath =
    `M ${pt(anchors[1])} L ${pt(anchors[2])} L ${pt(anchors[3])} L ${pt(anchors[4])}`

  const decades = [0.1, 1, 10]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* decade gridlines */}
      {decades.map((p) => (
        <g key={p}>
          <line
            x1={M.l}
            x2={W - M.r}
            y1={yScale(p)}
            y2={yScale(p)}
            className="stroke-ink-700"
            strokeWidth={0.5}
          />
          <text
            x={M.l - 8}
            y={yScale(p) + 3}
            textAnchor="end"
            className="fill-ink-500 font-mono text-[10px]"
          >
            {p < 1 ? `$${p}` : `$${p}`}
          </text>
        </g>
      ))}

      {/* base segment (dashed) */}
      <path
        d={basePath}
        fill="none"
        className="stroke-ink-500"
        strokeWidth={1.2}
        strokeDasharray="5 4"
        strokeLinejoin="round"
      />
      {/* spike segment (solid) */}
      <path
        d={spikePath}
        fill="none"
        className="stroke-ink-50"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />

      {/* anchor dots + tag labels */}
      {anchors.map((a) => {
        const cx = xScale(a.day)
        const cy = yScale(a.price)
        const tagged = Boolean(a.tag)
        return (
          <g key={a.date}>
            <circle
              cx={cx}
              cy={cy}
              r={tagged ? 3.2 : 2}
              className={tagged ? 'fill-ink-50' : 'fill-ink-400'}
            />
            {a.tag === 'atl' && (
              <text
                x={cx + 6}
                y={cy + 4}
                className="fill-ink-400 font-mono text-[9px]"
              >
                {t.atl}
              </text>
            )}
            {a.tag === 'ath' && (
              <text
                x={cx - 4}
                y={cy - 9}
                textAnchor="end"
                className="fill-ink-100 font-mono text-[10px] font-semibold"
              >
                {t.ath}
              </text>
            )}
            {a.tag === 'now' && (
              <text
                x={cx + 6}
                y={cy + 2}
                className="fill-ink-300 font-mono text-[9px]"
              >
                {t.now}
              </text>
            )}
          </g>
        )
      })}

      {/* base annotation */}
      <text
        x={xScale(96)}
        y={yScale(0.16)}
        textAnchor="middle"
        className="fill-ink-400 font-mono text-[10px] uppercase tracking-widest"
      >
        {t.base}
      </text>
      {/* spike annotation */}
      <text
        x={xScale(210)}
        y={yScale(3.4)}
        textAnchor="end"
        className="fill-ink-300 font-mono text-[10px] uppercase tracking-widest"
      >
        {t.spike}
      </text>
      {/* pullback annotation */}
      <text
        x={xScale(222)}
        y={yScale(7.54) + 18}
        textAnchor="end"
        className="fill-ink-400 font-mono text-[9px]"
      >
        {t.pullback}
      </text>

      {/* x-axis labels */}
      {xTicks.map((tick) => (
        <text
          key={tick.label}
          x={xScale(tick.day)}
          y={H - M.b + 20}
          textAnchor="middle"
          className="fill-ink-500 font-mono text-[10px]"
        >
          {tick.label}
        </text>
      ))}
    </svg>
  )
}
