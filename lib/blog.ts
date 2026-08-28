export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedDate: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'avalanche-vs-snowball',
    title: 'Avalanche vs Snowball: Which Debt Payoff Method Saves More Money?',
    description:
      'Compare the debt avalanche and debt snowball methods side by side, with a real numbers example, pros and cons, and how to pick the right one for you.',
    publishedDate: '2026-08-28',
  },
  {
    slug: 'how-to-read-your-paycheck',
    title: 'How to Read Your Paycheck: What Every Deduction Actually Means',
    description:
      'A plain-English breakdown of every line on your pay stub — gross pay, federal and state tax, Social Security, Medicare, 401(k), and net pay.',
    publishedDate: '2026-08-28',
  },
]
