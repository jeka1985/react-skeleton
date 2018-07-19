import React from 'react';
import { connect } from 'react-redux';
import { navigate, navigateSuccess, navigateFail } from 'app/actions/location';

export default connect(state => ({
  path: state.location.data.path || '/',
  pendingPath: state.location.ui.pending
}))(
  class RouterSwitch extends React.Component {
    constructor(props) {
      super(props);

      this.handlePopState = this.handlePopState.bind(this);
    }

    componentDidMount() {
      window.addEventListener('popstate', this.handlePopState);
    }

    componentWillUnmount() {
      window.removeEventListener('popstate', this.handlePopState);
    }

    componentWillReceiveProps(nextProps) {
      nextProps.pendingPath && this.resolveNavigation(nextProps.pendingPath);
    }

    resolveNavigation(path) {
      var route = this.getRouteByPath(path);

      route.props.resolver ?
        route.props.resolver()
          .then(() => this.succeedTransition(path))
          .catch(() => this.failTransition(path)):
        this.succeedTransition(path);
    }

    handlePopState(e) {
      this.props.dispatch(navigate(window.location.pathname));
    }

    failTransition(path) {
      this.props.dispatch(navigateFail(path));
    }

    succeedTransition(path) {
      this.props.dispatch(navigateSuccess(path));
    }

    getRouteByPath(path) {
      let routes = React.Children.toArray(this.props.children);

      return routes.reduce((result, route) => {
        return !result && route.props.path.test(path) ?
          route :
          result;
      }, null);
    }

    render() {
      return this.getRouteByPath(this.props.path);
    }
  }
);
