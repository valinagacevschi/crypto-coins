import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CoinsActions from '../Redux/CoinsRedux';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Coin from '../Components/Coin';
// Styles
import xstyles from './Styles/CoinsScreenStyle';

class CoinsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: props.coins
    };
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.coins) {
      this.setState({ coins: newProps.coins });
    }
  }

  onPress = () => {
    console.log('Press');
  }

  renderItem = ({ item }) => (
    <Coin {...item} onPress={() => this.onPress(item.id)} />
  );

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header noBack title='Crypto Currencies' />
        <SearchBar
          showOnLoad
          autoCorrect={false}
          ref={ref => (this.searchBar = ref)}
          data={this.props.coins || []}
          handleResults={coins => this.setState({ coins })}
        />
        <FlatList 
          // contentContainerStyle={{ flex: 1, borderColor: 'red', borderWidth: 1 }}
          onRefresh={() => this.props.loadCoins()}
          refreshing={this.props.refreshing}              
          keyExtractor={(item, index) => index}
          data={this.state.coins}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
const styles = {
  ...xstyles,
};

CoinsScreen.contextTypes = {
  goTo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  coins: state.coins.payload,
  refreshing: !!state.coins.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  loadCoins: () => dispatch(CoinsActions.coinsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinsScreen);
