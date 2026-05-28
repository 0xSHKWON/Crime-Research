// 중앙 i18n dict. 새 UI 카피 추가 시 ko 와 en 양쪽에 동일 키 등록.
// SVG 안 강결합 텍스트는 컴포넌트 로컬 사전(Web3PortFlow 등) 사용 — 이 파일은 페이지 UI 카피 전용.
// 변수 보간: '{name}' placeholder. useT 가 치환.

export const messages = {
  ko: {
    // case-hero — frontmatter status
    'case.status.documented': '거래소 공식 확인',
    'case.status.alleged': '의혹 / 조사 진행 중',
    'case.status.patternMatch': '구조적 위험만',

    // case-hero — meta
    'case.hero.incident': '사건일',
    'case.hero.published': '게재일',

    // case-hero — stats
    'case.stat.priceRange': '가격 구간',
    'case.stat.maxGain': '최대 상승률',
    'case.stat.maxDrawdown': '최대 하락률',
    'case.stat.marketCapPeak': '피크 시총',
    'case.stat.marketCapEvaporated': '증발 시총',
    'case.stat.pumpCrash': '펌프 / 폭락',
    'case.stat.liquidation24h': '24h 청산',

    // case-card — status / drawdown prefix
    'card.status.documented': '거래소 확인',
    'card.status.alleged': '의혹 / 조사 중',
    'card.status.patternMatch': '구조적 위험',
    'card.drawdownPrefix': '최대',

    // case-detail — back link
    'case.back': '← 사례 목록',

    // home — hero
    'home.hero.title': '구조적 위험 요소 분석',
    'home.hero.body1':
      '공개된 온체인 데이터와 보도 기사를 기반으로 한 교육 목적의 사례 연구입니다.',
    'home.hero.body2':
      '트레이더가 비슷한 위험 구조를 사전에 식별할 수 있도록 돕는 것이 목적입니다.',

    // home — section
    'home.section.title': '사례 연구',
    'home.count.filtered': '{n}건 / 전체 {total}건',
    'home.count.all': '{n}건',

    // home — filter
    'home.filter.label': '패턴 필터',
    'home.filter.clear': '초기화',

    // home — empty
    'home.empty.filtered': '선택한 패턴에 해당하는 케이스가 없습니다.',
    'home.empty.all': '케이스 데이터가 준비되는 중입니다.',
    'home.empty.note': '각 케이스는 최소 2개의 독립 출처 검증 후 게재됩니다.',

    // disclaimer (footer)
    'disclaimer.body':
      '본 페이지는 공개된 온체인 데이터와 보도 기사를 기반으로 한 교육 목적의 자료입니다. 특정 인물 또는 조직의 위법 행위를 단정하지 않으며, 모든 의혹은 제기된 그대로 인용합니다. 투자 자문이 아닙니다.',

    // chart-frame
    'chart.source': '출처',

    // case-image
    'caseImage.pending': '이미지 준비 중',
    'caseImage.source': '출처:',

    // layout — aria/title
    'theme.toLight': '라이트 모드로 전환',
    'theme.toDark': '다크 모드로 전환',
    'github.profileLabel': 'GitHub 프로필 (새 탭)',

    // zoomable-image
    'zoomable.zoomHint': '클릭해서 확대',
    'zoomable.enlarged': '확대 이미지',
    'zoomable.close': '닫기',
  },
  en: {
    'case.status.documented': 'Exchange confirmed',
    'case.status.alleged': 'Alleged · under investigation',
    'case.status.patternMatch': 'Structural risk only',

    'case.hero.incident': 'Incident',
    'case.hero.published': 'Published',

    'case.stat.priceRange': 'Price range',
    'case.stat.maxGain': 'Max gain',
    'case.stat.maxDrawdown': 'Max drawdown',
    'case.stat.marketCapPeak': 'Peak market cap',
    'case.stat.marketCapEvaporated': 'Cap evaporated',
    'case.stat.pumpCrash': 'Pump / Crash',
    'case.stat.liquidation24h': '24h liquidations',

    'card.status.documented': 'Exchange confirmed',
    'card.status.alleged': 'Alleged / Investigation',
    'card.status.patternMatch': 'Structural risk',
    'card.drawdownPrefix': 'Max',

    'case.back': '← Back to cases',

    'home.hero.title': 'Structural Risk Pattern Analysis',
    'home.hero.body1':
      'Educational case studies built on public on-chain data and press reports.',
    'home.hero.body2':
      'The goal is to help traders identify similar risk structures in advance.',

    'home.section.title': 'Case studies',
    'home.count.filtered': '{n} of {total} cases',
    'home.count.all': '{n} cases',

    'home.filter.label': 'Pattern filters',
    'home.filter.clear': 'Reset',

    'home.empty.filtered': 'No cases match the selected patterns.',
    'home.empty.all': 'Case data is being prepared.',
    'home.empty.note':
      'Each case is published only after verification by at least two independent sources.',

    'disclaimer.body':
      'This page is educational material based on public on-chain data and press reports. It does not assert wrongdoing by any specific person or organization; all allegations are cited as raised. This is not investment advice.',

    'chart.source': 'Source',

    'caseImage.pending': 'Image pending',
    'caseImage.source': 'Source:',

    'theme.toLight': 'Switch to light mode',
    'theme.toDark': 'Switch to dark mode',
    'github.profileLabel': 'GitHub profile (new tab)',

    'zoomable.zoomHint': 'Click to enlarge',
    'zoomable.enlarged': 'Enlarged image',
    'zoomable.close': 'Close',
  },
} as const

export type MessageKey = keyof (typeof messages)['ko']
