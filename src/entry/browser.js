import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import App from 'app/components/App';

Loadable.preloadReady().then(() => {
  hydrate(<App
    data={{
      location: {
        data: { path: '/' }
      }
    }}/>, document.getElementById('app-container'));
});
