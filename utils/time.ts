/**
 * convert iso date to time stamp
 * @param {string} isoDateString to convert to timestamp
 * @return {number} timestamp
 */
export function getTimeStamp(isoDateString: string) {
  const date: Date = new Date(isoDateString);
  return date.getTime();
}
