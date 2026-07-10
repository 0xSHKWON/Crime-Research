import { useLang } from '@/lib/use-lang'

// Daily NexF transfer counts, own Dune indexing (query 7938125) of the
// community-attributed contract 0x16ca…54c. day = days since 2024-05-29 deploy.
// Launch day (1,257) is clipped at the axis cap — marked with a break glyph.
const rows: Array<[number, number]> = [
  [0, 1257],
  [1, 49],
  [2, 71],
  [85, 2],
  [86, 18],
  [87, 55],
  [88, 54],
  [89, 57],
  [90, 69],
  [91, 60],
  [92, 58],
  [93, 50],
  [94, 43],
  [95, 53],
  [96, 28],
  [97, 48],
  [98, 44],
  [99, 55],
  [100, 45],
  [101, 54],
  [102, 48],
  [103, 47],
  [104, 52],
  [105, 46],
  [106, 29],
  [107, 39],
  [108, 39],
  [109, 45],
  [110, 25],
  [111, 36],
  [112, 24],
]

const xTicks = [
  { label: '06/01', day: 3 },
  { label: '07/01', day: 33 },
  { label: '08/01', day: 64 },
  { label: '09/01', day: 95 },
  { label: '10/01', day: 125 },
]

const text = {
  ko: {
    ariaLabel:
      'NexF 토큰 일별 온체인 전송 건수 (자체 Dune 인덱싱, 2024-05-29 ~ 10-09). 5월 29일 배포일 1,257건(축 절단) 후 6~8월 12주간 전송 0건의 완전 휴면. 8월 22일부터 9월 18일까지 4주간 일 24~69건의 균일한 봇 회전이 이어지다 9월 18일 완전 정지. 3주 뒤인 10월 9일 DOJ 기소 공개.',
    launch: '05/29 배포 1,257건 (축 절단)',
    dormant: '12주 휴면 · 전송 0',
    botWindow: '봇 윈도우 4주 · 일 24~69건',
    stop: '09/18 정지',
    unsealed: '10/09 기소 공개',
  },
  en: {
    ariaLabel:
      'Daily on-chain NexF transfer counts (own Dune indexing, 2024-05-29 to 10-09). 1,257 transfers on the May 29 deploy day (clipped), then a fully dormant 12 weeks (zero transfers) through August. From Aug 22 to Sep 18, a four-week bot window of uniform 24-69 transfers per day, then a dead stop on Sep 18. Three weeks later, on Oct 9, the DOJ unsealed charges.',
    launch: '05/29 deploy · 1,257 (clipped)',
    dormant: '12 weeks dormant · zero transfers',
    botWindow: 'bot window · 24-69 transfers/day',
    stop: '09/18 stop',
    unsealed: '10/09 charges unsealed',
  },
} as const

export function GotbitChurn() {
  const [lang] = useLang()
  const t = text[lang]

  const W = 720
  const H = 300
  const M = { l: 44, r: 20, t: 30, b: 38 }
  const innerW = W - M.l - M.r
  const innerH = H - M.t - M.b

  const totalDays = 140
  const yMax = 80 // cap — launch day is clipped and annotated

  const xScale = (day: number) => M.l + (day / totalDays) * innerW
  const yScale = (v: number) => M.t + innerH - (Math.min(v, yMax) / yMax) * innerH

  const barW = (innerW / (totalDays + 1)) * 0.72

  const gridVals = [0, 20, 40, 60, 80]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* gridlines */}
      {gridVals.map((v) => (
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

      {/* daily bars */}
      {rows.map(([day, v]) => {
        const clipped = v > yMax
        return (
          <g key={day}>
            <rect
              x={xScale(day) - barW / 2}
              y={yScale(v)}
              width={barW}
              height={M.t + innerH - yScale(v)}
              className={clipped ? 'fill-ink-400' : 'fill-ink-200'}
            />
            {clipped && (
              // axis-break glyph on the clipped launch bar
              <path
                d={`M ${xScale(day) - barW / 2 - 3} ${M.t + 14} l ${barW + 6} -5 m ${-(barW + 6)} 9 l ${barW + 6} -5`}
                fill="none"
                className="stroke-ink-900"
                strokeWidth={2.5}
              />
            )}
          </g>
        )
      })}

      {/* launch annotation */}
      <text
        x={xScale(0) + 8}
        y={M.t + 8}
        className="fill-ink-300 font-mono text-[10px]"
      >
        {t.launch}
      </text>

      {/* dormancy annotation */}
      <text
        x={xScale(44)}
        y={yScale(38)}
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[10px] uppercase tracking-widest"
      >
        {t.dormant}
      </text>

      {/* bot-window bracket */}
      <path
        d={`M ${xScale(85) - barW} ${yScale(72)} v -8 H ${xScale(112) + barW} v 8`}
        fill="none"
        className="stroke-ink-500"
        strokeWidth={1}
      />
      <text
        x={xScale(98.5)}
        y={yScale(72) - 16}
        textAnchor="middle"
        className="fill-ink-300 font-mono text-[10px]"
      >
        {t.botWindow}
      </text>

      {/* stop marker */}
      <text
        x={xScale(112) + 6}
        y={yScale(24) - 4}
        className="fill-ink-400 font-mono text-[9px]"
      >
        {t.stop}
      </text>

      {/* unsealing line */}
      <line
        x1={xScale(133)}
        x2={xScale(133)}
        y1={M.t}
        y2={M.t + innerH}
        className="stroke-ink-400"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={xScale(133) - 6}
        y={M.t + 12}
        textAnchor="end"
        className="fill-ink-100 font-mono text-[10px] font-semibold"
      >
        {t.unsealed}
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
