import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { white } from '../../utils/colors';

export default class NewDeck extends Component {
  state = {
    title: ''
  }

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>What is the title of your new deck?</Text>
        </View>

        <View style={styles.inputView}>
          <Input value={title} placeholder="Title" underlineColorAndroid="#fff" placeholderTextColor="#fff"
            autoCapitalize="sentences" onChangeText={(text) => this.setState({title: text})}
            name='puzzle-piece' size={25} color='#fff' />

          <Button value='Create' />
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  }
});
