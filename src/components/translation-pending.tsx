export function TranslationPending() {
  return (
    <div className="border-b border-ink-700/40 bg-ink-800/40 px-6 py-2 md:px-10">
      <div className="mx-auto flex max-w-5xl items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-400">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-ink-400" aria-hidden />
        Translation pending — showing original Korean content
      </div>
    </div>
  )
}
