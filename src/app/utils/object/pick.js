export default function pick(src = {}, key) {
  var keys = Array.isArray(key) ? key : [key];

  return keys.reduce((result, key) => {
    if (src.hasOwnProperty(key)) result[key] = src[key];

    return result;
  }, {});
}
