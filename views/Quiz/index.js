import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import Card from '../../components/Card';
import { white, pink, yellow } from '../../utils/colors';
import { getDeck } from '../../utils/asyncStorage';

export default class Deck extends Component {
  state = {
    deck: null,
    questionsLength: 0,
    indexQuestion: 1,
    wrongAnswers: [],
    finished: false
  }

  componentDidMount() {
    const title = this.props.navigation.state.params.title;
    getDeck( title ).then( deck => this.setState({deck, questionsLength: deck.questions.length}));
  }

  checkActualQuestion = () => {
    const { deck, indexQuestion } = this.state;

    if(!deck) {
      return {}
    }

    return deck.questions[indexQuestion-1];
  }

  handleAnswer = ( answer ) => {
    const { deck, indexQuestion, wrongAnswers, questionsLength } = this.state;

    const currentQuestion = deck.questions[indexQuestion-1];

    if( answer !== currentQuestion.answer ) {
      wrongAnswers.push( indexQuestion );
    }

    if( questionsLength !== indexQuestion ) {
      this.setState({indexQuestion: indexQuestion+1});
    } else {
      this.setState({finished: true});
    }

  }

  render() {
    const { questionsLength, indexQuestion, finished, wrongAnswers } = this.state;

    const currentQuestion = this.checkActualQuestion();

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>
        {finished && (
          <Text>{JSON.stringify(wrongAnswers)}</Text>
        )}
        {!finished && (
          <View style={styles.View}>

            <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>

              <View style={{flex: 2}} />

              <Card>
                <View style={styles.viewCard}>
                  <Text style={styles.cardInfo}>Question</Text>
                  <Text style={{fontSize: 17}}>{currentQuestion.question}</Text>
                </View>
                <View style={styles.viewCard}>
                  <Text style={styles.cardInfo}>Answer</Text>
                  <Text style={{fontSize: 17}}>{currentQuestion.answer === 1 ? 'Correct' : 'Incorrect'}</Text>
                </View>
              </Card>

              <View style={{flex: 2}} />

              <View style={styles.progressView}>
                <Text style={[styles.progress, {fontSize: 22, fontWeight: 'bold'}]}>{indexQuestion}</Text>
                <Text style={[styles.progress, {fontSize: 12, top: 3}]}>/{questionsLength}</Text>
              </View>

            </Image>
            <View style={styles.buttonsView}>

              <ButtonImage value='Correct' onPress={() => this.handleAnswer(1)} />

              <Button value='Incorrect' onPress={() => this.handleAnswer(0)} />

            </View>
          </View>
        )}
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
  View: {
    flex: 1,
    alignItems: 'stretch'
  },
  backgroundCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
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
  },
  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: yellow,
    borderRadius: 50,
    position: 'absolute',
    width: 55,
    height: 55,
    bottom: 0,
    right: 25
  },
  progress: {
    color: pink,
    position: 'relative',
    bottom: 3
  },
  cardInfo: {
    position: 'absolute',
    top: 0,
    color: pink
  },
  viewCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
