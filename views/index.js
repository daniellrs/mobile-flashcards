import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import DeckList from './DeckList';
import IndividualDeck from './IndividualDeck';
import Quiz from './Quiz';
import NewDeck from './NewDeck';
import NewQuestion from './NewQuestion';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { red, pink, white, grey, lightRed, blackShadow } from '../utils/colors';
import { Entypo } from '@expo/vector-icons';

const stackDefaults = {
  headerTintColor: red,
  headerStyle: {
    backgroundColor: grey,
    borderBottomWidth: 1,
    borderBottomColor: red
  }
}

const homeButton = (navigation) => {

  return {
    header: () =>
    <View style={styles.homeView}>
      <Entypo name='home' onPress={() => navigation.goBack()} style={styles.homeButton} />
    </View>
  }
}

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
      ...stackDefaults
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: ({navigation}) => ({
      ...homeButton(navigation),
      ...stackDefaults
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      ...stackDefaults
    }
  }
});

export default class Views extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Bar backgroundColor={red} barStyle="light-content"/>
        <Stack />
        {/* <DeckList /> */}
        {/* <IndividualDeck /> */}
        {/* <Quiz /> */}
        {/* <NewDeck /> */}
        {/* <NewQuestion /> */}
      </View>
    );
  }
}

const Bar = ({
  backgroundColor,
  ...props
}) => {
  return (
    <View style={{
      backgroundColor,
      height: Constants.statusBarHeight
    }}>
      <StatusBar animated={true} translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  homeView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: red,
    padding: 3
  },
  homeButton: {
    color: red,
    fontSize: 20,
    marginLeft: 12,
    padding: 5,
    backgroundColor: blackShadow,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: lightRed
  }
});
