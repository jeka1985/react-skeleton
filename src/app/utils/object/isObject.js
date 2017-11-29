export default function isObject(src) {
  return !!src && typeof src == 'object' && !Array.isArray(src);
}
