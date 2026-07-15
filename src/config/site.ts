export const siteConfig = {
  name: 'NguyenPNhan',
  title: "NguyenPNhan's Blog",
  description: 'Algorithm notes, software projects, and research collected in one playful Astro portfolio.',
  github: 'https://github.com/NguyenPNhan',
  hero: {
    eyebrow: 'Hello, I am',
    name: 'Nguyen P. Nhan',
    intro: 'I write about algorithms, build software experiments, and collect research that is worth returning to.',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/project' },
    { label: 'Research', href: '/research' },
  ],
} as const
