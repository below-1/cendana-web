import { getYear, getMonth } from 'date-fns'

export function currentYearMonth() {
  const now = new Date()
  const year = getYear(now)
  const month = getMonth(now)
  console.log(`month is ${month}`)
  return {
    year,
    month
  }
}