import githubIcon from '../assets/icons/github.png'

export type SocialAccount = {
  icon: {
    src: string
    label: string
  }
  link?: string
  username?: string
}

export const socialAccounts: SocialAccount[] = [
  {
    icon: {
      src: githubIcon,
      label: 'GitHub',
    },
    link: 'https://github.com/NguyenPNhan',
    username: 'NguyenPNhan',
  },
]
