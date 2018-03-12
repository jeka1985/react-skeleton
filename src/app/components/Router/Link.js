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
        window.history.pushState({ path }, null, path);
        window.scrollTo(0, 0);
        props.dispatch(navigate(path));
      }}
      href={path}
      className={props.className}>
      {props.children}
    </a>;
  }
);
