import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import { Button, Text, Block, Input } from '../components';
import { theme } from '../constants';

const VALID_EMAIL = 'admin@okenna.io';
const VALID_PASSWORD = 'password';

const LoginScreen = (props) => {
  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = () => {
    const { navigation } = props;

    Keyboard.dismiss();
    setIsLoading(true);
    const newError = [];

    // to check the activity indicator
    // setTimeout(() => {

    // checking with an Api or static data
    if (email !== VALID_EMAIL) {
      newError.push('email');
    } else if (password !== VALID_PASSWORD) {
      newError.push('password');
    }

    setErrors(newError);
    setIsLoading(false);
    if (!newError.length) {
      navigation.navigate('Browse');
    }
    // }, 2000);
  };

  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView style={styles.login} behavior="height">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Login
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            secure
            error={hasErrors('password')}
            label="Password"
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button gradient onPress={loginHandler}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>
          <Button onPress={() => props.navigation.navigate('Forgot')}>
            <Text gray caption center style={styles.forgotText}>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  forgotText: {
    textDecorationLine: 'underline',
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

export default LoginScreen;
