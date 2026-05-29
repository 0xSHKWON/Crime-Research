import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

// 자체 측정 (Dune query 7607048): Bitget 6 (0x1ab4…8f23) → 신규 9개 지갑
// hourly LAB outflow, 2026-05. 테스트 → 휴면 → 대량 인출 3파.
// col 0 = 테스트 단계 (near-zero, 별도 열로 분리해 막대와 겹침 방지)
interface Col {
  kind: 'test' | 'bar'
  date: string
  value?: number // LAB (bar only)
  transfers?: number // bar only
}

const COLS: Col[] = [
  { kind: 'test', date: '05-08' },
  { kind: 'bar', date: '05-11 15:00', value: 28_899_864, transfers: 3 },
  { kind: 'bar', date: '05-11 16:00', value: 21_100_000, transfers: 2 },
  { kind: 'bar', date: '05-12 00:00', value: 41_400_000, transfers: 4 },
]

const Y_MAX = 45_000_000
const PLOT = { x0: 70, x1: 524, yTop: 70, yBase: 250 }
const BAR_W = 58
const BULK_MAX = Math.max(...COLS.filter((c) => c.kind === 'bar').map((c) => c.value ?? 0))

function fmtM(n: number): string {
  return `${(n / 1e6).toFixed(1)}M`
}

export function LabWithdrawal() {
  const [lang] = useLang()
  const t = {
    ko: {
      ariaLabel:
        'LAB Bitget 6 핫월렛 → 신규 9개 지갑 인출 케이던스 막대 차트 (자체 Dune 측정). 5/8 테스트 송금 약 270 LAB 후 3일 휴면, 5/11~12 세 파에 걸쳐 28.9M·21.1M·41.4M LAB 대량 인출, 합계 91.4M.',
      yLabel: 'LAB 인출량 (시간당)',
      testTitle: '테스트 송금',
      testSub: '9건 · ~270 LAB',
      dormant: '(3일 휴면)',
      total: '대량 인출 합계 91.4M LAB · 가격 ATH 구간',
      source: '자체 측정 · Dune',
      tx: (n: number) => `${n}건`,
    },
    en: {
      ariaLabel:
        'LAB Bitget 6 hot wallet → 9 fresh wallets withdrawal cadence bar chart (own Dune measurement). After ~270 LAB test transfers on May 8 and a 3-day dormancy, 28.9M / 21.1M / 41.4M LAB pulled in three waves on May 11-12, totaling 91.4M.',
      yLabel: 'LAB withdrawn (per hour)',
      testTitle: 'test transfers',
      testSub: '9 tx · ~270 LAB',
      dormant: '(3-day dormancy)',
      total: 'bulk total 91.4M LAB · price ATH window',
      source: 'own measurement · Dune',
      tx: (n: number) => `${n} tx`,
    },
  }[lang]

  const scale = (v: number) =>
    PLOT.yBase - (v / Y_MAX) * (PLOT.yBase - PLOT.yTop)
  const gridVals = [0, 15_000_000, 30_000_000, 45_000_000]
  const slot = (PLOT.x1 - PLOT.x0) / COLS.length
  const center = (i: number) => PLOT.x0 + slot * (i + 0.5)

  return (
    <svg
      viewBox="0 0 560 300"
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* y gridlines + labels */}
      <g>
        {gridVals.map((g) => {
          const y = scale(g)
          return (
            <g key={g}>
              <line
                x1={PLOT.x0}
                y1={y}
                x2={PLOT.x1}
                y2={y}
                className="stroke-ink-700/50"
                strokeWidth="1"
                strokeDasharray={g === 0 ? undefined : '2 3'}
              />
              <text
                x={PLOT.x0 - 10}
                y={y + 3}
                textAnchor="end"
                className="fill-ink-500 font-mono text-[9px] tabular-nums"
              >
                {g === 0 ? '0' : fmtM(g)}
              </text>
            </g>
          )
        })}
      </g>

      {/* axis title + total annotation (top band, above plot) */}
      <text
        x={PLOT.x0 - 10}
        y={PLOT.yTop - 30}
        className="fill-ink-400 font-mono text-[9px] uppercase tracking-widest"
      >
        {t.yLabel}
      </text>
      <text
        x={PLOT.x1}
        y={PLOT.yTop - 30}
        textAnchor="end"
        className="fill-ink-200 font-mono text-[9px] font-semibold"
      >
        {t.total}
      </text>

      {/* columns */}
      <g>
        {COLS.map((c, i) => {
          const cx = center(i)

          if (c.kind === 'test') {
            // near-zero marker + label stacked in the empty vertical space
            return (
              <g key={c.date}>
                <circle cx={cx} cy={PLOT.yBase} r="3.5" className="fill-ink-600" />
                <text
                  x={cx}
                  y={PLOT.yBase - 78}
                  textAnchor="middle"
                  className="fill-ink-400 font-mono text-[9px]"
                >
                  {t.testTitle}
                </text>
                <text
                  x={cx}
                  y={PLOT.yBase - 62}
                  textAnchor="middle"
                  className="fill-ink-500 font-mono text-[9px] tabular-nums"
                >
                  {t.testSub}
                </text>
                <text
                  x={cx}
                  y={PLOT.yBase - 44}
                  textAnchor="middle"
                  className="fill-ink-600 font-mono text-[8px] italic"
                >
                  {t.dormant}
                </text>
                <text
                  x={cx}
                  y={PLOT.yBase + 18}
                  textAnchor="middle"
                  className="fill-ink-400 font-mono text-[9px] tabular-nums"
                >
                  {c.date}
                </text>
              </g>
            )
          }

          const v = c.value ?? 0
          const y = scale(v)
          const h = PLOT.yBase - y
          const highlight = v === BULK_MAX
          return (
            <g key={c.date}>
              <rect
                x={cx - BAR_W / 2}
                y={y}
                width={BAR_W}
                height={h}
                rx="2"
                className={cn(highlight ? 'fill-ink-100' : 'fill-ink-300')}
              />
              <text
                x={cx}
                y={y - 22}
                textAnchor="middle"
                className="fill-ink-500 font-mono text-[8px] tabular-nums"
              >
                {t.tx(c.transfers ?? 0)}
              </text>
              <text
                x={cx}
                y={y - 8}
                textAnchor="middle"
                className="fill-ink-100 font-mono text-[11px] font-semibold tabular-nums"
              >
                {fmtM(v)}
              </text>
              <text
                x={cx}
                y={PLOT.yBase + 18}
                textAnchor="middle"
                className="fill-ink-400 font-mono text-[9px] tabular-nums"
              >
                {c.date}
              </text>
            </g>
          )
        })}
      </g>

      {/* baseline */}
      <line
        x1={PLOT.x0}
        y1={PLOT.yBase}
        x2={PLOT.x1}
        y2={PLOT.yBase}
        className="stroke-ink-600"
        strokeWidth="1"
      />

      <text
        x={PLOT.x1}
        y={PLOT.yBase + 36}
        textAnchor="end"
        className="fill-ink-600 font-mono text-[8px] uppercase tracking-[0.2em]"
      >
        {t.source}
      </text>
    </svg>
  )
}
