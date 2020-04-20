import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// TODO continue from 1:04:44 -- PlantApp
// TODO continue from 28:05 -- HTGAWM

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import Navigation from './navigation';
import { Block } from './components';
import * as constants from './constants';

// importing all the images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/avatar.png'),
];

const App = (props) => {
  // TODO enable before building
  console.disableYellowBox =true;
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const resourceHandler = async () => {
    // caching all the images
    //  for better app performance
    const cacheIamges = images.map((image) => {
      return Asset.fromModule(image).downloadAsync(); // Asset.formModule(image).downloadAsync();
    });

    Promise.all(cacheIamges);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={resourceHandler}
        onError={(error) => console.warn(error)}
        onFinish={() => {
          setIsLoadingComplete(true);
        }}
      />
    );
  }
  return (
    <Block white>
      <Navigation />
    </Block>
  );
};

export default App;
