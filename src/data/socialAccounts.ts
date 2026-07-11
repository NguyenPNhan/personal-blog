export type SocialIcon = 'github' | 'linkedin' | 'x' | 'email'

export type SocialAccount = {
  icon: SocialIcon
  link?: string
  username?: string
}

export const socialAccounts: SocialAccount[] = [
  {
    icon: 'github',
    link: 'https://github.com/NguyenPNhan',
    username: 'NguyenPNhan',
  },
]
