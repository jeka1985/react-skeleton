import React from 'react';
import { connect } from 'react-redux';
import { injectReducer } from 'app/store';
import get from 'app/utils/object/get';
import st from './style.less';

export default connect(state => {
  return state;
})
(function HomePage(props) {
  return <div className={st.elem}>
    homepage
  </div>;
});
