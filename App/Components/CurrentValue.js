import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Latest from './Latest';
import xstyles from './Styles/CurrentValueStyle';

class CurrentValue extends Component {
  render() {
    const currency = this.props.baseCoin;
    return (
      <View style={[styles.container, { marginBottom: 30 }]}>
        <Latest id={`BTC-${currency}`} prefix='BTC: ' style={[styles.coin, styles.subtitle]} />
        <View style={styles.row} >
          <Latest id={`ETH-${currency}`} prefix='ETH: ' style={styles.coin} />
          <Latest id={`LTC-${currency}`} prefix='LTC: ' style={styles.coin} />
        </View>
      </View>
    );
  }
}
const styles = {
  ...xstyles,
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 15,
  },
  coin: {
    fontSize: 15.5,
    fontWeight: '600',
  }
};

const mapStateToProps = state => ({
  baseCoin: state.settings.baseCoin,
});

export default connect(mapStateToProps)(CurrentValue);
