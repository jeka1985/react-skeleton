import React from 'react';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import { renderToString } from 'react-dom/server';

import App from 'app/components/App';
import stats from '../../dist/react-loadable.json';

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

    return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>RRS</title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1"><link href="/dist/web/web.css" rel="stylesheet"/>${styles.map(style => {return `<link href="/dist/${style.file}" rel="stylesheet"/>`}).join('\n')}</head><body><!--[if lte IE 9]><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p><![endif]--><div id="app-container">${html}</div><script src="/dist/web/vendors.js"></script>${scripts.map(bundle => `<script src="/dist/${bundle.file}"></script>`).join('\n')}<script src="/dist/web.js"></script></body></html>`;     
  }
}
