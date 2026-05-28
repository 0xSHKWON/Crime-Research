import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'GPS/SHELL 케이스 — 프로젝트 → Web3Port → Whisper → Binance 매도 → 수익 분배까지 4단계 자금 흐름 다이어그램',
    arrow1: '공급의 1-3% (무상 토큰)',
    arrow2: '자회사 이관',
    arrow3: 'GPS 7,000만 · 21h · 매수 호가 미이행',
    stage1Title: 'GPS · SHELL Projects',
    stage1Sub: '토큰 발행 · Web3Port 인큐베이션 계약',
    stage2Title: 'Web3Port',
    stage2Sub: 'VC / 인큐베이터로 가장 · 무상 토큰 수령',
    stage3Title: 'Whisper · Market Maker',
    stage3Sub: '자회사 격 · 바이낸스 계정 권한 보유',
    stage4Title: 'Binance Spot 매도 → ~$5M (GPS)',
    stage4Sub: 'SHELL 수치 미공개 · 사용자 보상 절차 발표',
    sideLabel: '수익 분배 (비율 미공개)',
    confidence: {
      documented: 'Binance 공식',
      mixed: '일부 documented',
      alleged: '분석가 주장',
    } as Record<Confidence, string>,
  },
  en: {
    ariaLabel:
      'GPS/SHELL case — four-stage fund flow diagram: Projects → Web3Port → Whisper → Binance sell → profit redistribution',
    arrow1: '1-3% of supply (free tokens)',
    arrow2: 'transfer to affiliate',
    arrow3: '70M GPS · 21h · bids skipped',
    stage1Title: 'GPS · SHELL Projects',
    stage1Sub: 'Token issuance · Web3Port incubation contract',
    stage2Title: 'Web3Port',
    stage2Sub: 'Posing as VC / incubator · receives free tokens',
    stage3Title: 'Whisper · Market Maker',
    stage3Sub: 'Affiliate · holds Binance account permissions',
    stage4Title: 'Binance Spot sell → ~$5M (GPS)',
    stage4Sub: 'SHELL figures undisclosed · user compensation announced',
    sideLabel: 'profit split (ratio undisclosed)',
    confidence: {
      documented: 'Binance official',
      mixed: 'partially documented',
      alleged: 'analyst claim',
    } as Record<Confidence, string>,
  },
} as const

export function Web3PortFlow() {
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
          id="wpf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="wpf-arrow-dim"
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
          className="stroke-ink-700"
          strokeDasharray="3 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
        <line
          x1="220"
          y1="246"
          x2="220"
          y2="276"
          className="stroke-ink-700"
          strokeDasharray="3 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
        <line
          x1="220"
          y1="364"
          x2="220"
          y2="394"
          className="stroke-ink-500"
          markerEnd="url(#wpf-arrow)"
        />
      </g>

      {/* arrow labels */}
      <text x="232" y="148" className="fill-ink-500 font-mono text-[10px]">
        {t.arrow1}
      </text>
      <text x="232" y="266" className="fill-ink-500 font-mono text-[10px]">
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
        confidence="alleged"
        confidenceLabel={t.confidence.alleged}
      />
      <FlowStage
        x={20}
        y={168}
        no="02"
        title={t.stage2Title}
        sub={t.stage2Sub}
        confidence="alleged"
        confidenceLabel={t.confidence.alleged}
      />
      <FlowStage
        x={20}
        y={286}
        no="03"
        title={t.stage3Title}
        sub={t.stage3Sub}
        confidence="mixed"
        confidenceLabel={t.confidence.mixed}
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

      {/* profit-distribution side curve: stage 4 → stage 1 */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        <path
          d="M 420 443 C 500 443, 500 90, 420 90"
          className="stroke-ink-700"
          strokeDasharray="2 3"
          markerEnd="url(#wpf-arrow-dim)"
        />
      </g>
      <text
        x="500"
        y="270"
        textAnchor="middle"
        transform="rotate(-90 500 270)"
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
