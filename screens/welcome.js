import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Modal,
  ScrollView,
} from "react-native";

// TODO fix the signup botton 

import { Button, Text, Block } from "../components";
import { theme } from "../constants";

const WelcomeScreen = (props) => {
  const [extraData, setExtraData] = useState();
  const [showTerms, setShowTerms] = useState(false);
  const { width, height } = Dimensions.get("window");

  const scrollX = new Animated.Value(0);

  const renderIllustrations = () => {
    const { illustrations } = props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraData={extraData}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: scrollX } },
          },
        ])}
      />
    );
  };

  const renderSteps = () => {
    const { illustrations } = props;
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });
          return (
            <Block
              animated
              flex={false}
              key={`step=${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  };

  const rederTermsServiceHandler = () => {
    return (
      <Modal animationType="slide" visible={showTerms}>
        <Block
          space="between"
          padding={[theme.sizes.padding, theme.sizes.padding * 2]}
        >
          <Text h2 light>
            Terms of Service
          </Text>
          <ScrollView style={{paddingVertical: theme.sizes.padding}}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
          <Button
            gradient
            onPress={() => {
              setShowTerms(false);
            }}
          >
            <Text center white>
              I understand
            </Text>
          </Button>
        </Block>
      </Modal>
    );
  };
  return (
    <Block>
      <Block center bottom flex={0.4} >
        <Text h1 center bold>
          Your Home.
          <Text h1 primary>
  {" "}Greener.
          </Text>
        </Text>
        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Enjoy the experience.
        </Text>
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button
          gradient
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button
          shadow
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text center semibold>
            Signup
          </Text>
        </Button>
        <Button
          onPress={() => {
            setShowTerms(true);
          }}
        >
          <Text center caption gray>
            Terms of service
          </Text>
        </Button>
      </Block>
      {rederTermsServiceHandler()}
    </Block>
  );
};

WelcomeScreen.navigationOptions = {
  header: null,
};

WelcomeScreen.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") },
  ],
};

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});

export default WelcomeScreen;
