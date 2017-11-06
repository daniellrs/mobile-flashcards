import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { red, white, grey } from '../utils/colors';

export default class Alert extends Component {

  render() {
    const { value, type } = this.props;

    return (
      <View style={[styles.view, {backgroundColor: type === 'white' ? white : red}]}>
        <Text style={[styles.text, {color: type === 'white' ? red : white}]}>{value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: '90%',
    marginLeft: '5%',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    borderColor: grey,
    top: 15,
    zIndex: 500
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'gotham-rounded-light'
  }
});
