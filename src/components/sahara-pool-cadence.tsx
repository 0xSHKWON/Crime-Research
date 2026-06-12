import { useLang } from '@/lib/use-lang'

interface DayPoint {
  date: string
  tokIn: number // millions, into 0x194e (lock)
  tokOut: number // millions, out of 0x194e (release)
}

// 자체 Dune 인덱싱 (query 7703614) — 0x194e 풀 일일 in/out, 단위 백만 SAHARA
const data: DayPoint[] = [
  { date: '06/03', tokIn: 150.0, tokOut: 0 },
  { date: '06/05', tokIn: 0, tokOut: 81.9 },
  { date: '06/06', tokIn: 0, tokOut: 63.7 },
  { date: '06/07', tokIn: 150.0, tokOut: 60.1 },
  { date: '06/08', tokIn: 150.0, tokOut: 242.1 },
  { date: '06/09', tokIn: 300.1, tokOut: 302.4 },
  { date: '06/10', tokIn: 300.3, tokOut: 145.3 },
  { date: '06/11', tokIn: 0, tokOut: 92.2 },
]

const text = {
  ko: {
    ariaLabel:
      '0x194e 브릿지 풀의 일일 SAHARA 유입(lock)/유출(release) 막대그래프 (2026-06-03 ~ 06-11, 자체 Dune 인덱싱). 풀이 정적 lock 이 아니라 일 단위로 수억 토큰을 순환하며, 6/8~9 유출이 유입을 초과해 드레인됐다가 6/9~10 300M씩 재충전된 흐름을 보여줌.',
    inLabel: '유입 (lock)',
    outLabel: '유출 (release)',
    crashLabel: '06-09 급락 →',
    unit: 'M SAHARA',
  },
  en: {
    ariaLabel:
      'Daily SAHARA inflow (lock) / outflow (release) of the 0x194e bridge pool, June 3-11 2026 (own Dune indexing). Shows the pool cycling hundreds of millions of tokens per day rather than holding statically — net drained Jun 8-9 as releases exceeded locks, then replenished 300M/day Jun 9-10.',
    inLabel: 'inflow (lock)',
    outLabel: 'outflow (release)',
    crashLabel: '06-09 crash →',
    unit: 'M SAHARA',
  },
} as const

export function SaharaPoolCadence() {
  const [lang] = useLang()
  const t = text[lang]

  const W = 720
  const H = 280
  const M = { l: 48, r: 20, t: 28, b: 36 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b
  const maxY = 320
  const n = data.length

  const band = innerW / n
  const barW = Math.min(16, band / 2 - 4)
  const yScale = (v: number) => M.t + innerH - (v / maxY) * innerH
  const bandCenter = (i: number) => M.l + band * (i + 0.5)

  const crashIdx = data.findIndex((d) => d.date === '06/09')

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* Y grid + labels */}
      {[0, 100, 200, 300].map((v) => (
        <g key={v}>
          <line
            x1={M.l}
            x2={W - M.r}
            y1={yScale(v)}
            y2={yScale(v)}
            className="stroke-ink-700"
            strokeWidth={0.5}
          />
          <text
            x={M.l - 8}
            y={yScale(v) + 3}
            textAnchor="end"
            className="fill-ink-500 font-mono text-[10px]"
          >
            {v}
          </text>
        </g>
      ))}

      {/* crash marker */}
      <g>
        <line
          x1={bandCenter(crashIdx)}
          x2={bandCenter(crashIdx)}
          y1={M.t}
          y2={M.t + innerH}
          className="stroke-ink-500"
          strokeDasharray="3 3"
          strokeWidth={0.8}
        />
        <text
          x={bandCenter(crashIdx) + 6}
          y={M.t + 12}
          className="fill-ink-300 font-mono text-[9px] uppercase tracking-widest"
        >
          {t.crashLabel}
        </text>
      </g>

      {/* bars */}
      {data.map((d, i) => {
        const cx = bandCenter(i)
        return (
          <g key={d.date}>
            <rect
              x={cx - barW - 1}
              y={yScale(d.tokIn)}
              width={barW}
              height={M.t + innerH - yScale(d.tokIn)}
              className="fill-ink-300"
            />
            <rect
              x={cx + 1}
              y={yScale(d.tokOut)}
              width={barW}
              height={M.t + innerH - yScale(d.tokOut)}
              className="fill-ink-600"
            />
            <text
              x={cx}
              y={H - M.b + 16}
              textAnchor="middle"
              className="fill-ink-500 font-mono text-[9px]"
            >
              {d.date}
            </text>
          </g>
        )
      })}

      {/* legend */}
      <g>
        <rect x={M.l} y={M.t - 14} width={9} height={9} className="fill-ink-300" />
        <text
          x={M.l + 14}
          y={M.t - 6}
          className="fill-ink-400 font-mono text-[9px] uppercase tracking-widest"
        >
          {t.inLabel}
        </text>
        <rect
          x={M.l + 110}
          y={M.t - 14}
          width={9}
          height={9}
          className="fill-ink-600"
        />
        <text
          x={M.l + 124}
          y={M.t - 6}
          className="fill-ink-400 font-mono text-[9px] uppercase tracking-widest"
        >
          {t.outLabel}
        </text>
        <text
          x={W - M.r}
          y={M.t - 6}
          textAnchor="end"
          className="fill-ink-600 font-mono text-[9px] uppercase tracking-widest"
        >
          {t.unit}
        </text>
      </g>
    </svg>
  )
}
