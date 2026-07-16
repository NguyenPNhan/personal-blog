export const siteConfig = {
  name: 'NguyenPNhan',
  title: "NguyenPNhan's Blog",
  description: 'Algorithm notes, software projects, and research collected in one playful Astro portfolio.',
  github: 'https://github.com/NguyenPNhan',
  hero: {
    eyebrow: 'Hello, I am',
    name: 'Nguyen P. Nhan',
    intro: 'Just a blogger',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/project' },
    { label: 'Research', href: '/research' },
  ],
} as const
