import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';

import { Button, Text, Block, Input } from '../components';
import { theme } from '../constants';

const SignupScreen = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const signupHandler = () => {
    const { navigation } = props;

    Keyboard.dismiss();
    setIsLoading(true);
    const newError = [];

    // checking with an Api or static data
    if (!email) newError.push('email');
    if (!password) newError.push('password');
    if (!username) newError.push('email');

    setErrors(newError);
    setIsLoading(false);
    if (!newError.length) {
      //   navigation.navigate("Browse");
      Alert.alert(
        'Success!',
        'Your account has been created!',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Browse');
            },
          },
        ]
        // { cancelable: false }
      );
    }
  };

  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView style={styles.signup} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Sign Up
        </Text>
        <Block middle>
          <Input
            email
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label="Username"
            error={hasErrors('username')}
            style={[styles.input, hasErrors('username')]}
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Button gradient onPress={signupHandler}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Sign Up
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
  signup: {
    flex: 1,
    justifyContent: 'center',
    //  alignItems: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginText: {
    textDecorationLine: 'underline',
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

export default SignupScreen;
