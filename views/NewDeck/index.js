import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { white } from '../../utils/colors';
import { saveDeckTitle, getDeck } from '../../utils/asyncStorage';

export default class NewDeck extends Component {
  state = {
    title: '',
    alert: false
  }

  componentWillUnmount() {
    clearTimeout( this.alertTimeout );
  }

  async createDeck( title, navigation ) {
    this.setState({alert: false});

    if( title.trim().length > 0 ) {

      const exist = await getDeck( title );

      if( !exist ) {
        await saveDeckTitle( title );
        navigation.navigate('IndividualDeck', { title });
      } else {
        this.setAlert('This deck title already exist');
      }
    } else {
      this.setAlert("Title can't be empty");
    }
  }

  setAlert = ( alert ) => {
    clearTimeout( this.alertTimeout );
    this.setState({alert});

    this.alertTimeout = setTimeout(() => this.setState({alert: false}), 4000);
  }

  render() {
    const { title, alert } = this.state;
    const { navigation } = this.props;

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>

        {alert && (
          <Alert type='white' value={alert} />
        )}

        <KeyboardAvoidingView behavior='padding' style={styles.viewAvoid}>
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
