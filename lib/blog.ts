export type BlogCategory = 'Debt' | 'Paycheck' | 'Budgeting' | 'Savings'

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: BlogCategory
  publishedDate: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'avalanche-vs-snowball',
    title: 'Avalanche vs Snowball: Which Debt Payoff Method Saves More Money?',
    description:
      'Compare the debt avalanche and debt snowball methods side by side, with a real numbers example, pros and cons, and how to pick the right one for you.',
    category: 'Debt',
    publishedDate: '2026-08-28',
  },
  {
    slug: 'how-to-read-your-paycheck',
    title: 'How to Read Your Paycheck: What Every Deduction Actually Means',
    description:
      'A plain-English breakdown of every line on your pay stub — gross pay, federal and state tax, Social Security, Medicare, 401(k), and net pay.',
    category: 'Paycheck',
    publishedDate: '2026-08-28',
  },
  {
    slug: 'pay-off-debt-or-invest',
    title: 'Should I Pay Off Debt or Invest? How to Decide',
    description:
      "Pay off debt or invest — it's one of the most common personal finance questions. Here's a clear framework for making the right decision based on your interest rates and situation.",
    category: 'Debt',
    publishedDate: '2026-08-28',
  },
  {
    slug: '50-30-20-budget-rule',
    title: 'What Is the 50/30/20 Budget Rule?',
    description:
      "The 50/30/20 budget rule divides your take-home pay into needs, wants, and savings. Here's how it works, whether it's realistic, and how to adapt it to your life.",
    category: 'Budgeting',
    publishedDate: '2026-08-28',
  },
  {
    slug: 'how-much-should-i-have-in-savings',
    title: 'How Much Should I Have in Savings? A Guide for Every Age',
    description:
      "Wondering how much you should have saved? Here's a practical guide to savings benchmarks by age, income, and life stage — plus how to calculate your personal target.",
    category: 'Savings',
    publishedDate: '2026-08-28',
  },
  {
    slug: 'how-much-should-i-save-each-month',
    title: 'How Much Should I Save Each Month?',
    description:
      "Not sure how much to save each month? Here's how to calculate the right savings amount for your income, goals, and life stage — with real examples.",
    category: 'Savings',
    publishedDate: '2026-08-28',
  },
]
