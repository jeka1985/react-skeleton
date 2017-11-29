export default [
  {
    path: /\/$/,
    component: require('app/pages/Home').default
  },
  {
    path: /\/about$/,
    component: require('app/pages/About').default,
    resolver: () => new Promise(resolve => {
      window.setTimeout(resolve, 3000);
    })
  },
  {
    path: /\/(.+)/,
    component: require('app/pages/FourOhFour').default
  }
];
