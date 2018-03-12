import React from 'react';
import Loadable from 'react-loadable';

export default [
  {
    path: /\/$/,
    component: Loadable({
      loader: () => import('app/pages/Home'),
      loading: () => <div>loading home</div>
    })
  },
  {
    path: /\/about$/,
    component: Loadable({
      loader: () =>  import('app/pages/About'),
      loading: () => <div>loading about</div>
    })
  },
  {
    path: /\/(.+)/,
    component: Loadable({
      loader: () =>  import('app/pages/FourOhFour'),
      loading: () => <div>loading 404</div>
    })
  }
];