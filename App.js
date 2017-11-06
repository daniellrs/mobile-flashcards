import React, {Component} from 'react';
import { View } from 'react-native';
import Views from './views';
import { Font } from 'expo';
import { setLocalNotification } from './utils/localNotification';

export default class App extends Component {
  state = {
    ready: false
  }

  async componentDidMount() {

    setLocalNotification( );

    await Font.loadAsync({
      'gotham-rounded-light': require('./assets/fonts/gotham-rounded-light.otf')
    });

    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;

    return (
      <View style={{flex: 1}}>
        { ready && (
          <Views />
        )}
      </View>
    );
  }
}
