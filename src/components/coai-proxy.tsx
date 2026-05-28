import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

const NODE_X = 35
const NODE_W = 470
const CENTER_X = NODE_X + NODE_W / 2

const text = {
  ko: {
    ariaLabel:
      'COAI (ChainOpera AI) 케이스 — EIP-1967 Transparent Proxy 구조 다이어그램. 사용자 → Proxy(storage) → Implementation(logic) 호출 흐름과, admin 권한 미포기 상태에서 Implementation 을 교체할 수 있는 제어 경로를 표시',
    callArrow1: 'transfer() 호출',
    callArrow2: 'delegatecall (logic 위임)',
    node1Title: '사용자 / 트레이더',
    node1Sub: '지갑에서 transfer · approve 호출',
    node2Title: 'Proxy Contract — storage',
    node2Sub: '0x0A8D...6EA5 · 주소 고정 (변경 불가)',
    node3Title: 'Implementation — logic',
    node3Sub: '0xa9d0...a877 · admin 이 교체 가능',
    adminArrow: 'upgradeTo() — 사전 공지 없이',
    adminNodeTitle: 'Admin 권한 — renounce 안 됨 (미포기)',
    adminNodeSub: 'ZachXBT 폭로 시점 기준 zero address 이전 미적용',
    capLabel: 'admin 이 사전 공지 없이 가능한 것',
    cap1: 'Implementation 교체 — 토큰 동작 로직 전체 변경',
    cap2: 'transfer 비활성화 — 전체 잔고 freeze',
    cap3: 'mint 추가 — 무한 발행으로 가치 희석',
    cap4: 'blacklist · tax 추가 — 특정 지갑 차단 / 수수료',
  },
  en: {
    ariaLabel:
      'COAI (ChainOpera AI) case — EIP-1967 Transparent Proxy architecture diagram. User → Proxy (storage) → Implementation (logic) call path, plus the control path that lets admin swap the Implementation while ownership has not been renounced',
    callArrow1: 'transfer() call',
    callArrow2: 'delegatecall (delegate to logic)',
    node1Title: 'User / Trader',
    node1Sub: 'calls transfer · approve from wallet',
    node2Title: 'Proxy Contract — storage',
    node2Sub: '0x0A8D...6EA5 · address fixed (cannot change)',
    node3Title: 'Implementation — logic',
    node3Sub: '0xa9d0...a877 · admin can swap',
    adminArrow: 'upgradeTo() — without prior notice',
    adminNodeTitle: 'Admin authority — not renounced',
    adminNodeSub: 'No OwnershipTransferred to zero address as of ZachXBT disclosure',
    capLabel: 'what admin can do without prior notice',
    cap1: 'Swap Implementation — change all token behavior',
    cap2: 'Disable transfer — freeze all balances',
    cap3: 'Add mint — infinite issuance dilution',
    cap4: 'Add blacklist · tax — block specific wallets / charge fees',
  },
} as const

export function CoaiProxy() {
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
          id="cp-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-500" />
        </marker>
        <marker
          id="cp-arrow-warn"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-ink-300" />
        </marker>
      </defs>

      {/* call-path arrows: 01 → 02 → 03 */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.5">
        <line
          x1={CENTER_X}
          y1="76"
          x2={CENTER_X}
          y2="104"
          className="stroke-ink-500"
          markerEnd="url(#cp-arrow)"
        />
        <line
          x1={CENTER_X}
          y1="172"
          x2={CENTER_X}
          y2="200"
          className="stroke-ink-500"
          markerEnd="url(#cp-arrow)"
        />
      </g>
      <text
        x={CENTER_X + 14}
        y="95"
        className="fill-ink-400 font-mono text-[10px] font-semibold"
      >
        {t.callArrow1}
      </text>
      <text
        x={CENTER_X + 14}
        y="191"
        className="fill-ink-400 font-mono text-[10px] font-semibold"
      >
        {t.callArrow2}
      </text>

      <Node y={14} no="01" title={t.node1Title} sub={t.node1Sub} tone="neutral" />
      <Node y={110} no="02" title={t.node2Title} sub={t.node2Sub} tone="neutral" />
      <Node y={206} no="03" title={t.node3Title} sub={t.node3Sub} tone="warn" />

      {/* admin control arrow: Admin (below) → up into Implementation */}
      <g fill="none" strokeLinecap="round" strokeWidth="1.4">
        <line
          x1={CENTER_X}
          y1="300"
          x2={CENTER_X}
          y2="270"
          className="stroke-ink-300"
          strokeDasharray="3 3"
          markerEnd="url(#cp-arrow-warn)"
        />
      </g>
      <text
        x={CENTER_X + 14}
        y="290"
        className="fill-ink-300 font-mono text-[10px] font-semibold"
      >
        {t.adminArrow}
      </text>

      <Node
        y={304}
        no="!"
        title={t.adminNodeTitle}
        sub={t.adminNodeSub}
        tone="alert"
      />

      {/* admin capability list */}
      <text
        x={NODE_X}
        y="404"
        className="fill-ink-500 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        {t.capLabel}
      </text>
      <CapRow y={426} text={t.cap1} />
      <CapRow y={450} text={t.cap2} />
      <CapRow y={474} text={t.cap3} />
      <CapRow y={498} text={t.cap4} />
    </svg>
  )
}

type Tone = 'neutral' | 'warn' | 'alert'

interface NodeProps {
  y: number
  no: string
  title: string
  sub: string
  tone: Tone
}

function Node({ y, no, title, sub, tone }: NodeProps) {
  const height = 62
  return (
    <g transform={`translate(${NODE_X}, ${y})`}>
      <rect
        width={NODE_W}
        height={height}
        rx="4"
        className={cn(
          tone === 'alert'
            ? 'fill-ink-100 stroke-ink-300'
            : tone === 'warn'
              ? 'fill-ink-800/80 stroke-ink-400'
              : 'fill-ink-800/60 stroke-ink-600',
        )}
        strokeWidth="1"
      />
      <text
        x="20"
        y="40"
        className={cn(
          'font-mono text-[18px] font-semibold tabular-nums',
          tone === 'alert' ? 'fill-ink-700' : 'fill-ink-500',
        )}
      >
        {no}
      </text>
      <text
        x="58"
        y="26"
        className={cn(
          'font-mono text-[12px] font-semibold',
          tone === 'alert' ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {title}
      </text>
      <text
        x="58"
        y="44"
        className={cn(
          'font-mono text-[10px]',
          tone === 'alert' ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
    </g>
  )
}

function CapRow({ y, text }: { y: number; text: string }) {
  return (
    <g>
      <rect x={NODE_X} y={y - 9} width="6" height="6" className="fill-ink-500" />
      <text
        x={NODE_X + 16}
        y={y - 3}
        className="fill-ink-300 font-mono text-[10px]"
      >
        {text}
      </text>
    </g>
  )
}
