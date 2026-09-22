import type { RetirementInputs, RetirementResult, RetirementYear } from '@/types/calculator'

export type { RetirementInputs, RetirementResult, RetirementYear }

export function validateRetirementInputs(inputs: RetirementInputs): string[] {
  const errors: string[] = []

  if (
    !inputs.currentAge ||
    inputs.currentAge < 18 ||
    inputs.currentAge > 80 ||
    !Number.isInteger(inputs.currentAge)
  )
    errors.push('Current age must be a whole number between 18 and 80.')
  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge)
    errors.push('Retirement age must be greater than your current age.')
  if (inputs.currentSavings < 0)
    errors.push('Current retirement savings cannot be negative.')
  if (!inputs.annualIncome || inputs.annualIncome <= 0)
    errors.push('Annual household income must be greater than $0.')
  if (inputs.monthlyContribution < 0)
    errors.push('Monthly contribution cannot be negative.')
  if (inputs.employerMatchRate < 0 || inputs.employerMatchRate > 1)
    errors.push('Employer match rate must be between 0% and 100%.')
  if (inputs.expectedAnnualReturn < 0 || inputs.expectedAnnualReturn > 0.3)
    errors.push('Expected annual return must be between 0% and 30%.')
  if (inputs.inflationRate < 0 || inputs.inflationRate > 0.2)
    errors.push('Inflation rate must be between 0% and 20%.')
  if (!inputs.desiredMonthlyIncome || inputs.desiredMonthlyIncome <= 0)
    errors.push('Desired monthly retirement income must be greater than $0.')
  if (inputs.socialSecurityMonthly < 0)
    errors.push('Social Security estimate cannot be negative.')
  if (
    !inputs.yearsOfRetirement ||
    !Number.isInteger(inputs.yearsOfRetirement) ||
    inputs.yearsOfRetirement < 1 ||
    inputs.yearsOfRetirement > 70
  )
    errors.push('Years of retirement must be a whole number between 1 and 70.')
  if (inputs.retirementAge + inputs.yearsOfRetirement > 120)
    errors.push('Retirement age plus years of retirement cannot exceed age 120.')

  return errors
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

interface SimulationOutput {
  projectedBalance: number
  projectedBalanceInTodaysDollars: number
  totalContributions: number
  totalEmployerMatch: number
  totalGrowth: number
  yearlyProjections: RetirementYear[]
}

/**
 * Single source of truth for the projected balance. Compounds monthly at the
 * expected return; contributions (yours + employer match) step up annually
 * with inflation so a fixed dollar contribution keeps its purchasing power.
 */
function runYearByYearSimulation(inputs: RetirementInputs): SimulationOutput {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualIncome,
    employerMatchRate,
    expectedAnnualReturn,
    inflationRate,
  } = inputs

  const currentYear = new Date().getFullYear()
  const yearsToRetirement = retirementAge - currentAge
  const monthlyReturn = expectedAnnualReturn / 12

  let balance = currentSavings
  let cumulativeContributions = 0
  let cumulativeMatch = 0
  let cumulativeGrowth = 0
  const yearlyProjections: RetirementYear[] = []

  for (let y = 0; y < yearsToRetirement; y++) {
    const userMonthly = monthlyContribution * Math.pow(1 + inflationRate, y)
    const matchMonthly =
      ((annualIncome / 12) * employerMatchRate) * Math.pow(1 + inflationRate, y)
    const totalMonthly = userMonthly + matchMonthly

    let annualContribution = 0
    let annualMatch = 0
    let annualGrowth = 0

    for (let m = 0; m < 12; m++) {
      const growth = balance * monthlyReturn
      annualGrowth += growth
      balance += growth + totalMonthly
      annualContribution += userMonthly
      annualMatch += matchMonthly
    }

    cumulativeContributions += annualContribution
    cumulativeMatch += annualMatch
    cumulativeGrowth += annualGrowth

    const inflationFactorThisYear = Math.pow(1 + inflationRate, y + 1)
    yearlyProjections.push({
      age: currentAge + y + 1,
      year: currentYear + y + 1,
      balance: round2(balance),
      balanceInTodaysDollars: round2(balance / inflationFactorThisYear),
      annualContribution: round2(annualContribution),
      annualEmployerMatch: round2(annualMatch),
      annualGrowth: round2(annualGrowth),
      cumulativeContributions: round2(cumulativeContributions),
      cumulativeGrowth: round2(cumulativeGrowth),
    })
  }

  const inflationFactor = Math.pow(1 + inflationRate, Math.max(yearsToRetirement, 0))
  const projectedBalance = round2(balance)
  const projectedBalanceInTodaysDollars = round2(projectedBalance / inflationFactor)

  return {
    projectedBalance,
    projectedBalanceInTodaysDollars,
    totalContributions: round2(cumulativeContributions),
    totalEmployerMatch: round2(cumulativeMatch),
    totalGrowth: round2(cumulativeGrowth),
    yearlyProjections,
  }
}

