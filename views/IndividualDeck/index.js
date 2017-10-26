import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import { white, pink, red } from '../../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class IndividualDeck extends Component {
  render() {
    console.log(this.props.navigation.state.params);
    return (
        <Image style={styles.container} source={require('../../img/fundo.png')}>
          <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>
            <Text style={styles.titleCard}>Eai, de boa?</Text>
            <Text style={{fontSize: 16}}>15 cards</Text>
          </Image>
          <View style={styles.buttonsView}>

            <ButtonImage value="Start Quiz">
              <MaterialCommunityIcons name='cards' size={30} color={white} style={{marginRight: 5}} />
            </ButtonImage>

            <Button value="AddCard">
              <MaterialCommunityIcons name='plus' color={pink} size={30} style={{marginRight: 5}} />
            </Button>

          </View>
        </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  backgroundCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  titleCard: {
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
