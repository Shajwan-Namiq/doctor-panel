export function convertDistance(distanceInMeters) {
  if (distanceInMeters < 1000) {
    return distanceInMeters + "m"; // Meters
  } else {
    const kilometers = (distanceInMeters / 1000).toFixed(2);
    return kilometers + "km"; // Kilometers
  }
}
