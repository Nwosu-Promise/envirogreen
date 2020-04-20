import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Image, TextInput,ScrollView } from 'react-native';

import Slider from 'react-native-slider';

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
import { theme, mocks } from '../constants';

// TODO 2:34:35

const SettingsScreen = (props) => {
  let usernmae;
  const { profile, categories } = props;
  const [budget, setBudget] = useState(850);
  const [monthlyCap, setMonthlyCap] = useState(1700);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    return setUserProfile(profile);
  });
  // compnentDidMount() {
  //   setUserProfile(profile)
  // }

  const editHandler = (name, text) => {
    userProfile[name] = text;
    setUserProfile(userProfile);
  };
  const toggleEditHandler = (name) => {
    const editBoolean = !isEditing ? name : null;
    // console.log(editBoolean);

    setIsEditing(editBoolean);
  };
  const renderEditHandler = (name) => {
    if (isEditing === name) {
      console.log(userProfile[name]);
      return (
        <TextInput
          defaultValue={userProfile[name]}
          onChangeText={(text) => editHandler([name], text)}
        />
      );
    }
    return <Text bold>{userProfile[name]}</Text>;
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Settings
        </Text>
        <Button>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Username
              </Text>
              {renderEditHandler('username')}
              {/* <Text bold> {profile.username}</Text> */}
            </Block>
            <Text
              medium
              secondary
              onPress={() => toggleEditHandler('username')}
            >
              {isEditing === 'username' ? 'Save' : 'Edit'}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Location
              </Text>
              {renderEditHandler('location')}

              {/* <Text bold>{profile.location}</Text> */}
            </Block>
            <Text
              medium
              secondary
              onPress={() => toggleEditHandler('location')}
            >
              {isEditing === 'location' ? 'Save' : 'Edit'}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                E-mail
              </Text>
              <Text bold>{profile.email}</Text>
            </Block>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

        <Block style={styles.slider}>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Budget
            </Text>
            {/* slider */}
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157,163,180,0.1)"
              value={budget}
              onValueChange={(value) => setBudget(value)}
            />
            <Text caption right gray>
              $1,000
            </Text>
          </Block>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157,163,180,0.1)"
              value={monthlyCap}
              onValueChange={(value) => setMonthlyCap(value)}
            />
            {/* <Text caption right gray>${monthlyCap.toFixed(0)} </Text> */}
            <Text caption right gray>
              $5,000{' '}
            </Text>
          </Block>
        </Block>

        <Divider />

        <Block style={styles.toggles}>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text gray2>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
            ></Switch>
          </Block>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text gray2>Newsletter</Text>
            <Switch
              value={newsletter}
              onValueChange={(value) => setNewsletter(value)}
            ></Switch>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

SettingsScreen.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  slider: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});

export default SettingsScreen;
