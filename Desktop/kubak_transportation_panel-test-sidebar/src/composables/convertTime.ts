export function convertTime(timeInSeconds) {
  if (timeInSeconds < 60) {
    return Math.floor(timeInSeconds) + "s"; // Seconds
  } else if (timeInSeconds < 3600) {
    const minutes = Math.floor(timeInSeconds / 60);
    return minutes + "m"; // Minutes
  } else if (timeInSeconds < 86400) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return hours + "h " + minutes + "m"; // Hours and minutes
  } else {
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    return days + "d " + hours + "h"; // Days and hours
  }
}
