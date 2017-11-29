export default function without(src = {}, key) {
  var copy = Object.assign({}, src),
      keys = Array.isArray(key) ? key : [key];

  keys.forEach(item => {
    delete copy[item];
  });

  return copy;
}
