import React, {Component} from 'react';
import {  StyleSheet, TextInput, View, Text, Animated } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default class Input extends Component {
  state = {
    focus: false,
    placeTop: new Animated.Value(4),
    textFontSize: new Animated.Value(14),
    marginLeftFont: new Animated.Value(10),
    size: 0
  }

  componentDidMount() {
    const { size } = this.props;
    this.setState({size: new Animated.Value(size)});
  }

  onFocus = ( ) => {
    const { placeTop, textFontSize, marginLeftFont, size } = this.state;

    const duration = 30;

    this.setState({focus: true});

    Animated.parallel([
      Animated.timing(placeTop, { toValue: -12, duration: duration }),
      Animated.timing(textFontSize, { toValue: 11, duration: duration }),
      Animated.timing(marginLeftFont, { toValue: 0, duration: duration }),
      Animated.timing(size, { toValue: 18, duration: duration })
    ]).start();
  }

  onBlur = () => {
    const { value } = this.props;
    const { placeTop, textFontSize, marginLeftFont, size } = this.state;

    const duration = 30;

    setTimeout(() => {
      this.setState({focus: false});
    }, duration);

    if(!value) {
      Animated.parallel([
        Animated.timing(placeTop, { toValue: 4, duration: duration }),
        Animated.timing(textFontSize, { toValue: 14, duration: duration }),
        Animated.timing(marginLeftFont, { toValue: 10, duration: duration }),
        Animated.timing(size, { toValue: this.props.size, duration: duration })
      ]).start();
    }
  }

  checkTextInputProps() {
    const { focus } = this.state;
    const { underlineColorAndroid, placeholderTextColor, autoCapitalize, onChangeText, secureTextEntry, value } = this.props;

    return { underlineColorAndroid, placeholderTextColor, autoCapitalize, onChangeText, secureTextEntry, value };
  }

  checkIconProps() {
    const { name, color } = this.props;
    return { name, color };
  }

  render() {

    const { onFocus, onBlur } = this;
    const { style, placeholder, value } = this.props;
    const { focus, placeTop, placeLeft, textFontSize, marginLeftFont, size } = this.state;

    const textInputProps = this.checkTextInputProps();
    const iconProps = this.checkIconProps();

    const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome);

    return (
      <View style={styles.inputView}>
        <Animated.View style={[styles.placeholderView, {top: placeTop}]}>
          <AnimatedFontAwesome {...iconProps} style={{width: 21, fontSize: size}} />
          <Animated.Text style={[styles.inputText, {fontSize: textFontSize, marginLeft: marginLeftFont }]}>{placeholder}</Animated.Text>
        </Animated.View>
        <TextInput {...textInputProps} onFocus={onFocus} onBlur={onBlur} style={[styles.input, style]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  placeholderView: {
    position: 'absolute',
    flexDirection: 'row',
    left: 9
  },
  inputText: {
    color: '#fff',
    alignSelf: 'center'
  },
  input: {
    width: '100%',
    padding: 8,
    color: '#424242',
    borderColor: '#fff',
    color: '#fff'
  }
})
