export default function uniqueId(params = {}) {
  var namespace = params.namespace || 'root',
      prefix = params.prefix || '';

  uniqueId.store = uniqueId.store || {};

  uniqueId.store[namespace] = uniqueId.store[namespace] || 0;

  ++uniqueId.store[namespace];

  return `${prefix ? `${namespace}_` : ''}${uniqueId.store[namespace]}`;
}
