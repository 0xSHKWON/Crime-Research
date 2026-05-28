import { useT } from '@/lib/i18n/use-t'

export function Disclaimer() {
  const t = useT()
  return (
    <p className="text-xs leading-relaxed text-ink-500">{t('disclaimer.body')}</p>
  )
}
