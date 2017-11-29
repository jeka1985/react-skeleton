import React from 'react';
import { render } from 'react-dom';
import App from 'app/components/App';

render(<App data={{
  location: {
    data: {
      path: '/'
    }
  },
  documents: {
    data: {
      1: { title: 'my test doc' },
      2: { title: 'some other' },
      3: { title: 'черная пятница' }
    },
    ui: {
      activeId: 2
    }
  }
}}/>, document.getElementById('app-container'));
