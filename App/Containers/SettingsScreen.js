import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Linking, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';

import SettingsActions from '../Redux/SettingsRedux';
import Header from '../Components/Header';
// Styles
import xstyles from './Styles/SettingsScreenStyle';
import { Colors } from '../Themes';

const appID = '1318638937';
const playID = 'com.appcenter.CryptoCoins';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoStream: props.autoStream,
      defaultUsd: props.baseCoin === 'USD',
    };
  }
  
  onCurrencyChange = (value) => {
    this.setState({ defaultUsd: value });
    this.props.setBaseCoin(value ? 'USD' : 'EUR');
  }

  onAutoStreamChange = (value) => {
    this.setState({ autoStream: value });
    this.props.setAutoStream(value);
    (value ? this.props.start() : this.props.stop());
  }

  onPressOpen = (title, link) => {
    Alert.alert(
      title,
      'Open home page in browser ?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => Linking.openURL(link) }
      ]
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header noBack title='Settings' />
        <SettingsList borderColor={Colors.steel} defaultItemSize={50}>
          <SettingsList.Item
            icon={<Icon name='area-chart' style={styles.icon} color={Colors.banner} />}
            hasSwitch
            switchState={this.props.autoStream}
            switchOnValueChange={this.onAutoStreamChange}
            hasNavArrow={false}
            title='Streaming data'
          />
          <SettingsList.Item
            icon={<Icon name='money' style={styles.icon} color={Colors.banner} />}
            hasSwitch
            switchState={this.state.defaultUsd}
            switchOnValueChange={this.onCurrencyChange}
            hasNavArrow={false}
            title='$ - USD / € - Euro'
          />
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />
          <SettingsList.Item
            icon={<Icon name='star-half-o' style={styles.icon} color={Colors.banner} />}
            title='Rate CryptoCoins'
            onPress={() => Linking.openURL(Platform.OS === 'ios' ? `itms-apps://itunes.apple.com/app/viewContentsUserReviews?id=${appID}` : `market://details?id=${playID}`)}
          />
          <SettingsList.Item
            icon={<Icon name='bitcoin' style={styles.icon} color={Colors.banner} />}
            title='About CryptoCoins'
            onPress={() => this.context.goTo('about')}
          />
          <SettingsList.Item
            icon={<Icon name='copyright' style={styles.icon} color={Colors.banner} />}
            title='Copyright'
            titleInfo='AppCenter'
            onPress={() => Alert.alert('Copyright AppCenter Technologies 2017')}
          />
          <SettingsList.Header headerStyle={{ marginTop: 15 }} />

          <SettingsList.Item
            icon={<Icon name='pie-chart' style={styles.icon} color={Colors.banner} />}
            title='Courtesy of'
            titleInfo='GDAX'
            onPress={() => this.onPressOpen('GDAX', 'https://www.gdax.com/')}
          />
          <SettingsList.Item
            icon={<Icon name='pie-chart' style={styles.icon} color={Colors.banner} />}
            title='Courtesy of'
            titleInfo='CoinMarketCap'
            onPress={() => this.onPressOpen('CoinMarketCap', 'https://coinmarketcap.com/')}
          />
          <SettingsList.Item
            icon={<Icon name='pie-chart' style={styles.icon} color={Colors.banner} />}
            title='Courtesy of'
            titleInfo='CryptoCompare'
            onPress={() => this.onPressOpen('CryptoCompare', 'https://cryptocompare.com/')}
          />
        </SettingsList>
      </View>
    );
  }
}

SettingsScreen.contextTypes = {
  goTo: PropTypes.func,
};

const styles = {
  ...xstyles,
  icon: {
    marginTop: 13,
    marginLeft: 10,
    fontSize: 24,
  }
};

const mapStateToProps = (state) => ({
  autoStream: state.settings.autoStream,
  baseCoin: state.settings.baseCoin,
});

const mapDispatchToProps = (dispatch) => ({
  setAutoStream: (autoStream) => dispatch(SettingsActions.setAutoStream(autoStream)),
  setBaseCoin: (baseCoin) => dispatch(SettingsActions.setBaseCoin(baseCoin)),
  start: () => dispatch(SettingsActions.startBackgroundTask()),
  stop: () => dispatch(SettingsActions.stopBackgroundTask()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
