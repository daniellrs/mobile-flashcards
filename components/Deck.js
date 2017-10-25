import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

export default class Deck extends Component {

  render() {
    const { title, cards } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.deck}>
        <Image style={styles.backgroundDeck} source={require('../img/fundo.png')}>
          <Text style={styles.deckName}>{title}</Text>
          <Text style={styles.deckCads}>{cards} cards</Text>
        </Image>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    alignItems: 'stretch',
    height: 90,
    marginBottom: 1
  },
  backgroundDeck: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckName: {
    fontSize: 22,
    color: white,
    fontFamily: 'gotham-rounded-light'
  },
  deckCads: {
    color: white,
    fontFamily: 'gotham-rounded-light'
  }
});
