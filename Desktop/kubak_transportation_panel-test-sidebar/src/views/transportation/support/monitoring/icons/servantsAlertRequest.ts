export function servantAlertRequest(image: string) {

  return `<svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="100" cy="100" r="100" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_839_2" transform="translate(-0.25) scale(0.00245098)"/>
  </pattern>
  <image id="image0_839_2" width="612" height="408" xlink:href="${import.meta.env.FILE_BASE_URL}${image}"/>
  </defs>
</svg>`
}