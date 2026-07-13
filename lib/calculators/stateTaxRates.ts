export const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.05, AK: 0.0, AZ: 0.025, AR: 0.049, CA: 0.093,
  CO: 0.044, CT: 0.065, DE: 0.066, FL: 0.0, GA: 0.055,
  HI: 0.079, ID: 0.058, IL: 0.0495, IN: 0.0315, IA: 0.06,
  KS: 0.057, KY: 0.045, LA: 0.0425, ME: 0.075, MD: 0.0575,
  MA: 0.05, MI: 0.0425, MN: 0.0985, MS: 0.05, MO: 0.054,
  MT: 0.069, NE: 0.0664, NV: 0.0, NH: 0.0, NJ: 0.0637,
  NM: 0.059, NY: 0.0685, NC: 0.0499, ND: 0.029, OH: 0.0399,
  OK: 0.0475, OR: 0.099, PA: 0.0307, RI: 0.0599, SC: 0.07,
  SD: 0.0, TN: 0.0, TX: 0.0, UT: 0.0485, VT: 0.0875,
  VA: 0.0575, WA: 0.0, WV: 0.065, WI: 0.0765, WY: 0.0,
  DC: 0.085,
}

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'Washington D.C.',
}

/** State codes sorted alphabetically by full state name — for select dropdowns. */
export const STATES_ALPHABETICAL: { code: string; name: string }[] = Object.keys(
  STATE_NAMES,
)
  .map((code) => ({ code, name: STATE_NAMES[code] }))
  .sort((a, b) => a.name.localeCompare(b.name))
