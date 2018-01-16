import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'app/actions/location';

export default connect((state, props) => ({
  isActive: props.path == state.location.path
}))(
  function RouterLink(props) {
    var { path } = props;

    return <a
      onClick={e => {
        e.preventDefault();
        props.dispatch(navigate(path));
      }}
      href={path}
      className={props.className}>
      {props.children}
    </a>;
  }
);
