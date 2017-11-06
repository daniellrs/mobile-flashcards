import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import Alert from '../../components/Alert';
import { white } from '../../utils/colors';
import { addCardToDeck } from '../../utils/asyncStorage';

export default class NewQuestion extends Component {
  state = {
    title: '',
    question: '',
    answer: 1,
    alert: false
  }

  componentDidMount() {
    const title = this.props.navigation.state.params.title;
    this.setState({title});
  }

  componentWillUnmount() {
    clearTimeout( this.alertTimeout );
  }

  addCard = () => {
    const { title, question, answer } = this.state;
    const { navigation } = this.props;

    this.setState({alert: false});

    if( question.trim().length > 0 ) {

      addCardToDeck(title, {question, answer}).then(() => {
        navigation.navigate('IndividualDeck', { title });
      });
    } else {
      this.setAlert("Question can't be empty");
    }
  }

  setAlert = ( alert ) => {
    clearTimeout( this.alertTimeout );
    this.setState({alert});

    this.alertTimeout = setTimeout(() => this.setState({alert: false}), 4000);
  }

  render() {
    const { question, answer, alert } = this.state;

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>

        {alert && (
          <Alert type='white' value={alert} />
        )}

        <KeyboardAvoidingView behavior='padding' style={styles.viewAvoid}>
          <View style={styles.textView}>
            <Text style={styles.text}>New card</Text>
          </View>

          <View style={styles.inputView}>
            <Input value={question} placeholder="Question" underlineColorAndroid="#fff" placeholderTextColor="#fff"
              autoCapitalize="sentences" onChangeText={(text) => this.setState({question: text})}
              name='question' size={25} color='#fff' />

            {answer === 1 && (
              <View style={styles.answerView}>
                <ButtonImage value='Correct' buttonStyle={{flex: 1}} />
                <Button onPress={() => this.setState({answer: 0})} value='Incorrect' buttonStyle={{flex: 1}} />
              </View>
            )}

            {answer === 0 && (
              <View style={styles.answerView}>
                <Button onPress={() => this.setState({answer: 1})} value='Correct' buttonStyle={{flex: 1}} />
                <ButtonImage value='Incorrect' buttonStyle={{flex: 1}} />
              </View>
            )}

            <Button value='Submit' onPress={this.addCard} />
          </View>
        </KeyboardAvoidingView>
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
  viewAvoid: {
    flex: 1,
    padding: 30
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    color: white,
    textAlign: 'center',
    fontFamily: 'gotham-rounded-light'
  },
  inputView: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  answerView: {
    flexDirection: 'row'
  }
});
