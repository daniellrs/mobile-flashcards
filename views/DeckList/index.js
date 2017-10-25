import React, {Component} from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Deck from '../../components/Deck';
import { white, grey } from '../../utils/colors';

export default class DeckList extends Component {

  render() {
    return (
      <ScrollView style={{backgroundColor: grey}}>
        <View style={styles.container}>

          <Deck title="Eai, de boa?" cards={15} />

          <Deck title="Bora l[a[a[a]]]" cards={2} />

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
