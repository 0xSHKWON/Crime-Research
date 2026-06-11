import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'ESPORTS (Yooldo) 케이스 — 05-20 사전 분산(19.9M, Kraken·Gate.io 지목) → 05-25 덤프 소스 클러스터 → 단기 중계 지갑 → PancakeSwap V3 풀 매도 집결까지 4단계 자금 흐름 다이어그램 (자체 Dune 인덱싱)',
    arrow1: '5일 후 — 05-25 덤프',
    arrow2: '소스 → 다수 신규 지갑',
    arrow3: '각 수백 swap · 매도',
    stage1Title: '사전 분산 (D-5 · 05-20)',
    stage1Sub: '0x7ef9…10dd → 19.9M → 0xb7f6…1d61 + Gate.io 1',
    stage2Title: '덤프 소스 클러스터 (05-25)',
    stage2Sub: '0x8089…d33b 등 · 12~14h UTC 집중',
    stage3Title: '단기 중계 지갑',
    stage3Sub: '소스 → 신규 지갑 다수 · 분할 송금',
    stage4Title: 'PancakeSwap V3 풀 0x5bb5…4462',
    stage4Sub: '매도 집결 · 가격 -92%',
    sideLabel: '크로스토큰 0x73d8…46db · Gate.io 재등장',
    confidence: {
      documented: '자체 측정',
      mixed: '일부 자체 측정',
      alleged: '추정 / 분석',
    } as Record<Confidence, string>,
  },
  en: {
    ariaLabel:
      'ESPORTS (Yooldo) case — four-stage fund flow diagram: pre-positioning on 05-20 (19.9M to a Kraken/Gate-attributed address) → 05-25 dump source cluster → short-lived relay wallets → sells aggregated into the PancakeSwap V3 pool (in-house Dune indexing)',
    arrow1: '5 days later — 05-25 dump',
    arrow2: 'source → many fresh wallets',
    arrow3: 'hundreds of swaps each · sells',
    stage1Title: 'Pre-positioning (D-5 · 05-20)',
    stage1Sub: '0x7ef9…10dd → 19.9M → 0xb7f6…1d61 + Gate.io 1',
    stage2Title: 'Dump source cluster (05-25)',
    stage2Sub: '0x8089…d33b et al. · concentrated 12-14h UTC',
    stage3Title: 'Short-lived relay wallets',
    stage3Sub: 'source → many fresh wallets · split transfers',
    stage4Title: 'PancakeSwap V3 pool 0x5bb5…4462',
    stage4Sub: 'sells aggregated · price -92%',
    sideLabel: 'cross-token 0x73d8…46db · Gate.io reappear',
    confidence: {
      documented: 'own measurement',
      mixed: 'partially measured',
      alleged: 'estimate / analysis',
    } as Record<Confidence, string>,
  },
} as const

export function EsportsFlow() {
  const [lang] = useLang()
  const t = text[lang]

  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      <defs>
        <marker
          id="ef-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="ef-arrow-dim"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-700" />
        </marker>
      </defs>

      {/* stage→stage arrows */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="220"
          y1="128"
          x2="220"
          y2="158"
          className="stroke-ink-500"
          markerEnd="url(#ef-arrow)"
        />
        <line
          x1="220"
          y1="246"
          x2="220"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#ef-arrow)"
        />
        <line
          x1="220"
          y1="364"
          x2="220"
          y2="394"
          className="stroke-ink-500"
          markerEnd="url(#ef-arrow)"
        />
      </g>

      {/* arrow labels */}
      <text
        x="232"
        y="148"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        {t.arrow1}
      </text>
      <text
        x="232"
        y="266"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        {t.arrow2}
      </text>
      <text
        x="232"
        y="384"
        className="fill-ink-200 font-mono text-[10px] font-semibold"
      >
        {t.arrow3}
      </text>

      <FlowStage
        x={20}
        y={50}
        no="01"
        title={t.stage1Title}
        sub={t.stage1Sub}
        confidence="mixed"
        confidenceLabel={t.confidence.mixed}
      />
      <FlowStage
        x={20}
        y={168}
        no="02"
        title={t.stage2Title}
        sub={t.stage2Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
      />
      <FlowStage
        x={20}
        y={286}
        no="03"
        title={t.stage3Title}
        sub={t.stage3Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
      />
      <FlowStage
        x={20}
        y={404}
        no="04"
        title={t.stage4Title}
        sub={t.stage4Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
        highlight
      />

      {/* side note: cross-token / Gate.io infrastructure reuse */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        <path
          d="M 420 207 C 500 207, 500 443, 420 443"
          className="stroke-ink-700"
          strokeDasharray="2 3"
          markerEnd="url(#ef-arrow-dim)"
        />
      </g>
      <text
        x="500"
        y="325"
        textAnchor="middle"
        transform="rotate(-90 500 325)"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        {t.sideLabel}
      </text>
    </svg>
  )
}

interface FlowStageProps {
  x: number
  y: number
  no: string
  title: string
  sub: string
  confidence: Confidence
  confidenceLabel: string
  highlight?: boolean
}

function FlowStage({
  x,
  y,
  no,
  title,
  sub,
  confidence,
  confidenceLabel,
  highlight,
}: FlowStageProps) {
  const width = 400
  const height = 78

  const confColor = highlight
    ? 'fill-ink-700'
    : confidence === 'documented'
      ? 'fill-ink-200'
      : confidence === 'mixed'
        ? 'fill-ink-400'
        : 'fill-ink-600'

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={width}
        height={height}
        rx="4"
        className={cn(
          highlight
            ? 'fill-ink-100 stroke-ink-300'
            : 'fill-ink-800/60 stroke-ink-600',
        )}
        strokeWidth="1"
      />
      <text
        x="22"
        y="48"
        className={cn(
          'font-mono text-[20px] font-semibold tabular-nums',
          highlight ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="64"
        y="32"
        className={cn(
          'font-mono text-[13px] font-semibold',
          highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="64"
        y="50"
        className={cn(
          'font-mono text-[10px]',
          highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      <text
        x={width - 14}
        y="64"
        textAnchor="end"
        className={cn(
          'font-mono text-[8px] uppercase tracking-[0.2em]',
          confColor,
        )}
      >
        {confidenceLabel}
      </text>
    </g>
  )
}
