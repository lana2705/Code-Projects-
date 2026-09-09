import type { BudgetResult } from '@/types/calculator'

export type { BudgetResult }

const NEEDS_PERCENT = 50
const WANTS_PERCENT = 30
const SAVINGS_PERCENT = 20

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function calculateBudget(monthlyIncome: number): BudgetResult {
  return {
    monthlyIncome,
    needs: {
      label: 'Needs',
      percent: NEEDS_PERCENT,
      amount: round2(monthlyIncome * (NEEDS_PERCENT / 100)),
      examples: [
        'Rent or mortgage',
        'Utilities',
        'Groceries',
        'Insurance',
        'Minimum debt payments',
      ],
    },
    wants: {
      label: 'Wants',
      percent: WANTS_PERCENT,
      amount: round2(monthlyIncome * (WANTS_PERCENT / 100)),
      examples: ['Dining out', 'Entertainment', 'Subscriptions', 'Hobbies', 'Travel'],
    },
    savings: {
      label: 'Savings & extra debt payments',
      percent: SAVINGS_PERCENT,
      amount: round2(monthlyIncome * (SAVINGS_PERCENT / 100)),
      examples: [
        'Emergency fund',
        'Retirement contributions',
        'Extra debt payoff',
        'Investing',
      ],
    },
  }
}