type CoreResult = Omit<RetirementResult, 'additionalMonthlySavingsNeeded' | 'retireEarlierAge'>

function computeCore(inputs: RetirementInputs): CoreResult {
  const sim = runYearByYearSimulation(inputs)
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge
  const inflationFactor = Math.pow(1 + inputs.inflationRate, Math.max(yearsToRetirement, 0))

  // Goal calculation: finite-period annuity model, entirely in today's dollars.
  const monthlyIncomeNeededFromSavings =
    inputs.desiredMonthlyIncome - inputs.socialSecurityMonthly
  const realReturnRate =
    (1 + inputs.expectedAnnualReturn) / (1 + inputs.inflationRate) - 1
  const monthlyRealReturn = realReturnRate / 12
  const totalRetirementMonths = inputs.yearsOfRetirement * 12

  let requiredNestEgg: number
  if (monthlyRealReturn === 0) {
    requiredNestEgg = monthlyIncomeNeededFromSavings * totalRetirementMonths
  } else {
    requiredNestEgg =
      (monthlyIncomeNeededFromSavings *
        (1 - Math.pow(1 + monthlyRealReturn, -totalRetirementMonths))) /
      monthlyRealReturn
  }
  requiredNestEgg = round2(Math.max(0, requiredNestEgg))

  const desiredMonthlyIncomeNominal = round2(
    inputs.desiredMonthlyIncome * inflationFactor,
  )
  const socialSecurityNominal = round2(inputs.socialSecurityMonthly * inflationFactor)

  const fundingPercentage =
    requiredNestEgg > 0
      ? sim.projectedBalanceInTodaysDollars / requiredNestEgg
      : sim.projectedBalanceInTodaysDollars > 0
        ? Infinity
        : 1

  let onTrackStatus: RetirementResult['onTrackStatus']
  if (fundingPercentage >= 1.1) onTrackStatus = 'surplus'
  else if (fundingPercentage >= 0.95) onTrackStatus = 'on_track'
  else if (fundingPercentage >= 0.75) onTrackStatus = 'slightly_behind'
  else onTrackStatus = 'significantly_behind'

  // Income estimate: separate 4% withdrawal rule-of-thumb.
  const estimatedMonthlyWithdrawal = round2(
    (sim.projectedBalanceInTodaysDollars * 0.04) / 12,
  )
  const totalMonthlyIncome = round2(
    estimatedMonthlyWithdrawal + inputs.socialSecurityMonthly,
  )
  const monthlyIncomeGap = round2(totalMonthlyIncome - inputs.desiredMonthlyIncome)

  return {
    projectedBalance: sim.projectedBalance,
    projectedBalanceInTodaysDollars: sim.projectedBalanceInTodaysDollars,
    yearsToRetirement,
    totalContributions: sim.totalContributions,
    totalEmployerMatch: sim.totalEmployerMatch,
    totalGrowth: sim.totalGrowth,
    requiredNestEgg,
    estimatedMonthlyWithdrawal,
    socialSecurityMonthly: inputs.socialSecurityMonthly,
    totalMonthlyIncome,
    monthlyIncomeGap,
    desiredMonthlyIncomeNominal,
    socialSecurityNominal,
    onTrackStatus,
    fundingPercentage,
    yearlyProjections: sim.yearlyProjections,
  }
}

