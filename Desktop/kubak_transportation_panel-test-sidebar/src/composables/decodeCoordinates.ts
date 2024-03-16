/* eslint-disable prefer-const */
export default function decodeCoordinates(str) {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates: [number, number][] = [],
    shift = 0,
    result = 0,
    byte = 0,
    latitude_change,
    longitude_change,
    factor = Math.pow(10, 6);
  try {
    while (index < str.length) {
      byte = 0;
      shift = 0;
      result = 0;
      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
      shift = result = 0;
      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      longitude_change = result & 1 ? ~(result >> 1) : result >> 1;
      lat += latitude_change;
      lng += longitude_change;
      coordinates.push([lat / factor, lng / factor]);
    }
  } catch (e) {
    /* empty */
  }
  return coordinates;
}
