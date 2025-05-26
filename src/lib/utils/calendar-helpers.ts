// lib/utils/calendarHelpers.ts

/**
 * Generates a random ID string.
 */
export const generateId = () => Math.random().toString(36).substr(2, 9)

/**
 * Returns the number of days in a given month and year.
 */
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * Returns the day of the week for a given date.
 * 0 = Sunday, 6 = Saturday
 */
export const getDayOfWeek = (year: number, month: number, day: number): number => {
    return new Date(year, month, day).getDay()
}

/**
 * Formats a date as a string: "YYYY-MM-DD"
 */
export const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}
