import type { ReactNode } from 'react'
import { socialAccounts, type SocialIcon } from '../data/socialAccounts'

const icons: Record<SocialIcon, { label: string; graphic: ReactNode }> = {
  github: {
    label: 'GitHub',
    graphic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.05 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    graphic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M5.37 3.5A2.37 2.37 0 1 1 .63 3.5a2.37 2.37 0 0 1 4.74 0ZM1 8h4.75v15H1V8Zm7.75 0h4.55v2.05h.06c.64-1.2 2.19-2.47 4.5-2.47 4.81 0 5.7 3.17 5.7 7.29V23h-4.74v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H8.75V8Z" />
      </svg>
    ),
  },
  x: {
    label: 'X',
    graphic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-6.4L6.46 22H3.34l7.26-8.3L2.95 2H9.36l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.43 4.05H6.58L17.8 19.84Z" />
      </svg>
    ),
  },
  email: {
    label: 'Email',
    graphic: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
}

function SocialLinks() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {socialAccounts.map((account, index) => {
        const icon = icons[account.icon]
        const content = (
          <>
            <span className="grid size-11 place-items-center rounded-2xl bg-stone-950 text-white">
              {icon.graphic}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-stone-900">{icon.label}</span>
              {account.username && <span className="mt-0.5 block truncate text-sm text-stone-500">{account.username}</span>}
            </span>
            {account.link && <span className="ml-auto text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">&nearr;</span>}
          </>
        )

        return (
          <li key={`${account.icon}-${account.username ?? index}`}>
            {account.link ? (
              <a
                href={account.link}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-3xl border border-stone-200 bg-white/60 p-4">
                {content}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
