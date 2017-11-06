import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Button } from 'react-native';
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

const NewButton = (navigation) => {
  return (
    <TouchableOpacity title='New' onPress={() => navigation.navigate('NewDeck')} style={styles.newButton}>
      <Text style={styles.newButtonText}>New</Text>
    </TouchableOpacity>
  )
}

const HomeButton = (navigation, screen) => {

  return {
    header: () =>
    <View style={styles.homeView}>
      <TouchableOpacity onPress={() => screen ? navigation.navigate( screen ) : navigation.goBack()} style={styles.homeButton}>
        <Entypo name='home' style={styles.homeGlyph} />
      </TouchableOpacity>
    </View>
  }
}

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({navigation}) => ({
      title: 'Decks',
      headerRight: NewButton(navigation),
      ...stackDefaults,
      headerLeft: null
    })
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: ({navigation}) => ({
      ...HomeButton(navigation, 'DeckList'),
      ...stackDefaults
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: ({navigation}) => ({
      ...HomeButton(navigation, 'DeckList'),
      ...stackDefaults
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      ...stackDefaults
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      ...HomeButton(navigation),
      ...stackDefaults
    })
  }
});

export default class Views extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Bar backgroundColor={red} barStyle="light-content"/>
        <Stack />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 33,
    height: 33,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: white,
    borderColor: lightRed,
    marginLeft: 12
  },
  homeGlyph: {
    color: red,
    fontSize: 20
  },
  newButton: {
    marginRight: 17,
    backgroundColor: red,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4
  },
  newButtonText: {
    color: white
  }
});
