import { useLang } from '@/lib/use-lang'

// Cumulative supply concentration, own Dune reconstruction (query 7939112) of
// RAIN on Arbitrum. 189,257 holders total; the top 81 hold 99.97%.
const points: Array<{ n: number; pct: number; label?: string }> = [
  { n: 10, pct: 88.34, label: 'top 10 · 88.3%' },
  { n: 50, pct: 99.87, label: 'top 50 · 99.87%' },
  { n: 81, pct: 99.97, label: 'top 81 · 99.97%' },
  { n: 100, pct: 99.98 },
]

const text = {
  ko: {
    ariaLabel:
      'RAIN 공급 집중도 곡선 (Arbitrum, 자체 Dune 재구성). 총 홀더 189,257개 중 상위 10개가 88.3%, 상위 50개가 99.87%, 상위 81개가 99.97%를 보유 — 나머지 약 189,176개 지갑이 약 0.03%만 나눠 가짐.',
    title: '상위 N개 지갑의 누적 보유 비율',
    holders: '총 홀더 189,257 · 하위 ~189,176개 = 약 0.03%',
    match: 'ZachXBT 주장(81지갑 99.97%)과 자체 측정 일치',
  },
  en: {
    ariaLabel:
      'RAIN supply concentration curve (Arbitrum, own Dune reconstruction). Of 189,257 total holders, the top 10 hold 88.3%, the top 50 hold 99.87%, and the top 81 hold 99.97% — the remaining ~189,176 wallets share only ~0.03%.',
    title: 'Cumulative supply held by the top N wallets',
    holders: '189,257 holders total · bottom ~189,176 = ~0.03%',
    match: 'own measurement matches ZachXBT (81 wallets, 99.97%)',
  },
} as const

export function RainConcentration() {
  const [lang] = useLang()
  const t = text[lang]

  const W = 720
  const H = 300
  const M = { l: 44, r: 120, t: 30, b: 40 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b

  // log-ish x by rank index (categorical positions), y = pct 80..100 zoomed
  const xs = [0, 1, 2, 3]
  const xScale = (i: number) => M.l + (i / (xs.length - 1)) * innerW
  const yMin = 80
  const yScale = (p: number) =>
    M.t + innerH - ((p - yMin) / (100 - yMin)) * innerH

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i).toFixed(1)} ${yScale(p.pct).toFixed(1)}`)
    .join(' ')

  const yTicks = [80, 90, 95, 100]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* y gridlines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line
            x1={M.l}
            x2={M.l + innerW}
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
            {v}%
          </text>
        </g>
      ))}

      {/* area under curve to baseline */}
      <path
        d={`${path} L ${xScale(3)} ${yScale(yMin)} L ${xScale(0)} ${yScale(yMin)} Z`}
        className="fill-ink-700/30"
      />
      {/* curve */}
      <path
        d={path}
        fill="none"
        className="stroke-ink-50"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />

      {/* points + labels */}
      {points.map((p, i) => {
        const cx = xScale(i)
        const cy = yScale(p.pct)
        return (
          <g key={p.n}>
            <circle cx={cx} cy={cy} r={p.label ? 3.4 : 2} className="fill-ink-50" />
            <text
              x={cx}
              y={H - M.b + 18}
              textAnchor="middle"
              className="fill-ink-500 font-mono text-[10px]"
            >
              {p.n}
            </text>
            {p.label && (
              <text
                x={cx}
                y={cy - 10}
                textAnchor={i === 0 ? 'start' : 'middle'}
                className="fill-ink-100 font-mono text-[10px] font-semibold"
              >
                {p.label}
              </text>
            )}
          </g>
        )
      })}

      {/* the 99.97% plateau marker on the right */}
      <line
        x1={xScale(2)}
        x2={M.l + innerW + 8}
        y1={yScale(99.97)}
        y2={yScale(99.97)}
        className="stroke-ink-400"
        strokeWidth={0.75}
        strokeDasharray="3 3"
      />
      <text
        x={M.l + innerW + 12}
        y={yScale(99.97) - 4}
        className="fill-ink-100 font-mono text-[11px] font-semibold"
      >
        99.97%
      </text>
      <text
        x={M.l + innerW + 12}
        y={yScale(99.97) + 10}
        className="fill-ink-400 font-mono text-[8px]"
      >
        top 81 wallets
      </text>

      {/* x axis title */}
      <text
        x={M.l + innerW / 2}
        y={H - 6}
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.2em]"
      >
        {t.title}
      </text>

      {/* footer notes */}
      <text x={M.l} y={M.t - 12} className="fill-ink-400 font-mono text-[9px]">
        {t.holders}
      </text>
    </svg>
  )
}
