import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { white } from '../../utils/colors';
import { saveDeckTitle, getDeck } from '../../utils/asyncStorage';

export default class NewDeck extends Component {
  state = {
    title: ''
  }

  async createDeck( title, navigation ) {

    if( title.trim().length > 0 ) {

      const exist = await getDeck( title );
      
      if( !exist ) {
        await saveDeckTitle( title );
        navigation.navigate('IndividualDeck', { title });
      }
    }
  }

  render() {
    const { title } = this.state;
    const { navigation } = this.props;

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>
        <KeyboardAvoidingView style={styles.viewAvoid}>
          <View style={styles.textView}>
            <Text style={styles.text}>What is the title of your new deck?</Text>
          </View>

          <View style={styles.inputView}>
            <Input value={title} placeholder="Title" underlineColorAndroid="#fff" placeholderTextColor="#fff"
              autoCapitalize="sentences" onChangeText={(text) => this.setState({title: text})}
              name='puzzle-piece' size={25} color='#fff' />

            <Button value='Create' onPress={() => this.createDeck( title, navigation )} />
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  }
});
