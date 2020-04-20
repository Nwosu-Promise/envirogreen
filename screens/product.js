import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Button,
  Text,
  Block,
  Input,
  Card,
  Badge,
  Divider,
  Switch,
} from '../components';
import Icon from 'react-native-vector-icons/Entypo';

import { theme, mocks } from '../constants';
// TODO 3:50:35

const { width, height } = Dimensions.get('window');

const ProductScreen = (props) => {
  // const {product} = props;

  const renderGalleryHandler = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnableditem
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Image source={item} resizeMode="contain" style={{ width, height: height/2.8}} />
        )}
      />
    );
  };

  const { product } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderGalleryHandler()}
      <Block style={styles.product}>
        <Text h2 bold>
          {product.name}
        </Text>
        <Block flex={false} row margin={[theme.sizes.base, 0]}>
          {product.tags.map((tag) => (
            <Text key={`tag-${tag}`} gray caption style={styles.tag}>
              {tag}
            </Text>
          ))}
        </Block>
        <Text gray height={22} light align="">
          {product.description}
        </Text>
        <Divider margin={[theme.sizes.padding * 0.9, 0]} />
        <Block>
          <Text semibold>Gallery</Text>
          <Block row margin={[theme.sizes.padding * 0.9, 0]}>
            {product.images.slice(1, 3).map((image, index) => (
              <Image
                key={`gallery-${index}`}
                source={image}
                style={styles.image}
              />
            ))}
            <Block
              flex={false}
              card
              center
              middle
              color="rgba(197,204,214,0.20)"
              style={styles.more}
            >
              <Text gray>+{product.images.slice(3).length}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

ProductScreen.navigationOptions = ({ navData }) => {
  return {
    headerRight: (
      <Button onPress={() => {}}>
        <Icon name="dots-three-horizontal" color={theme.colors.gray} />
      </Button>
    ),
  };
};

ProductScreen.defaultProps = {
  product: mocks.products[0],
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base ,
    paddingHorizontal: theme.sizes.base ,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.25,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
});

export default ProductScreen;
