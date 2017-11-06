import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import { white, pink, red } from '../../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDeck } from '../../utils/asyncStorage';

export default class IndividualDeck extends Component {
  state = {
    deck: {}
  }

  componentDidMount() {
    const title = this.props.navigation.state.params.title;

    getDeck( title ).then( deck => this.setState({deck}));
  }

  navigate = ( screen, title ) => {
    this.props.navigation.navigate(screen, { title });
  }

  countCards = ( deck ) => {

    if( !deck.questions ) {
      return 0;
    }

    return deck.questions.length;
  }

  render() {
    const { deck } = this.state;

    return (
        <Image style={styles.container} source={require('../../img/fundo.png')}>
          <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>
            <Text style={styles.titleCard}>{deck.title}</Text>
            <Text style={{fontSize: 16}}>{this.countCards( deck )} cards</Text>
          </Image>
          <View style={styles.buttonsView}>

            <ButtonImage value="Start Quiz" onPress={() => this.navigate('Quiz', deck.title)}>
              <MaterialCommunityIcons name='cards' size={30} color={white} style={{marginRight: 5}} />
            </ButtonImage>

            <Button value="AddCard" onPress={() => this.navigate('NewQuestion', deck.title)}>
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
