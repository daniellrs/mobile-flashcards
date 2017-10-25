import React, {Component} from 'react';
import { View, Image, StatusBar, StyleSheet } from 'react-native';
import DeckList from './DeckList';
import IndividualDeck from './IndividualDeck';
import Quiz from './Quiz';
import NewDeck from './NewDeck';
import NewQuestion from './NewQuestion';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { red } from '../utils/colors';

export default class Views extends Component {

  render() {

    return (
      <Image style={styles.backgroundImage} source={require('../img/fundo.png')}>
        <Bar backgroundColor={red} barStyle="light-content"/>
        {/* <DeckList /> */}
        {/* <IndividualDeck /> */}
        <Quiz />
        {/* <NewDeck /> */}
        {/* <NewQuestion /> */}
      </Image>
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
  backgroundImage: {
      flex:1,
      width: '100%',
      height: '100%',
  }
});
