import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native';
import { G, Path } from 'react-native-svg';
import * as d3 from 'd3';

// import styles from './Styles/StreamGraphStyle';

export default class StreamGraph extends Component {
  render() {
    const { keys, values, width, height } = this.props;
    const stack = d3.stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetSilhouette);
    const series = stack(values);
    if (!series.length) {
      return null;
    }

    const colors = this.props.colors || d3.schemeCategory20c;
    const colorOffset = this.props.colorOffset || 0;

    const y = d3.scaleLinear()
        .domain([
          d3.min(series[0].map(([y0, y1]) => y0)),
          d3.max(series[series.length - 1].map(([y0, y1]) => y1))
        ])
        .range([0, height]);
    
    const x = d3.scaleLinear()
        .domain(d3.extent(values.map(v => v.time)))
        .range([0, width]);

    const area = d3.area()
      .y0(([y0, y1]) => y(y0))
      .y1(([y0, y1]) => y(y1))
      .x(({ data }) => x(data.time));

    return (
      <G>
        {series.map((s, i) => area(s) &&
          <Path 
            d={area(s)}
          fill={colors[colorOffset + i]}
            key={keys[i]} 
          />
        )}
      </G>
    );
  }
}
