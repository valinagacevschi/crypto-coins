import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
import Product from '../Components/Product';
// Styles
import styles from './Styles/ProductsScreenStyle';

class ProductsScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header noBack title='Trends' />
        <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.products}
          renderItem={({ item, index }) => <Product {...item} index={index} />}
        />
      </View>
    );
  }
}

ProductsScreen.contextTypes = {
  goTo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: state.products.payload,
});

export default connect(mapStateToProps)(ProductsScreen);
