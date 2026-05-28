import { useLang } from '@/lib/use-lang'
import { messages, type MessageKey } from './messages'

type Vars = Record<string, string | number>

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template
  let out = template
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{${k}}`).join(String(v))
  }
  return out
}

export function useT(): (key: MessageKey, vars?: Vars) => string {
  const [lang] = useLang()
  const dict = messages[lang]
  return (key, vars) => interpolate(dict[key] ?? messages.ko[key] ?? key, vars)
}
