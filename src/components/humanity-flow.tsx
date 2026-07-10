import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

type Confidence = 'documented' | 'mixed' | 'alleged'

const text = {
  ko: {
    ariaLabel:
      'Humanity Protocol(H) 크로스체인 드레인 다이어그램 — 침해된 키로 (A) ETH 브릿지 컨트랙트를 악성 업그레이드해 141.18M H를 빼내 공격자 consolidation 지갑으로 집결, (B) ETH 핫월렛에서 6.045M H를 같은 지갑으로 절도, (C) BSC proxy admin 을 탈취해 신규 지갑으로 100B 규모를 무단 민팅해 DEX 매도. 자체 Dune 인덱싱으로 A·B 는 트랜잭션 단위 확인, C 는 민팅 확인.',
    ethLabel: 'ETHEREUM',
    bscLabel: 'BNB CHAIN',
    stageA1: 'A · 브릿지 악성 업그레이드',
    stageA2: '141,182,632 H · tx 0xa665…29e5b',
    stageB1: 'B · 핫월렛 절도',
    stageB2: '6,045,060 H · tx 0x94a4…ee015',
    sinkTitle: '공격자 집결 지갑 0x9e99…0504',
    sinkSub: 'ETH 조각 합계 ≈ 140.9M H',
    stageC1: 'C · proxy admin 탈취 → 무단 민팅',
    stageC2: '신규 지갑 0x6aa2 · 6/9 계단식 100B+ 규모',
    stageC3: 'PancakeSwap 등 DEX 매도',
    note: '민팅 규모 ≫ 정품 유통량 · 사전 자금(4~5월)은 외부 분석 인용',
    measured: '자체 측정',
    minted: '민팅 자체 확인',
  },
  en: {
    ariaLabel:
      'Humanity Protocol (H) cross-chain drain diagram — with compromised keys: (A) a malicious upgrade to the ETH bridge contract siphons 141.18M H to an attacker consolidation wallet, (B) 6.045M H is stolen from the ETH hot wallet to the same wallet, (C) the BSC proxy admin is seized to mint ~100B unauthorized H to a fresh wallet and sell on DEX. A and B are confirmed at transaction level via own Dune indexing; C is confirmed at the mint level.',
    ethLabel: 'ETHEREUM',
    bscLabel: 'BNB CHAIN',
    stageA1: 'A · malicious bridge upgrade',
    stageA2: '141,182,632 H · tx 0xa665…29e5b',
    stageB1: 'B · hot-wallet theft',
    stageB2: '6,045,060 H · tx 0x94a4…ee015',
    sinkTitle: 'Attacker consolidation 0x9e99…0504',
    sinkSub: 'ETH fragments ≈ 140.9M H',
    stageC1: 'C · proxy-admin seizure → unauthorized mint',
    stageC2: 'fresh wallet 0x6aa2 · 06-09 stepwise 100B+',
    stageC3: 'sold on PancakeSwap et al.',
    note: 'minted amount ≫ genuine float · pre-funding (Apr–May) per external analysis',
    measured: 'own measurement',
    minted: 'mint confirmed',
  },
} as const

export function HumanityFlow() {
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
          id="hf-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="hf-arrow-dim"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-700" />
        </marker>
      </defs>

      {/* chain lane labels */}
      <text
        x="20"
        y="30"
        className="fill-ink-500 font-mono text-[10px] uppercase tracking-[0.3em]"
      >
        {t.ethLabel}
      </text>
      <line
        x1="20"
        x2="520"
        y1="300"
        y2="300"
        className="stroke-ink-700"
        strokeWidth={0.5}
        strokeDasharray="2 4"
      />
      <text
        x="20"
        y="322"
        className="fill-ink-500 font-mono text-[10px] uppercase tracking-[0.3em]"
      >
        {t.bscLabel}
      </text>

      {/* A: bridge drain */}
      <FlowBox
        x={20}
        y={42}
        w={230}
        no="A"
        title={t.stageA1}
        sub={t.stageA2}
        tag={t.measured}
        confidence="documented"
      />
      {/* B: hot wallet theft */}
      <FlowBox
        x={290}
        y={42}
        w={230}
        no="B"
        title={t.stageB1}
        sub={t.stageB2}
        tag={t.measured}
        confidence="documented"
      />

      {/* arrows A,B -> sink */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="135"
          y1="112"
          x2="230"
          y2="176"
          className="stroke-ink-500"
          markerEnd="url(#hf-arrow)"
        />
        <line
          x1="405"
          y1="112"
          x2="310"
          y2="176"
          className="stroke-ink-500"
          markerEnd="url(#hf-arrow)"
        />
      </g>

      {/* sink: consolidation wallet */}
      <FlowBox
        x={120}
        y={178}
        w={300}
        no="→"
        title={t.sinkTitle}
        sub={t.sinkSub}
        tag={t.measured}
        confidence="documented"
        highlight
      />

      {/* C: BSC mint (below the divider) */}
      <FlowBox
        x={20}
        y={340}
        w={340}
        no="C"
        title={t.stageC1}
        sub={t.stageC2}
        tag={t.minted}
        confidence="mixed"
      />

      {/* arrow C -> DEX */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1="360"
          y1="378"
          x2="410"
          y2="378"
          className="stroke-ink-500"
          markerEnd="url(#hf-arrow)"
        />
      </g>
      <rect
        x={410}
        y={356}
        width={110}
        height={44}
        rx="4"
        className="fill-ink-800/60 stroke-ink-600"
        strokeWidth="1"
      />
      <text
        x={465}
        y={382}
        textAnchor="middle"
        className="fill-ink-200 font-mono text-[10px]"
      >
        DEX
      </text>
      <text
        x={465}
        y={394}
        textAnchor="middle"
        className="fill-ink-500 font-mono text-[8px]"
      >
        PancakeSwap
      </text>

      {/* footer note */}
      <text
        x="20"
        y="470"
        className="fill-ink-400 font-mono text-[9px]"
      >
        {t.note}
      </text>
    </svg>
  )
}

interface FlowBoxProps {
  x: number
  y: number
  w: number
  no: string
  title: string
  sub: string
  tag: string
  confidence: Confidence
  highlight?: boolean
}

function FlowBox({ x, y, w, no, title, sub, tag, highlight }: FlowBoxProps) {
  const height = 68
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={w}
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
        x="18"
        y="42"
        className={cn(
          'font-mono text-[18px] font-semibold',
          highlight ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="48"
        y="28"
        className={cn(
          'font-mono text-[12px] font-semibold',
          highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="48"
        y="46"
        className={cn(
          'font-mono text-[9.5px]',
          highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      <text
        x={w - 12}
        y="60"
        textAnchor="end"
        className={cn(
          'font-mono text-[8px] uppercase tracking-[0.15em]',
          highlight ? 'fill-ink-700' : 'fill-ink-300',
        )}
      >
        {tag}
      </text>
    </g>
  )
}
