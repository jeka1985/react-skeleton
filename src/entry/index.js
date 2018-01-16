import React from 'react';
import { render } from 'react-dom';
import App from 'app/components/App';

render(<App data={{
  location: {
    data: { 
      path: '/',
      resolved: true 
    }
  }
}}/>, document.getElementById('app-container'));