/**
 * Binary-searches the smallest additional monthly contribution (today's
 * dollars, added on top of Year 1's contribution and stepped up with
 * inflation like the base contribution) that closes the funding gap. Runs
 * against the same simulation used for the main projection, so the number
 * shown is guaranteed to actually close the gap.
 */
function findAdditionalSavingsNeeded(
  inputs: RetirementInputs,
  requiredNestEgg: number,
): number {
  let lo = 0
  let hi = Math.max(requiredNestEgg / 12, 100)
  const TOLERANCE = 1

  // Make sure the upper bound is actually sufficient before searching.
  let guard = 0
  while (
    runYearByYearSimulation({
      ...inputs,
      monthlyContribution: inputs.monthlyContribution + hi,
    }).projectedBalanceInTodaysDollars < requiredNestEgg &&
    guard < 40
  ) {
    hi *= 2
    guard++
  }

  while (hi - lo > TOLERANCE) {
    const mid = (lo + hi) / 2
    const result = runYearByYearSimulation({
      ...inputs,
      monthlyContribution: inputs.monthlyContribution + mid,
    })
    if (result.projectedBalanceInTodaysDollars >= requiredNestEgg) {
      hi = mid
    } else {
      lo = mid
    }
  }

  return Math.ceil(hi)
}

/**
 * Earliest age (after the current age, before the planned retirement age)
 * at which the projected balance would already meet the required nest egg.
 * Social Security is held fixed at the user's entered estimate regardless
 * of candidate age — claiming-age effects aren't modeled.
 */
function findEarliestRetirementAge(inputs: RetirementInputs): number | null {
  for (
    let candidateAge = inputs.currentAge + 1;
    candidateAge < inputs.retirementAge;
    candidateAge++
  ) {
    const core = computeCore({ ...inputs, retirementAge: candidateAge })
    if (core.projectedBalanceInTodaysDollars >= core.requiredNestEgg) {
      return candidateAge
    }
  }
  return null
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const core = computeCore(inputs)

  const additionalMonthlySavingsNeeded =
    core.projectedBalanceInTodaysDollars < core.requiredNestEgg
      ? findAdditionalSavingsNeeded(inputs, core.requiredNestEgg)
      : 0

  const retireEarlierAge =
    core.fundingPercentage >= 1.1 ? findEarliestRetirementAge(inputs) : null

  return { ...core, additionalMonthlySavingsNeeded, retireEarlierAge }
}

export interface WorkTwoMoreYearsResult {
  retireAtAge: number
  projectedBalance: number
  projectedBalanceInTodaysDollars: number
  requiredNestEgg: number
  fundingPercentage: number
}

/** Retire 2 years later: 2 more years of contributions/growth, 2 fewer years to fund. */
export function calcWorkTwoMoreYears(inputs: RetirementInputs): WorkTwoMoreYearsResult {
  const adjustedAge = inputs.retirementAge + 2
  const adjustedYears = Math.max(1, inputs.yearsOfRetirement - 2)
  const result = calculateRetirement({
    ...inputs,
    retirementAge: adjustedAge,
    yearsOfRetirement: adjustedYears,
  })
  return {
    retireAtAge: adjustedAge,
    projectedBalance: result.projectedBalance,
    projectedBalanceInTodaysDollars: result.projectedBalanceInTodaysDollars,
    requiredNestEgg: result.requiredNestEgg,
    fundingPercentage: result.fundingPercentage,
  }
}

export interface HigherReturnScenarioResult {
  scenarioReturn: number
  projectedBalance: number
  projectedBalanceInTodaysDollars: number
  fundingPercentage: number
}

/** Same inputs, +0.5 percentage points on the expected annual return. */
export function calcHigherReturnScenario(
  inputs: RetirementInputs,
): HigherReturnScenarioResult {
  const scenarioReturn = inputs.expectedAnnualReturn + 0.005
  const result = calculateRetirement({ ...inputs, expectedAnnualReturn: scenarioReturn })
  return {
    scenarioReturn,
    projectedBalance: result.projectedBalance,
    projectedBalanceInTodaysDollars: result.projectedBalanceInTodaysDollars,
    fundingPercentage: result.fundingPercentage,
  }
}
