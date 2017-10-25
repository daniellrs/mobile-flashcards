import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import { white, pink } from '../../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class IndividualDeck extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf2.png')}>
            <Text style={styles.titleCard}>Eai, de boa?</Text>
            <Text style={{color: white, fontSize: 16}}>15 cards</Text>
          </Image>
          <View style={styles.buttonsView}>

            <ButtonImage value="Start Quiz">
              <MaterialCommunityIcons name='cards' size={30} color={white} style={{marginRight: 5}} />
            </ButtonImage>

            <Button value="AddCard">
              <MaterialCommunityIcons name='plus' color={pink} size={30} style={{marginRight: 5}} />
            </Button>

          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  backgroundCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  titleCard: {
    color: white,
    fontSize: 22,
    marginBottom: 5
  },
  buttonsView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 30
  }
})
