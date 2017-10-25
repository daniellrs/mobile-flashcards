import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { white } from '../../utils/colors';

export default class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>New card</Text>
        </View>

        <View style={styles.inputView}>
          <Input value={question} placeholder="Question" underlineColorAndroid="#fff" placeholderTextColor="#fff"
            autoCapitalize="sentences" onChangeText={(text) => this.setState({title: text})}
            name='question' size={25} color='#fff' />

          <Input value={answer} placeholder="Answer" underlineColorAndroid="#fff" placeholderTextColor="#fff"
            autoCapitalize="sentences" onChangeText={(text) => this.setState({title: text})}
            name='lock' size={25} color='#fff' />

          <Button value='Submit' />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  }
});
