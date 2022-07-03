import React, { Component } from 'react';
import { View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import CurrentValue from '../Components/CurrentValue';
import TransactionVolumeGraph from '../Components/TransactionVolumeGraph';
import Description from '../Components/Description';
import Header from '../Components/Header';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header noBack title='CryptoCoins' />
        <CurrentValue />
        <TransactionVolumeGraph />
        <Description />
        <KeepAwake />
      </View>
    );
  }
}

