import React from 'react';
import get from 'app/utils/object/get';

export default function FourOhFourPage() {
  console.log(get({}, '123'))

  return <div>404</div>;
}
