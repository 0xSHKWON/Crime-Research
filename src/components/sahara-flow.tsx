import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'SAHARA (Sahara AI) 케이스 — 2026-06-09 급락 당시 문제의 대형 전송이 어디로 갔는지 자체 Dune 인덱싱으로 추적한 4단계 다이어그램. (1) Sahara 운영 릴레이 컨트랙트 → (2) 6/2 생성된 0x194e 브릿지 풀(일일 lock/release 순환, 6/9 드레인 후 재충전) → (3) 수십 개 non-CEX 사용자 지갑으로 release(Upbit·단일 거래소 아님) → (4) 실제 매도 압력은 다수 지갑의 Binance 분산 입금 + 롱 청산. "500M Upbit 덤프" 의혹은 Ethereum·BNB 양 체인 어디에서도 재현되지 않음.',
    arrow1a: '~900M SAHARA · 150M·300M 청크 · hop 간 ~2분',
    arrow1b: '6/7~6/10, 둘 다 컨트랙트 (자체 측정)',
    arrow2a: '6/8~9 순 드레인 → 6/9~10 300M씩 재충전',
    arrow2b: '팀 "CCIP 풀 드레인 후 재충전" 진술과 부합',
    arrow3a: 'Ethereum·BNB 양 체인 모두 Upbit 흐름 0건',
    arrow3b: '"500M Upbit 덤프" 의혹 미재현',
    stage1Title: 'Sahara 운영 릴레이',
    stage1Sub: '0xb9d9…9c66 → 0xd3b8…0f22 · 둘 다 컨트랙트(~TGE/6-2)',
    stage2Title: '0x194e 브릿지 풀',
    stage2Sub: '6/2 생성 · 일일 lock/release · 6/9 300M in / 302M out',
    stage3Title: '수십 개 사용자 지갑으로 release',
    stage3Sub: '각 14~52M · 전부 non-CEX EOA · 단일 거래소 아님',
    stage4Title: '실제 매도압 ≠ 단일 덤프',
    stage4Sub: 'Binance 분산 입금(147·38·40건…) + $22.65M 롱 청산',
    confidence: {
      documented: '자체 측정',
      mixed: '측정 + 해석',
      alleged: '추정 / 분석',
    } as Record<Confidence, string>,
  },
  en: {
    ariaLabel:
      'SAHARA (Sahara AI) case — four-stage diagram tracing where the large transfers flagged during the June 9 2026 crash actually went, via own Dune indexing. (1) Sahara-operated relay contracts → (2) the 0x194e bridge pool created June 2 (daily lock/release cycling, drained June 9 then replenished) → (3) released to dozens of non-CEX user wallets (not Upbit, not a single exchange) → (4) the real sell pressure was distributed deposits into Binance plus long liquidations. The "500M to Upbit dump" allegation is not reproduced on Ethereum or BNB Chain.',
    arrow1a: '~900M SAHARA · 150M/300M chunks · ~2 min per hop',
    arrow1b: 'Jun 7-10, both are contracts (own measurement)',
    arrow2a: 'net drain Jun 8-9 → replenished 300M/day Jun 9-10',
    arrow2b: 'matches team’s "CCIP pool drained then refilled"',
    arrow3a: 'zero Upbit flow on Ethereum AND BNB Chain',
    arrow3b: '"500M to Upbit dump" not reproduced',
    stage1Title: 'Sahara-operated relay',
    stage1Sub: '0xb9d9…9c66 → 0xd3b8…0f22 · both contracts (~TGE/Jun-2)',
    stage2Title: '0x194e bridge pool',
    stage2Sub: 'created Jun 2 · daily lock/release · Jun 9 300M in / 302M out',
    stage3Title: 'released to dozens of user wallets',
    stage3Sub: '14-52M each · all non-CEX EOAs · not one exchange',
    stage4Title: 'real sell pressure ≠ single dump',
    stage4Sub: 'distributed Binance deposits (147·38·40 txns…) + $22.65M longs',
    confidence: {
      documented: 'own measurement',
      mixed: 'measured + read',
      alleged: 'estimate / analysis',
    } as Record<Confidence, string>,
  },
} as const

export function SaharaFlow() {
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
          id="sf-arrow"
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
          markerEnd="url(#sf-arrow)"
        />
        <line
          x1="270"
          y1="246"
          x2="270"
          y2="276"
          className="stroke-ink-500"
          markerEnd="url(#sf-arrow)"
        />
        <line
          x1="270"
          y1="374"
          x2="270"
          y2="404"
          className="stroke-ink-500"
          markerEnd="url(#sf-arrow)"
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
        confidence="documented"
        confidenceLabel={t.confidence.documented}
      />
      <FlowStage
        x={20}
        y={414}
        no="04"
        title={t.stage4Title}
        sub={t.stage4Sub}
        confidence="mixed"
        confidenceLabel={t.confidence.mixed}
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
