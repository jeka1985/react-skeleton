import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'app/store';
import { Switch, Route } from 'app/components/Router';
import Header from 'app/components/Header';
import Modals from 'app/components/Modals';
import routes from './routes.js';
import st from './style.scss';

export default function App(props) {
  return <Provider store={create(props.data)}>
    <div id="application">
      <Modals/>
      <Header/>
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route}/>)}
      </Switch>
    </div>
  </Provider>;
}
