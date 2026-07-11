import { socialAccounts } from '../data/socialAccounts'

function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Social accounts">
      {socialAccounts.map((account, index) => {
        const content = (
          <>
            <img
              src={account.icon.src}
              alt=""
              className="size-8 shrink-0 rounded-full object-contain"
            />
            <span className="min-w-0">
              <span className="sr-only">{account.icon.label}</span>
              {account.username && (
                <span className="block max-w-44 truncate text-sm font-semibold text-stone-600">
                  {account.username}
                </span>
              )}
            </span>
          </>
        )

        return (
          <li key={`${account.icon.label}-${account.username ?? index}`}>
            {account.link ? (
              <a
                href={account.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${account.icon.label}${account.username ? `: ${account.username}` : ''}`}
                className="group flex items-center gap-2.5 rounded-full border border-stone-200 bg-white/80 py-1.5 pl-1.5 pr-3 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-2.5 rounded-full border border-stone-200 bg-white/60 py-1.5 pl-1.5 pr-3">
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
