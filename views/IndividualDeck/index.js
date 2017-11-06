import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import Alert from '../../components/Alert';
import { white, pink, red } from '../../utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDeck } from '../../utils/asyncStorage';

export default class IndividualDeck extends Component {
  state = {
    deck: {},
    alert: false
  }

  componentDidMount() {
    const title = this.props.navigation.state.params.title;

    getDeck( title ).then( deck => this.setState({deck}));
  }

  componentWillUnmount() {
    clearTimeout( this.alertTimeout );
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

  startDeck = ( deck ) => {
    if( this.countCards( deck ) > 0 ) {
      this.navigate('Quiz', deck.title);
    } else {
      this.setAlert('The deck needs at least 1 card');
    }
  }

  setAlert = ( alert ) => {
    clearTimeout( this.alertTimeout );
    this.setState({alert});

    this.alertTimeout = setTimeout(() => this.setState({alert: false}), 4000);
  }

  render() {
    const { deck, alert } = this.state;

    return (
        <Image style={styles.container} source={require('../../img/fundo.png')}>

          {alert && (
            <Alert type='red' value={alert} />
          )}

          <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>
            <Text style={styles.titleCard}>{deck.title}</Text>
            <Text style={{fontSize: 16}}>{this.countCards( deck )} cards</Text>
          </Image>
          <View style={styles.buttonsView}>

            <ButtonImage value="Start Quiz" onPress={() => this.startDeck( deck )}>
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
