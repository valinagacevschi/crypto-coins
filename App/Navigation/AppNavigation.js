import React from 'react';
import { Platform } from 'react-native';
import { NavigationActions, StackNavigator, TabNavigator } from 'react-navigation';
import AboutScreen from '../Containers/AboutScreen';
import SettingsScreen from '../Containers/SettingsScreen';
import ProductsScreen from '../Containers/ProductsScreen';
import GraphScreen from '../Containers/GraphScreen';
import CoinsScreen from '../Containers/CoinsScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import IconTab from './IconTab';

// import styles from './Styles/NavigationStyles';
import { Colors, Metrics } from '../Themes';

const HomeStack = StackNavigator({
    home: { screen: LaunchScreen },
  }, {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name='bitcoin' {...props} />
    }
  });

const ProductsStack = StackNavigator({
    products: { screen: ProductsScreen },
    graph: { screen: GraphScreen },
  }, {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name='graph-trend' {...props} />
    }
  });

const CoinsStack = StackNavigator({
    coins: { screen: CoinsScreen },
  }, {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name='results' {...props} />
    }
  });

const SettingsStack = StackNavigator({
    settings: { screen: SettingsScreen },
    about: { screen: AboutScreen },
  }, {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: props => <IconTab name='widget' {...props} />
    }
  });

const PrimaryNav = TabNavigator({
  home: { screen: HomeStack },
  products: { screen: ProductsStack },
  coins: { screen: CoinsStack },
  settings: { screen: SettingsStack },
}, {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    lazy: false,
    backBehavior: 'initialRoute',
    headerMode: 'none',
    scrollEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: false,
      showLabel: false,
      showIcon: true,
      upperCaseLabel: false,
      tabStyle: {
        backgroundColor: Colors.banner,
        margin: 0,
        ...Platform.select({
          ios: { 
            padding: 0,
          },
          android: { 
            height: Metrics.tabBarHeight - 7.5, 
            padding: Metrics.baseMargin,
          }
        }),
      },
      style: {
        backgroundColor: Colors.banner,
        shadowColor: 'rgb(100,100,100)',
        shadowOffset: { height: -2, width: 0 },
        shadowOpacity: 0.5,
      },
      indicatorStyle: {
        borderBottomColor: Colors.snow,
        borderBottomWidth: 2
      },
      navigationOptions: {},
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
        const { route, focused, index } = scene;
        if (!focused) {
          if (route.index > 0) {
            const tabRoute = route.routeName;
            const { routeName, key } = route.routes[0];
            navigation.dispatch(
              NavigationActions.navigate({ routeName: tabRoute })
            );
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key,
                actions: [
                  NavigationActions.navigate({ routeName })
                ]
              })
            );
          } else {
            jumpToIndex(index);
          }
        }
      },
    }),
  }
);

export default PrimaryNav;
