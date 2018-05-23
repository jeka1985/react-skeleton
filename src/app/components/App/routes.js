import React from 'react';
import Loadable from 'react-loadable';
import FourOhFourPage from 'app/pages/FourOhFour';

export default [
  {
    path: /\/$/,
    component: Loadable({
      loader: () => import('app/pages/Home'),
      loading: () => null
    })
  },
  {
    path: /\/about$/,
    component: Loadable({
      loader: () =>  import('app/pages/About'),
      loading: () => null
    })
  },
  {
    path: /\/(.+)/,
    component: FourOhFourPage
  }
];