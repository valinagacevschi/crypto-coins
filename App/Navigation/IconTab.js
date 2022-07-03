import React from 'react';
import { View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

// import xstyles from './Styles/IconTabStyle';
import { Colors } from '../Themes';

const IconTab = props => (
  <View style={[styles.tabButton, props.focused && styles.tabSelected]}>
    <Icon
      name={props.name || 'star'}
      style={[styles.icon, props.focused && styles.iconSelected]}
    />
    {props.value && props.value !== '0' && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{props.value}</Text>
      </View>
    )}
  </View>
);

const styles = {
  //...xstyles,
  tabButton: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 9 : 0,
  },
  tabSelected: {
  },
  icon: {
    flex: 1,
    color: Colors.steel,
    marginTop: Platform.OS === 'ios' ? 0 : 3,
    fontSize: Platform.OS === 'ios' ? 28 : 22,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  iconSelected: {
    color: Colors.snow,
    ...Platform.select({
      ios: {
        marginTop: -2,
        fontSize: 32,
      },
      android: {
        fontSize: 26,
        marginTop: 0,
      }
    }),
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    backgroundColor: Colors.transparent
  }
};

export default IconTab;
