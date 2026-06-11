import { useLang } from '@/lib/use-lang'

// Daily EDGE deposited INTO centralized exchanges (cex.flows "Inflow"), in EDGE.
// Own measurement — Dune query 7703705 (Ethereum 0xB007…a241).
const data: Array<{ date: string; edge: number }> = [
  { date: '05/20', edge: 86825 },
  { date: '05/21', edge: 582701 },
  { date: '05/22', edge: 369485 },
  { date: '05/23', edge: 155304 },
  { date: '05/24', edge: 494717 },
  { date: '05/25', edge: 145933 },
  { date: '05/26', edge: 251266 },
  { date: '05/27', edge: 220099 },
  { date: '05/28', edge: 358632 },
  { date: '05/29', edge: 127306 },
  { date: '05/30', edge: 187831 },
  { date: '05/31', edge: 160069 },
  { date: '06/01', edge: 3975469 },
  { date: '06/02', edge: 9648418 },
  { date: '06/03', edge: 5291622 },
  { date: '06/04', edge: 952057 },
  { date: '06/05', edge: 912251 },
  { date: '06/06', edge: 543744 },
  { date: '06/07', edge: 1067466 },
  { date: '06/08', edge: 568882 },
  { date: '06/09', edge: 652450 },
  { date: '06/10', edge: 375353 },
  { date: '06/11', edge: 705249 },
]

const CRASH_IDX = 12 // 06/01

const text = {
  ko: {
    ariaLabel:
      'EDGE 거래소 일일 입금(매도성 유입) 막대그래프, 5/20~6/11. 5/31까지 하루 13만~58만 EDGE로 평탄하다가 6/1 약 398만, 6/2 약 965만으로 약 25배 급증',
    crash: '06/01 폭락',
    note: '거래소 입금 = 매도성 유입 · 자체 측정',
  },
  en: {
    ariaLabel:
      'Daily EDGE deposits into exchanges (sell-side inflow), May 20 to Jun 11. Flat at 130K-580K EDGE/day through May 31, then ~3.98M on Jun 1 and ~9.65M on Jun 2 — a ~25x surge',
    crash: '06/01 crash',
    note: 'exchange deposits = sell-side inflow · own measurement',
  },
} as const

export function EdgexCexFlow() {
  const [lang] = useLang()
  const t = text[lang]

  const W = 720
  const H = 300
  const M = { l: 52, r: 20, t: 28, b: 40 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b
  const maxY = 10_000_000
  const n = data.length
  const slot = innerW / n
  const barW = slot * 0.62

  const xLeft = (i: number) => M.l + i * slot + (slot - barW) / 2
  const xMid = (i: number) => M.l + i * slot + slot / 2
  const yScale = (v: number) => M.t + innerH - (v / maxY) * innerH

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* Y-axis grid + labels (in millions of EDGE) */}
      {[0, 2, 4, 6, 8, 10].map((mm) => {
        const v = mm * 1_000_000
        return (
          <g key={mm}>
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
              {mm}M
            </text>
          </g>
        )
      })}

      {/* Crash marker */}
      <line
        x1={xMid(CRASH_IDX)}
        x2={xMid(CRASH_IDX)}
        y1={M.t}
        y2={M.t + innerH}
        className="stroke-ink-500"
        strokeDasharray="3 3"
        strokeWidth={0.8}
      />
      <text
        x={xMid(CRASH_IDX) - 6}
        y={M.t + 12}
        textAnchor="end"
        className="fill-ink-300 font-mono text-[9px] uppercase tracking-widest"
      >
        {t.crash}
      </text>

      {/* Bars */}
      {data.map((d, i) => {
        const h = (d.edge / maxY) * innerH
        const isCrash = i >= CRASH_IDX && i <= CRASH_IDX + 2
        return (
          <rect
            key={d.date}
            x={xLeft(i)}
            y={yScale(d.edge)}
            width={barW}
            height={Math.max(0.5, h)}
            className={isCrash ? 'fill-ink-50' : 'fill-ink-600'}
          />
        )
      })}

      {/* X-axis labels (every 3rd day + crash) */}
      {data.map((d, i) => {
        if (i % 3 !== 0 && i !== CRASH_IDX) return null
        return (
          <text
            key={`x-${d.date}`}
            x={xMid(i)}
            y={H - M.b + 18}
            textAnchor="middle"
            className="fill-ink-500 font-mono text-[10px]"
          >
            {d.date}
          </text>
        )
      })}

      {/* footnote */}
      <text
        x={W - M.r}
        y={H - 8}
        textAnchor="end"
        className="fill-ink-600 font-mono text-[9px] uppercase tracking-widest"
      >
        {t.note}
      </text>
    </svg>
  )
}
