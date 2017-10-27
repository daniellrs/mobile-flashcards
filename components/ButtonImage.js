import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { white, pink } from '../utils/colors';

export default class ButtonImage extends Component {

  render() {
    const { value, children, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.button}>
        <Image style={styles.backgroundButtonImage} source={require('../img/fundo.png')}>
          {children}
          <Text style={styles.textButton}>{value}</Text>
        </Image>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 55
  },
  backgroundButtonImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff'
  },
  textButton: {
    color: white,
    fontSize: 16,
    fontFamily: 'gotham-rounded-light'
  }
});
