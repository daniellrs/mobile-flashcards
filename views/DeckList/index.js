import React, {Component} from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Deck from '../../components/Deck';
import { red, white, grey } from '../../utils/colors';
import { getDecks, removeDecks } from '../../utils/asyncStorage';

export default class DeckList extends Component {
  state = {
    decks: {}
  }

  componentDidMount() {
    getDecks().then(decks => this.setState({decks: decks ? decks : {}}));
  }

  openDeck = ( title ) => {
    const { navigation } = this.props;

    navigation.navigate('IndividualDeck', { title });
  }

  countCards = ( deck ) => {

    if( !deck.questions ) {
      return 0;
    }

    return deck.questions.length;
  }

  render() {
    const { decks } = this.state;

    return (
      <ScrollView style={{backgroundColor: grey}}>

        <View style={styles.container}>
          {Object.keys(decks).length === 0 && (
            <Text style={styles.noDeck}>No deck added yet</Text>
          )}
          {Object.keys(decks).map( key => (
            <Deck key={key} onPress={() => this.openDeck(key)} title={key} cards={this.countCards( decks[key] )} />
          ))}

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  noDeck: {
    color: '#aaa',
    textAlign: 'center',
    fontFamily: 'gotham-rounded-light',
    fontSize: 22,
    marginTop: 20
   }
});
