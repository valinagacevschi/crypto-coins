import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import xstyles from './Styles/ProductStyle';
import { Icons, Colors, Fonts, fontello} from '../Themes';

export default class Product extends Component {
  render() {
    const {
      id,
      index,
      baseCurrency,
      quoteCurrency,
      displayName,
    } = this.props;
    let icon = `${baseCurrency.toLowerCase()}-alt`;
    if (!fontello.glyphs.includes(icon)) {
      icon = 'zeit-alt';
    }

    return (
      <TouchableOpacity onPress={() => this.context.goTo('graph', { id, index })}>
        <View style={styles.row} >
          <View style={[styles.bullet, { backgroundColor: Colors[quoteCurrency] }]} >
            <Icons name={icon} size={18} color={Colors.snow} />
          </View>
          <Text style={styles.name} >{displayName}</Text>
          <Icon name='line-chart' color={Colors.charcoal} size={18} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  ...xstyles,
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: Colors.steel,
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  bullet: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.steel,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { height: 0.5, width: 0.5 },
    shadowOpacity: 0.25,
    shadowColor: '#222',
    marginRight: 10,
  },
  name: {
    flex: 1,
    ...Fonts.style.normal,
    fontWeight: '600',
  },
};

Product.contextTypes = {
  goTo: PropTypes.func,
};
