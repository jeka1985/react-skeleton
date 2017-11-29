import isObject from 'app/utils/object/isObject';

export default function get(src = {}, path = '', def) {
  var entry = isObject(src) ? src : {},
      stop;

  (Array.isArray(path) ? path : path.split('.')).forEach(key => {
    if (!stop && entry.hasOwnProperty(key)) {
      entry = entry[key];
    } else {
      entry = def;
      stop = true;
    }
  });

  return entry;
}
