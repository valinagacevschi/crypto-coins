import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import xstyles from './Styles/CoinStyle';
import { Icons, fontello, Colors, Fonts } from '../Themes';

if (Platform.OS === 'android') {
  Intl = require('intl');
  require('intl/locale-data/jsonp/en.js');
}

const fmtUs = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
const fmtUs2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
const fmtNum = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0 });
const fmtNum8 = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 8 });
const fmtPrc = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 });

export default class Coin extends Component {
  render() {
    const {
      // id,
      marketCapUsd,
      maxSupply,
      name,
      percentChange1h,
      percentChange24h,
      priceBtc,
      priceUsd,
      symbol,
      totalSupply,
      volumeUsd,
      onPress,
    } = this.props;
    let iconName = `${symbol.toLowerCase()}-alt`;
    if (!fontello.glyphs.includes(iconName)) {
      iconName = 'zeit-alt';
    }
    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.row} >
          <View style={styles.bullet} >
            <Icons name={iconName} size={16} color={Colors.snow} />
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.symbol}>{symbol}</Text>
          </View>
        </View>
        <View style={styles.row} >
          <View style={styles.box} >
            <Text style={styles.label} >Price USD:</Text>
            <Text style={styles.value}>{fmtUs2.format(priceUsd)}</Text>
          </View>
          <View style={styles.box} >
            <Text style={styles.label} >Price BTC:</Text>
            <Text style={styles.value}>Ƀ{fmtNum8.format(priceBtc)}</Text>
          </View>
        </View>
        <View style={styles.row} >
          <View style={styles.box} >
            <Text style={styles.label} >Change 1h:</Text>
            <Text style={styles.value}>{fmtPrc.format(percentChange1h / 100)}</Text>
          </View>
          <View style={styles.box} >
            <Text style={styles.label} >Change 24h:</Text>
            <Text style={styles.value}>{fmtPrc.format(percentChange24h / 100)}</Text>
          </View>
        </View>
        <View style={styles.row} >
          <View style={styles.box} >
            <Text style={styles.label} >Volume:</Text>
            <Text style={styles.value}>{fmtUs.format(volumeUsd)}</Text>
          </View>
          <View style={styles.box} >
            <Text style={styles.label} >Market Cap:</Text>
            <Text style={styles.value}>{fmtUs.format(marketCapUsd)}</Text>
          </View>
        </View>
        <View style={styles.row} >
          <View style={styles.box} >
            <Text style={styles.label} >Total Supply:</Text>
            <Text style={styles.value}>Ƀ{fmtNum.format(totalSupply)}</Text>
          </View>
          <View style={styles.box} >
            <Text style={styles.label} >Max Supply:</Text>
            <Text style={styles.value}>Ƀ{fmtNum.format(maxSupply)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  ...xstyles,
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.steel,
    paddingBottom: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  bullet: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.banner,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { height: 0.5, width: 0.5 },
    shadowOpacity: 0.25,
    shadowColor: '#222',
    marginRight: 10,
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    flex: 1,
    ...Fonts.style.normal,
    fontSize: 24,
    fontWeight: '600',
  },
  symbol: {
    color: Colors.banner,
    fontWeight: '500',
    marginRight: 10,
  },
  box: {
    flex: 1,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 13,
    color: Colors.charcoal,
  },
  value: {
    ...Fonts.style.normal,
    fontSize: Platform.OS === 'ios' ? 16.5 : 14.5,
    fontWeight: '600',
  }, 
};
