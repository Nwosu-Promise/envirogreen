import React, { useState, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Badge, Button, Block, Text, Input,  } from '../components';
import { theme, mocks } from '../constants';
// import { ScrollView } from 'react-native-gesture-handler';
// import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

// TODO 3:51:11  s05e3 37:12
// FIXME Fix the error on the navtab
// TODO Work on this on the categories shadow for android using the Platform API

const ExploreScreen = (props) => {
  const [searchText, setSearchText] = useState(null);
  const [searchFocus, setSearchFocus] = useState(new Animated.Value(0.6));

  const searchFocusHandler = (status) => {
    Animated.timing(searchFocus, {
      toValue: status ? 0.8 : 0.6, // increase flex size when the status is true
      duration: 150, // ms
    }).start();
  };

  const renderSearchHandler = () => {
    const isEditing = searchFocus && searchText;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => searchFocusHandler(true)}
          onBlur={() => searchFocusHandler(false)}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onRightPress={() => (isEditing ? setSearchText(null) : null)}
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon
              name={isEditing ? 'close' : 'search'}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  };

  const renderImageHandler = (img, index) => {
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - theme.sizes.padding * 2.5;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;
    return (
      <TouchableOpacity
        key={`img-${index}`}
        // style={[styles.image, styles.mainImage]}
        onPress={() => props.navigation.navigate('Product')}
      >
        <Image
          source={img}
          style={[styles.image, { minWidth: imgWidth, maxWidth: imgWidth }]}
        />
      </TouchableOpacity>
    );
  };

  const renderExploreHandler = () => {
    const { images, navigation } = props;
    const mainImage = images[0];

    return (
      <Block style={{ marginBottom: height / 3 }}>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => navigation.navigate('Product')}
        >
          <Image source={mainImage} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <Block row space="between" wrap>
          {images.slice(1).map((img, index) => renderImageHandler(img, index))}
        </Block>
      </Block>
    );
  };

  const renderFooterHandler = () => {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Explore
        </Text>
        {renderSearchHandler()}
      </Block>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
        {renderExploreHandler()}
      </ScrollView>
      {renderFooterHandler()}
    </Block>
  );
};

ExploreScreen.defaultProps = {
  images: mocks.explore,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142,142,147,0.06)',
    borderColor: 'rgba(142,142,147,0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  },
});

export default ExploreScreen;
