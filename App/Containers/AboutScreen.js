import React, { Component } from 'react';
import { View, ScrollView, Text, Linking, TouchableOpacity, Alert } from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import Header from '../Components/Header';
// Styles
import xstyles from './Styles/AboutScreenStyle';
import { Colors, Fonts } from '../Themes';

export default class AboutScreen extends Component {
  onPressOpen = (title, link) => {
    Alert.alert(
      title,
      'Open home page in browser ?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => Linking.openURL(link) }
      ]
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header title='About CryptoCoins' />

        <ScrollView style={styles.container} >
          <Text style={styles.text} >
            This was another week-end project which evolved into a more serious
            mobile application. 
          </Text>
          <Text style={styles.text} >
            Permanent access to real-time quotations of 3 most important crypto-currencies
            in your prefferd base currency is its main feature.
          </Text>
          <Text style={styles.text} >
            You have access to the entire list of all known crypto-currencies
            with detailed, up-to-date, specific information.
          </Text>
          <Text style={styles.heading} >Disclaimer</Text>
          <Text style={styles.text} >
            All information exhibited in the application are collected from the below-listed, 
            well-known crypt-currencies data sources.
          </Text>
          <Text style={styles.text} >
            Should you decide to invest or trade crypto-currencies based on the information 
            from CryptoCoins mobile application, it's your sole decision and responsibility.
          </Text>
          <Text style={styles.text} >
            The creator of the mobile application and the company which facilitatea
            the aplication release will not be held responsible for any loss or damage
            you may incur while investing or trading crypto-currencies.
          </Text>
          <Text style={styles.heading} >Data Sources</Text>
          <View style={{ marginBottom: 30 }} >
            <TouchableOpacity onPress={() => this.onPressOpen('GDAX', 'https://www.gdax.com/')}>
              <Text style={styles.link} >GDAX</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressOpen('CoinMarketCap', 'https://coinmarketcap.com/')}>
              <Text style={styles.link} >CoinMarketCap</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressOpen('CryptoCompare', 'https://cryptocompare.com/')}>
              <Text style={styles.link} >CryptoCompare</Text>
            </TouchableOpacity>
          </View>  
        </ScrollView>

      </View>
    );
  }
}


const styles = {
  ...xstyles,
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 10,
  },
  text: {
    ...Fonts.style.input,
    paddingBottom: 10,
  },
  heading: {
    ...Fonts.style.h5
  },
  link: {
    ...Fonts.style.input,
    color: Colors.banned,
    paddingTop: 7.5,
  },
};
