import React from 'react';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { renderToString } from 'react-dom/server';

import App from 'app/components/App';
import stats from '../../dist/stats.json';

module.exports = {
  loadDeps: () => Loadable.preloadAll(),
  render: (params = { }) => {
    let modules = [],

        html = renderToString(<Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <App data={params.data}/>
        </Loadable.Capture>),

        bundles = getBundles(stats, modules),

        scripts = bundles.filter(bundle => bundle.file.indexOf('.map') < 0 && bundle.file.indexOf('.css') < 0),
        styles = bundles.filter(bundle => bundle.file.indexOf('.map') < 0 && bundle.file.indexOf('.css') >= 0);

    return `<!doctype html><html lang="en">
      <head>
        <title>RRS</title>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="magic free React skeleton">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link href="/dist/web/main.css" rel="stylesheet"/>
        ${styles.map(style => `<link rel="preload" href="/dist/${style.file}" as="style">`).join('\n')}
      </head>
      <body>
        <!--[if lte IE 9]>
        <p class="browserupgrade">
          You are using an <strong>outdated</strong> browser. 
          Please <a href="https://browsehappy.com/">upgrade your browser</a> 
          to improve your experience and security.
        </p>
        <![endif]-->

        <main id="app-container">${html}</main>
        
        <script src="/dist/vendors.js"></script>
        ${scripts.map(bundle => `<script src="/dist/${bundle.file}"></script>`).join('\n')}
        <script src="/dist/web.js"></script>
      </body>
    </html>`;     
  }
}
