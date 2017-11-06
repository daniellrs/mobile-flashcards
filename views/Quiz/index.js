import React, {Component} from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import Card from '../../components/Card';
import { white, pink, yellow, red, grey } from '../../utils/colors';
import { getDeck } from '../../utils/asyncStorage';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default class Deck extends Component {
  state = {
    deck: null,
    questionsLength: 0,
    indexQuestion: 1,
    wrongAnswers: [],
    finished: false,
    percentage: 0
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
      this.percentageAnswers();
    }

  }

  percentageAnswers = () => {
    const { questionsLength, wrongAnswers } = this.state;

    const result = (100 - ((wrongAnswers.length*100) / questionsLength));

    this.interval = setInterval(() => {
      const { percentage } = this.state;

      if( percentage < result ) {
        this.setState({percentage: percentage+1})
      } else {
        clearInterval( this.interval );
      }
    }, 10);
  }

  resultText = () => {
    const { percentage } = this.state;

    if( percentage < 15 ) {
      return 'Maybe you just in a bad day...';
    }

    if( percentage < 40 ) {
      return 'Alright, you can do better...';
    }

    if( percentage < 60 ) {
      return "It's not too bad";
    }

    if( percentage < 80 ) {
      return 'Nice';
    }

    if( percentage < 100 ) {
      return 'Good job!'
    }

    return 'Yeah, awesome!'
  }

  render() {
    const { deck, questionsLength, indexQuestion, finished, percentage } = this.state;

    const currentQuestion = this.checkActualQuestion();

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>
        {finished && (
          <View style={{flex: 1}}>
            <View style={styles.resultTextView}>
              <Text style={styles.resultText}>{this.resultText()}</Text>
            </View>
            <View style={styles.percentageView}>
              <View style={styles.percentageCircle}>
                <Text style={styles.percentage}>{percentage}%</Text>
              </View>
            </View>
            <ScrollView style={styles.results}>
              {deck && deck.questions.map( (d, index) => (
                <View key={index} style={styles.resultRow}>
                  <Text style={styles.resultIcon}>
                    {d.answer ? (
                      <Feather size={25} name='check' />
                    ) : (
                      <MaterialIcons size={25} name='close' />
                    )}
                  </Text>
                  <Text style={styles.resultQuestion}>{d.question}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {!finished && (
          <View style={styles.View}>

            <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>

              <View style={{flex: 2}} />

              <Card>
                <View style={styles.viewCard}>
                  <Text style={styles.cardInfo}>Question</Text>
                  <Text style={{color: '#333', fontSize: 16}}>{currentQuestion.question}</Text>
                </View>
                <View style={styles.viewCard}>
                  <Text style={styles.cardInfo}>Answer</Text>
                  <Text style={{color: '#333', fontSize: 16}}>{currentQuestion.answer === 1 ? 'Correct' : 'Incorrect'}</Text>
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
  },
  resultTextView: {
    flex:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText: {
    color: white,
    fontSize: 25
  },
  percentageView: {
    flex:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentageCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 50,
    width: 90,
    height: 90
  },
  percentage: {
    color: red,
    fontSize: 30
  },
  results: {
    flexGrow:60,
    backgroundColor: white
  },
  resultRow: {
    flexDirection: 'row',
    borderColor: grey,
    borderBottomWidth: 1,
    padding: 15
  },
  resultQuestion: {
    fontSize: 13,
    color: '#333',
    marginLeft: 10,
    paddingTop: 3
  },
  resultIcon: {
    color: red
  }
})
