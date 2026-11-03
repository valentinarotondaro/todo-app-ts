/**
 * Returns a greeting for the time of day.
 *
 * @param date - The current date and time.
 * @returns "Good morning!" before 12, "Good afternoon!" before 18, otherwise "Good evening!".
 */
export const getGreeting = (date: Date): string => {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
};

/**
 * Formats a date as a short, readable line, for example "Tuesday 3 November".
 *
 * @param date - The date to format.
 * @returns The weekday, day and month in English.
 */
export const formatToday = (date: Date): string =>
  date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });