import React, { Component } from 'react';
import { Animated, View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native';
import { white, pink } from '../utils/colors';

export default class Card extends Component {
  state = {
    showing: 'front',
    rotateY: new Animated.Value(1)
  }

  rotateCard = () => {
    const { rotateY } = this.state;
    const value = JSON.stringify(rotateY);

    const duration = 300;
    let showing;

    if( value === '0' ) {
      Animated.timing(rotateY, {toValue: 1, duration}).start();
      showing = 'front';
    } else {
      Animated.timing(rotateY, {toValue: 0, duration}).start();
      showing = 'back';
    }

    setTimeout(() => {
      this.setState({showing});
    }, duration/2);
  }

  resolveUnderlayColor = () => {
    const color = white;

    const rgb = hexToRgb(color);

    return `rgba(${rgb.r},${rgb.g},${rgb.b},0.9)`;
  }

  render() {
    const { children } = this.props;
    const { showing, rotateY } = this.state;

    return (
      <Animated.View style={[styles.cardView, {
        transform: [{ rotateY: rotateY.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg']
        })}]}]}>
        <View style={{flex: 2}} />
        <TouchableHighlight onPress={this.rotateCard} underlayColor={this.resolveUnderlayColor()} style={styles.card}>
          <View style={[styles.textCardView, {transform: [{rotateY: showing === 'front' ? '180deg' : '0deg'}]}]}>
            {showing === 'front' ? children[0] : children[1]}
          </View>
        </TouchableHighlight>
        <View style={styles.shadowView}>
          <Image style={styles.shadowCard} source={require('../img/cardShadow.png')} />
        </View>
      </Animated.View>
    )
  }
}


const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
      r: 255,
      g: 255,
      b: 255
    };
}

const styles = StyleSheet.create({
  cardView: {
    flex: 8,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  card: {
    flex: 4,
    backgroundColor: white,
    borderColor: pink,
    borderWidth: 1,
    borderRadius: 4
  },
  textCardView: {
    flex: 1
  },
  shadowView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadowCard: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});
