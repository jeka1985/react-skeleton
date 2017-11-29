import React from 'react';
import { render } from 'react-dom';
import App from 'app/components/App';

render(<App data={{
  location: {
    data: { path: '/' }
  }
}}/>, document.getElementById('app-container'));
