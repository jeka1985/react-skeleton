import React from 'react';
import { connect } from 'react-redux';
import { getModalsList } from 'app/selectors/modals';

export default connect(
  state => ({
    modals: getModalsList()
  })
)(function ModalsManager(props) {
  const byName = { };

  return <div>
    {props.modals.map(item => {
      var Component = byName[item.name];

      return Component ?
        <div key={item.name}>
          <Component {...item}/>
        </div> :
        null
    })}
  </div>;
});
