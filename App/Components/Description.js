import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as d3 from 'd3';

import SettingsActions from '../Redux/SettingsRedux';
import { chartValues } from '../Transforms';

import xstyles from './Styles/DescriptionStyle';
import { Colors } from '../Themes';

class Description extends Component {

  render() {
    const { times, prices, running } = this.props;
    const [start, end] = d3.extent(times);
    let counts = null;
    let text = 'Start real-time data streaming...';
    if (start) {
      counts = chartValues(prices).map(value => {
        const keys = Object.keys(value).filter(k => k !== 'time');
        return keys.reduce((sum, k) => sum + value[k], 0);
      });
      text = `Avg. ${(d3.mean(counts) || 0).toFixed(1)} trans. every 3 sec.`
    }
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.bottom]}>
          <Text style={styles.text} >{text}</Text>
          <TouchableOpacity style={styles.button} onPress={() => (running ? this.props.stop() : this.props.start())}>
            <Icon
              name={running ? 'stop' : 'play'}
              color={Colors.snow}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // borderColor: 'red',
    // borderWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    // alignSelf: 'center',
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: Colors.banner,
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { height: 0.5, width: 0.5 },
    shadowOpacity: 0.25,
    shadowColor: '#222',    
  },
  buttonText: {
    color: Colors.snow,
    fontSize: 18,
  }
  
};

const mapStateToProps = state => ({
  running: state.settings.running,
  prices: state.prices,
  times: Object.values(state.prices)
    .reduce((arr, { values }) => arr.concat(values), [])
    .map(({ time }) => time),
});

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(SettingsActions.startBackgroundTask()),
  stop: () => dispatch(SettingsActions.stopBackgroundTask()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
