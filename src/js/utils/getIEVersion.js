/**
 * Get IE Version
 * @returns {integer} Version of Internet Explorer, or 0
 */
export default function GetIEVersion() {
  const sAgent = window.navigator.userAgent;
  const Idx = sAgent.indexOf('MSIE');

  // If IE, return version number.
  if (Idx > 0) {
    return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf('.', Idx)));
  }
  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) {
    return 11;
  } else {
    return 0; // It is not IE
  }
}
