import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import WelcomeScreen from '../screens/welcome';
import BrowseScreen from '../screens/browse';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';
import ForgotScreen from '../screens/forgot';
import ProductScreen from '../screens/product';
import ExploreScreen from '../screens/explore';
import SettingsScreen from '../screens/settings';
import { theme } from '../constants';

const screens = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Forgot: ForgotScreen,
    Explore: ExploreScreen,
    Browse: BrowseScreen,
    Product: ProductScreen,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white,
        borderBottomColor: 'transparent',
        elevation: 0,
      },
      headerBackImage: <Image source={require('../assets/icons/back.png')} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: theme.sizes.base * 1.2,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: theme.sizes.base,
      },
    },
  }
);

export default createAppContainer(screens);
