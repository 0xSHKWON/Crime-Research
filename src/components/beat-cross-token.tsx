import { cn } from '@/lib/utils'
import { useLang } from '@/lib/use-lang'

interface TokenNode {
  symbol: string
  cx: number
  cy: number
  subKo: string
  subEn: string
  highlight?: boolean
}

// Hexagonal layout around the hub at (270, 272), radius 186.
const nodes: TokenNode[] = [
  {
    symbol: 'BEAT',
    cx: 270,
    cy: 86,
    subKo: '≈10M · 런칭 수령',
    subEn: '≈10M · at launch',
    highlight: true,
  },
  { symbol: 'SIREN', cx: 431, cy: 179, subKo: '60.95M · 13.97%', subEn: '60.95M · 13.97%' },
  { symbol: 'M (MemeCore)', cx: 431, cy: 365, subKo: '17.16M · 7.47%', subEn: '17.16M · 7.47%' },
  { symbol: 'ARIA', cx: 270, cy: 458, subKo: '22.97M · 2.30%', subEn: '22.97M · 2.30%' },
  { symbol: 'COAI', cx: 109, cy: 365, subKo: '9.68M · 0.97%', subEn: '9.68M · 0.97%' },
  { symbol: 'LAB', cx: 109, cy: 179, subKo: '2.47M · 0.25%', subEn: '2.47M · 0.25%' },
]

const text = {
  ko: {
    ariaLabel:
      'BEAT (Audiera) 케이스 — 크로스토큰 누적 지갑 0x73d8…46db 를 중심으로 한 허브-스포크 다이어그램. 이 한 지갑이 SIREN(13.97%)·MemeCore M(7.47%)·ARIA(2.30%)·COAI(0.97%)·LAB(0.25%) 다섯 개 의혹 토큰을 거대 보유하고 있으며, BEAT 의 2025-11-01 런칭 분배에서도 약 10M 을 수령(자체 Dune 측정). BEAT 은 같은 지갑에 연결된 여섯 번째 토큰.',
    hubAddr: '0x73d8…46db',
    hubSub: '크로스토큰 누적 지갑 · 의혹 토큰 6종',
    tag: '자체 측정',
    caption: 'BEAT = 동일 지갑에 연결된 6번째 토큰',
  },
  en: {
    ariaLabel:
      'BEAT (Audiera) case — hub-and-spoke diagram centred on the cross-token accumulation wallet 0x73d8…46db. This single wallet holds large positions in five flagged tokens — SIREN (13.97%), MemeCore M (7.47%), ARIA (2.30%), COAI (0.97%), LAB (0.25%) — and also received ~10M in BEAT at its 2025-11-01 launch distribution (own Dune measurement). BEAT is the sixth token tied to the same wallet.',
    hubAddr: '0x73d8…46db',
    hubSub: 'cross-token accumulation wallet · 6 flagged tokens',
    tag: 'measured',
    caption: 'BEAT = 6th token tied to the same wallet',
  },
} as const

export function BeatCrossToken() {
  const [lang] = useLang()
  const t = text[lang]

  const hub = { x: 270, y: 272 }

  return (
    <svg
      viewBox="0 0 540 540"
      className="h-full w-full"
      role="img"
      aria-label={t.ariaLabel}
    >
      {/* spokes (drawn first, behind nodes) */}
      <g fill="none" strokeLinecap="round">
        {nodes.map((nd) => (
          <line
            key={nd.symbol}
            x1={hub.x}
            y1={hub.y}
            x2={nd.cx}
            y2={nd.cy}
            className={nd.highlight ? 'stroke-ink-400' : 'stroke-ink-600'}
            strokeWidth={nd.highlight ? 1.6 : 1}
            strokeDasharray={nd.highlight ? undefined : '4 4'}
          />
        ))}
      </g>

      {/* token nodes */}
      {nodes.map((nd) => (
        <TokenBox key={nd.symbol} node={nd} sub={lang === 'ko' ? nd.subKo : nd.subEn} tag={t.tag} />
      ))}

      {/* hub */}
      <g transform={`translate(${hub.x - 90}, ${hub.y - 36})`}>
        <rect
          width={180}
          height={72}
          rx="5"
          className="fill-ink-100 stroke-ink-300"
          strokeWidth="1.5"
        />
        <text
          x={90}
          y={30}
          textAnchor="middle"
          className="fill-ink-900 font-mono text-[15px] font-semibold"
        >
          {t.hubAddr}
        </text>
        <text
          x={90}
          y={50}
          textAnchor="middle"
          className="fill-ink-700 font-mono text-[8.5px]"
        >
          {t.hubSub}
        </text>
      </g>

      {/* bottom caption */}
      <text
        x={270}
        y={524}
        textAnchor="middle"
        className="fill-ink-400 font-mono text-[9px] uppercase tracking-[0.18em]"
      >
        {t.caption}
      </text>
    </svg>
  )
}

function TokenBox({ node, sub, tag }: { node: TokenNode; sub: string; tag: string }) {
  const w = 124
  const h = 58
  const x = node.cx - w / 2
  const y = node.cy - h / 2

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={w}
        height={h}
        rx="4"
        className={cn(
          node.highlight
            ? 'fill-ink-200 stroke-ink-400'
            : 'fill-ink-800/60 stroke-ink-600',
        )}
        strokeWidth="1"
      />
      <text
        x={w / 2}
        y={24}
        textAnchor="middle"
        className={cn(
          'font-mono text-[12px] font-semibold',
          node.highlight ? 'fill-ink-900' : 'fill-ink-100',
        )}
      >
        {node.symbol}
      </text>
      <text
        x={w / 2}
        y={42}
        textAnchor="middle"
        className={cn(
          'font-mono text-[9px]',
          node.highlight ? 'fill-ink-700' : 'fill-ink-400',
        )}
      >
        {sub}
      </text>
      {node.highlight && (
        <text
          x={w / 2}
          y={53}
          textAnchor="middle"
          className="fill-ink-600 font-mono text-[7px] uppercase tracking-[0.2em]"
        >
          {tag}
        </text>
      )}
    </g>
  )
}
