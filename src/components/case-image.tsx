import { useT } from '@/lib/i18n/use-t'

interface CaseImageProps {
  caption: string
  source: string
  src?: string
}

export function CaseImage({ caption, source, src }: CaseImageProps) {
  const t = useT()
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-md border border-ink-700/60 bg-ink-800/30">
      {src ? (
        <img src={src} alt={caption} className="block w-full" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-ink-800/40">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-500">
            {t('caseImage.pending')}
          </p>
        </div>
      )}
      <figcaption className="border-t border-ink-700/60 px-4 py-3 text-xs leading-relaxed text-ink-400">
        {caption}
        <span className="ml-2 text-ink-500">
          {t('caseImage.source')} {source}
        </span>
      </figcaption>
    </figure>
  )
}
