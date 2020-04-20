import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert, Keyboard } from "react-native";

import { Button, Text, Block, Input } from "../components";
import { theme } from "../constants";

const VALID_EMAIL = "admin@okenna.io";
const ForgotScreen = (props) => {
  const [email, setEmail] = useState(VALID_EMAIL);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordHandler = () => {
    const { navigation } = props;

    Keyboard.dismiss();
    setIsLoading(true);
    const newError = [];

    // checking with an Api or static data
    if (email !== VALID_EMAIL) {
      newError.push("email");
    }

    setErrors(newError);
    setIsLoading(false);
    if (!newError.length) {
      //   navigation.navigate("Browse");
      Alert.alert(
        "Password sent!",
        "Please check your email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
        Alert.alert(
            "Error",
            "Please check your email address.",
            [
              {
                text: "Try again"
              },
            ],
            { cancelable: false }
          );
    }
  };

  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Forgot
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Button gradient onPress={forgotPasswordHandler}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Forgot
              </Text>
            )}
          </Button>
          <Button onPress={() => props.navigation.goBack()}>
            <Text gray caption center style={styles.loginText}>
              Back to Login
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center",
    //  alignItems: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginText: {
    textDecorationLine: "underline",
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

export default ForgotScreen;
