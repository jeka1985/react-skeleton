import React from 'react';
import DynamicComponent from 'app/components/DynamicImport';

export default [
  {
    path: /\/$/,
    component: <DynamicComponent load={() => import('app/pages/Home')}>
      {Component => Component ? <Component/> : null}
    </DynamicComponent>
  },
  {
    path: /\/(.+)/,
    component: <DynamicComponent load={() => import('app/pages/FourOhFour')}>
      {Component => Component ? <Component/> : null}
    </DynamicComponent>
  }
];