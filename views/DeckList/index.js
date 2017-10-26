import React, {Component} from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Deck from '../../components/Deck';
import { white, grey } from '../../utils/colors';

export default class DeckList extends Component {

  openDeck = () => {
    const { navigation } = this.props;
    navigation.navigate('IndividualDeck', {object: true});
  }

  render() {

    return (
      <ScrollView style={{backgroundColor: grey}}>
        <View style={styles.container}>

          <Deck onPress={this.openDeck} title="Eai, de boa?" cards={15} />

          <Deck onPress={this.openDeck} title="Bora l[a[a[a]]]" cards={2} />

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  }
});
