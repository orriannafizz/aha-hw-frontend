export function getTimeStamp(isoDateString: string) {
  const date: Date = new Date(isoDateString);
  return date.getTime();
}
