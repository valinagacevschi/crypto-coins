import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import ReduxNavigation from '../Navigation/ReduxNavigation';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
// Styles
import styles from './Styles/RootContainerStyles';

const tracker = new GoogleAnalyticsTracker('UA-109658921-1');

class RootContainer extends Component {
  getChildContext() {
    return {
      goTo: this.goTo.bind(this),
      goBack: this.goBack.bind(this),
      reset: this.reset.bind(this),
    };
  }

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    const uid = DeviceInfo.getUniqueID();
    tracker.setUser(uid);
  }

  goBack = () => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.back());
    }
  };

  goTo = (routeName, params = null) => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.navigate({ routeName, params }));
    }
  };

  reset = (routeName, params = null) => {
    if (this.navigator) {
      this.navigator.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName, params })]
        })
      );
    }
  };

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' backgroundColor='rgba(95, 62, 99,0.85)' />
        <ReduxNavigation callback={(nav) => (this.navigator = nav)} />
      </View>
    );
  }
}

RootContainer.childContextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func,
  reset: PropTypes.func,
};

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
