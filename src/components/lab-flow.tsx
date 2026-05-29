import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'LAB (LABtrade) 케이스 — Bitget 핫월렛(Bitget 6, RAVE 케이스 출금 주소와 동일) → 신규 9개 지갑 클러스터(91.4M LAB, 5/8~12) → 유통 float의 약 32% 동원 → 보유 집중도 상위 6 지갑 84.3% 까지 4단계 자금 흐름 다이어그램 (ZachXBT 주장 자체 Dune 인덱싱 재현)',
    arrow1a: '18건 송금 · 2026-05-08 12:33 ~ 05-12 00:57 UTC',
    arrow1b: '마지막 배치는 5/12 새벽',
    arrow2a: '신규 지갑당 ~9~11M LAB 균등 분배',
    arrow2b: 'ZachXBT 지목 "신규 10지갑"과 부합',
    arrow3a: '~$480M 표면가치 (피크 ~$5 기준)',
    arrow3b: 'CMC 유통량 309.95M의 약 29~32%',
    stage1Title: 'Bitget 6 핫월렛',
    stage1Sub: '0x1ab497…688f8f23 — RAVE 덤프 자금 출처와 동일 주소',
    stage2Title: '신규 9개 지갑 클러스터',
    stage2Sub: '91.4M LAB · 18건 · 5/8~12 · 자체 측정 재현',
    stage3Title: '유통 float의 약 32% 동원',
    stage3Sub: '인출 직후 가격 피크 $5대 → 수시간 내 -65%',
    stage4Title: '보유 집중도 — 상위 6 지갑 84.3%',
    stage4Sub: '상위 20 지갑 ≈ 97.8% (총공급 1B 기준, 자체 측정)',
    confidence: {
      documented: '자체 측정',
      mixed: '일부 자체 측정',
      alleged: '추정 / 분석',
    } as Record<Confidence, string>,
  },
  en: {
    ariaLabel:
      'LAB (LABtrade) case — four-stage fund flow diagram: Bitget hot wallet (Bitget 6, the same address that funded the RAVE dump) → cluster of 9 fresh wallets (91.4M LAB, May 8-12) → ~32% of circulating float mobilized → holder concentration top 6 wallets 84.3% (ZachXBT allegations reproduced via own Dune indexing)',
    arrow1a: '18 transfers · 2026-05-08 12:33 ~ 05-12 00:57 UTC',
    arrow1b: 'final batch landed May 12',
    arrow2a: '~9-11M LAB evenly split per fresh wallet',
    arrow2b: 'matches ZachXBT "10 fresh wallets"',
    arrow3a: '~$480M notional (at ~$5 peak)',
    arrow3b: '≈29-32% of CMC circulating 309.95M',
    stage1Title: 'Bitget 6 hot wallet',
    stage1Sub: '0x1ab497…688f8f23 — same address that funded the RAVE dump',
    stage2Title: 'Cluster of 9 fresh wallets',
    stage2Sub: '91.4M LAB · 18 transfers · May 8-12 · reproduced in-house',
    stage3Title: '~32% of circulating float mobilized',
    stage3Sub: 'price peaked ~$5 right after, then -65% within hours',
    stage4Title: 'Concentration — top 6 wallets 84.3%',
    stage4Sub: 'top 20 wallets ≈ 97.8% (of 1B total supply, own measurement)',
    confidence: {
      documented: 'own measurement',
      mixed: 'partial measurement',
      alleged: 'estimate / analysis',
    } as Record<Confidence, string>,
  },
} as const

export function LabFlow() {
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
          id="lf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
      </defs>

      {/* stage→stage arrows */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="270"
          y1="118"
          x2="270"
          y2="148"
          className="stroke-ink-500"
          markerEnd="url(#lf-arrow)"
        />
        <line
          x1="270"
          y1="246"
          x2="270"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#lf-arrow)"
        />
        <line
          x1="270"
          y1="374"
          x2="270"
          y2="404"
          className="stroke-ink-500"
          markerEnd="url(#lf-arrow)"
        />
      </g>

      {/* arrow labels */}
      <g>
        <text
          x="282"
          y="132"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          {t.arrow1a}
        </text>
        <text x="282" y="146" className="fill-ink-300 font-mono text-[8px]">
          {t.arrow1b}
        </text>

        <text
          x="282"
          y="260"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          {t.arrow2a}
        </text>
        <text x="282" y="274" className="fill-ink-300 font-mono text-[8px]">
          {t.arrow2b}
        </text>

        <text
          x="282"
          y="388"
          className="fill-ink-200 font-mono text-[8px] font-semibold"
        >
          {t.arrow3a}
        </text>
        <text x="282" y="402" className="fill-ink-300 font-mono text-[8px]">
          {t.arrow3b}
        </text>
      </g>

      <FlowStage
        x={20}
        y={30}
        no="01"
        title={t.stage1Title}
        sub={t.stage1Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
      />
      <FlowStage
        x={20}
        y={158}
        no="02"
        title={t.stage2Title}
        sub={t.stage2Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
        highlight
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
        y={414}
        no="04"
        title={t.stage4Title}
        sub={t.stage4Sub}
        confidence="documented"
        confidenceLabel={t.confidence.documented}
      />
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
  const width = 500
  const height = 88

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
        y="58"
        className={cn(
          'font-mono text-[20px] font-semibold tabular-nums',
          highlight ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="64"
        y="38"
        className={cn(
          'font-mono text-[13px] font-semibold',
          highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="64"
        y="60"
        className={cn(
          'font-mono text-[10px]',
          highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      <text
        x={width - 14}
        y="84"
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
