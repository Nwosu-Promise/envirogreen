import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Button, Text, Block, Input, Card, Badge } from '../components';
import { theme, mocks } from '../constants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// TODO 3:04:56  s05e3 08:40
// FIXME Fix the error on the navtab
// TODO Work on this on the categories shadow for android using the Platform API

const BrowseScreen = (props) => {
  const [isActive, setIsActive] = useState('Products');
  const [tabCategories, setTabCategories] = useState([]);
  const { profile, categories } = props;
  const tabs = ['Products', 'Inspirations', 'Shop'];

  useEffect(() => {
    setTabCategories(categories);
  });

  const tabHandler = (tab) => {
    // const { categories } = props;
    // prettier-ignore
    const filteredCategories = categories.filter((category) => category.tags.includes(tab.toLowerCase()));
    // console.log(filteredCategories)
    setTabCategories(filteredCategories);
    setIsActive(tab);
  };

  const renderTabHandler = (tab) => {
    const activeTab = isActive === tab;
    console.log(isActive);

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => tabHandler(tab)}
        style={[styles.tab, activeTab ? styles.active : null]}
      >
        <Text size={16} medium gray={!activeTab} secondary={activeTab}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Browse{' '}
        </Text>
        <Button onPress={() => props.navigation.navigate('Settings')}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <Block flex={false} row style={styles.tabs}>
        {tabs.map((tab) => renderTabHandler(tab))}
      </Block>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} row space="between" style={styles.categories}>
          {tabCategories.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => {
                props.navigation.navigate('Explore', { category });
              }}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.2)"
                >
                  <Image source={category.image} />
                </Badge>
                <Text medium height={20}>
                  {category.name}
                </Text>
                <Text gray caption>
                  {category.count} products
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

BrowseScreen.defaultProps = {
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
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomColor: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // should be dynamic i.e based on screen width
    width: 150,
    height: 150,
  },
});

export default BrowseScreen;

// import React, { Component } from "react";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// import { Card, Badge, Button, Block, Text } from "../components";
// import { theme, mocks } from "../constants";

// const { width } = Dimensions.get("window");

// class Browse extends Component {
//   state = {
//     active: "Products",
//     categories: []
//   };

//   componentDidMount() {
//     this.setState({ categories: this.props.categories });
//   }

//   handleTab = tab => {
//     const { categories } = this.props;
//     const filtered = categories.filter(category =>
//       category.tags.includes(tab.toLowerCase())
//     );

//     console.log('\n\n\n\n');

//     console.log('starting');

//     console.log(filtered)
//     console.log('Active next');

//     console.log(tab);
//     console.log('End run')

//     this.setState({ active: tab, categories: filtered });
//   };

//   renderTab(tab) {
//     const { active } = this.state;
//     const isActive = active === tab;

//     return (
//       <TouchableOpacity
//         key={`tab-${tab}`}
//         onPress={() => this.handleTab(tab)}
//         style={[styles.tab, isActive ? styles.active : null]}
//       >
//         <Text size={16} medium gray={!isActive} secondary={isActive}>
//           {tab}
//         </Text>
//       </TouchableOpacity>
//     );
//   }

//   render() {
//     const { profile, navigation } = this.props;
//     const { categories } = this.state;
//     const tabs = ["Products", "Inspirations", "Shop"];

//     return (
//       <Block>
//         <Block flex={false} row center space="between" style={styles.header}>
//           <Text h1 bold>
//             Browse
//           </Text>
//           <Button onPress={() => navigation.navigate("Settings")}>
//             <Image source={profile.avatar} style={styles.avatar} />
//           </Button>
//         </Block>

//         <Block flex={false} row style={styles.tabs}>
//           {tabs.map(tab => this.renderTab(tab))}
//         </Block>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={{ paddingVertical: theme.sizes.base * 2 }}
//         >
//           <Block flex={false} row space="between" style={styles.categories}>
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.name}
//                 onPress={() => navigation.navigate("Explore", { category })}
//               >
//                 <Card center middle shadow style={styles.category}>
//                   <Badge
//                     margin={[0, 0, 15]}
//                     size={50}
//                     color="rgba(41,216,143,0.20)"
//                   >
//                     <Image source={category.image} />
//                   </Badge>
//                   <Text medium height={20}>
//                     {category.name}
//                   </Text>
//                   <Text gray caption>
//                     {category.count} products
//                   </Text>
//                 </Card>
//               </TouchableOpacity>
//             ))}
//           </Block>
//         </ScrollView>
//       </Block>
//     );
//   }
// }

// Browse.defaultProps = {
//   profile: mocks.profile,
//   categories: mocks.categories
// };

// export default Browse;

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: theme.sizes.base * 2
//   },
//   avatar: {
//     height: theme.sizes.base * 2.2,
//     width: theme.sizes.base * 2.2
//   },
//   tabs: {
//     borderBottomColor: theme.colors.gray2,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     marginVertical: theme.sizes.base,
//     marginHorizontal: theme.sizes.base * 2
//   },
//   tab: {
//     marginRight: theme.sizes.base * 2,
//     paddingBottom: theme.sizes.base
//   },
//   active: {
//     borderBottomColor: theme.colors.secondary,
//     borderBottomWidth: 3
//   },
//   categories: {
//     flexWrap: "wrap",
//     paddingHorizontal: theme.sizes.base * 2,
//     marginBottom: theme.sizes.base * 3.5
//   },
//   category: {
//     // this should be dynamic based on screen width
//     minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
//     maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
//     maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
//   }
// });
