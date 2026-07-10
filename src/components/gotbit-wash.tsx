import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'NexFundAI(NEXF) DOJ 함정수사 — FBI가 2024-05-29 이더리움에 함정 토큰을 배포하고, 마켓메이커들이 volume 서비스를 수주해 봇 지갑 15~19개로 Uniswap 풀을 왕복 회전(매수 누적 ≈ 매도 누적)시키고, 그 가짜 volume이 그대로 기소 증거가 된 4단계 흐름 다이어그램 (법원 문서 + 자체 Dune 인덱싱)',
    arrow1: 'MM에 "volume 지원" 의뢰 — 위장 신원',
    arrow2: '봇 가동 (08-22, 자체 측정)',
    arrow3: '4주간 회전 → 그대로 증거화',
    stage1Title: 'FBI 함정 토큰 배포 (05-29)',
    stage1Sub: 'NexFundAI(NexF) · Ethereum · Uniswap 단일 풀',
    stage2Title: 'MM "volume 서비스" 수주',
    stage2Sub: 'Gotbit · ZM Quant · CLS Global · MyTrade — 기소장 기준',
    stage3Title: '봇 지갑 회전 (08-22 ~ 09-18)',
    stage3Sub: '지갑 15~19개 · 매수 누적 ≈ 매도 누적 (오차 0.001% 미만)',
    stage4Title: '"volume"이 그대로 기소 증거로',
    stage4Sub: '4주 $607K 가짜 볼륨 → 10-09 18인/법인 기소',
    sideLabel: '같은 봇 인프라가 60+ 토큰에 · $25M 압수',
    confidence: {
      documented: '법원 문서',
      mixed: '자체 측정',
      alleged: '추정 / 분석',
    } as Record<Confidence, string>,
  },
  en: {
    ariaLabel:
      'NexFundAI (NEXF) DOJ sting — four-stage flow diagram: the FBI deploys a trap token on Ethereum on 2024-05-29, market makers take on a "volume support" engagement, a cluster of 15-19 bot wallets round-trips the Uniswap pool (cumulative buys ≈ cumulative sells), and that fake volume becomes the indictment evidence (court records + own Dune indexing)',
    arrow1: '"volume support" request to MMs — undercover',
    arrow2: 'bots activated (08-22, own measurement)',
    arrow3: 'four weeks of churn → straight into evidence',
    stage1Title: 'FBI deploys the trap token (05-29)',
    stage1Sub: 'NexFundAI (NexF) · Ethereum · single Uniswap pool',
    stage2Title: 'MMs take the "volume service" job',
    stage2Sub: 'Gotbit · ZM Quant · CLS Global · MyTrade — per indictments',
    stage3Title: 'Bot-wallet churn (08-22 to 09-18)',
    stage3Sub: '15-19 wallets · cumulative buys ≈ sells (<0.001% gap)',
    stage4Title: 'The "volume" becomes the evidence',
    stage4Sub: '$607K fake volume in 4 weeks → 10-09, 18 charged',
    sideLabel: 'same bot infra across 60+ tokens · $25M seized',
    confidence: {
      documented: 'court records',
      mixed: 'own measurement',
      alleged: 'estimate / analysis',
    } as Record<Confidence, string>,
  },
} as const

export function GotbitWash() {
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
          id="gw-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="gw-arrow-dim"
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
          markerEnd="url(#gw-arrow)"
        />
        <line
          x1="220"
          y1="246"
          x2="220"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#gw-arrow)"
        />
        <line
          x1="220"
          y1="364"
          x2="220"
          y2="394"
          className="stroke-ink-500"
          markerEnd="url(#gw-arrow)"
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
        confidence="documented"
        confidenceLabel={t.confidence.documented}
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

      {/* side note: same bot infrastructure across 60+ tokens */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.2">
        <path
          d="M 420 325 C 500 325, 500 443, 420 443"
          className="stroke-ink-700"
          strokeDasharray="2 3"
          markerEnd="url(#gw-arrow-dim)"
        />
      </g>
      <text
        x="500"
        y="384"
        textAnchor="middle"
        transform="rotate(-90 500 384)"
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
