import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Svg from 'react-native-svg';
import StreamGraph from './StreamGraph';
import { chartValues } from '../Transforms';

class TransactionVolumeGraph extends Component {
  render() {
    const allowed = this.props.products || [
      `BTC-${this.props.currency}`,
      `ETH-${this.props.currency}`,
      `LTC-${this.props.currency}`,
    ];
    const { height, width } = Dimensions.get('window');
    const filtered = Object.keys(this.props.prices).filter(key => allowed.includes(key)).reduce((obj, key) => {
      obj[key] = this.props.prices[key];
      return obj;
    }, {});
    const values = chartValues(filtered);
    return (
      <Svg height={height / 1.75} width={width}>
        <StreamGraph 
          keys={Object.keys(filtered)}
          values={values}
          width={width}
          height={this.props.height || height / 1.75} 
          colorOffset={this.props.colorOffset}
          colors={this.props.colors}
        />
      </Svg>
    );
  }
}

const mapStateToProps = state => ({
  prices: state.prices,
  currency: state.settings.baseCoin,
});

export default connect(mapStateToProps)(TransactionVolumeGraph);
