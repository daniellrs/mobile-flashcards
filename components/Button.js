import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { white, pink } from '../utils/colors';

export default class Button extends Component {

  render() {
    const { value, children, onPress, buttonStyle = {} } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.button, buttonStyle]}>
        {children}
        <Text style={styles.textButton}>{value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: pink,
    backgroundColor: white,
    flexDirection: 'row'
  },
  textButton: {
    color: pink,
    fontSize: 16,
    fontFamily: 'gotham-rounded-light'
  }
});
