import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
import Latest from '../Components/Latest';
import TransactionVolumeGraph from '../Components/TransactionVolumeGraph';
// Styles
import xstyles from './Styles/GraphScreenStyle';

class GraphScreen extends Component {
  render() {
    const { id, index } = this.props.navigation.state.params;
    let colorOffset = index - 6;
    if (index < 3) colorOffset = 8 + index;
    else if (index < 6) colorOffset = 1 + index;
    return (
      <View style={styles.mainContainer}>
        <Header title={`${id}`} />
        <View style={styles.container} >
          <View style={styles.label} >
            <Latest id={id} style={styles.title} />
          </View>
          <TransactionVolumeGraph products={[id]} colorOffset={colorOffset} />
        </View>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    flex: 1, 
    justifyContent: 'space-around',
  },
  label: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  }
};

const mapStateToProps = (state) => ({
  prices: state.prices,
  getData: (id) => state.prices[id],
});

export default connect(mapStateToProps)(GraphScreen);
