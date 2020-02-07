export default function getUrlParams(url) {
  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  const obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    const arr = queryString.split('&');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      // separate the keys and the values
      const a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      let paramNum;
      const paramName = a[0].replace(/\[\d*]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      /* paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase(); */

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        } else {
          // if array index number specified...
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      } else {
        // if param name doesn't exist yet, set it
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
