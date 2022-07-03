import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import xstyles from './Styles/HeaderStyle';
import { Colors } from '../Themes';

export default class Header extends Component {
  render() {
    const { title, noBack, leftButton, rightButton } = this.props;
    const paddingRight = (!noBack !== !!rightButton) ? 40 : 0;
    return (
      <View style={styles.container}>
        {!noBack &&
          <TouchableHighlight style={styles.back} onPress={() => this.context.goBack()} >
            <Icon
              name='arrow-left'
              color={Colors.snow}
              size={24}
              style={styles.icon}
            />
          </TouchableHighlight>}
        {!!leftButton &&
          <TouchableHighlight style={styles.back} onPress={this.props.onLeftPress} >
            <Icon
              name={leftButton}
              color={Colors.snow}
              size={24}
              style={styles.icon}
            />
          </TouchableHighlight>}
        <Text style={[styles.title, { paddingRight }]}>
          {title}
        </Text>
        {!!rightButton &&
          <TouchableHighlight style={styles.back} onPress={this.props.onRightPress} >
            <Icon
              name={rightButton}
              color={Colors.snow}
              size={24}
              style={styles.icon}
            />
          </TouchableHighlight>}
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    backgroundColor: Colors.banner,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
    shadowColor: 'rgb(100,100,100)',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.5,
  },
  back: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 18,
  }
};

Header.contextTypes = {
  goBack: PropTypes.func,
};
