import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

if (Platform.OS === 'android') {
  Intl = require('intl');
  require('intl/locale-data/jsonp/en.js');
}

class Latest extends Component {
  render() {
    const { id, prefix } = this.props;
    const currency = id.split('-')[1].replace('USDC', 'USD');

    const value = lastValueOrZero(this.props.prices[id], currency);
    return (
      <Text {...this.props}>
        {prefix}{value}
      </Text>
    );
  }
}

const format = (num, currency) => {
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });
  return fmt.format(num);
};

const lastValueOrZero = (prices, currency) =>
  format((_.last(({ values=[] } = prices || {}).values) || { price: 0 }).price, currency);

const mapStateToProps = state => ({
  baseCoin: state.settings.baseCoin,
  prices: state.prices,
});

export default connect(mapStateToProps)(Latest);
