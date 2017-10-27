import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import ButtonImage from '../../components/ButtonImage';
import Card from '../../components/Card';
import { white, pink, yellow } from '../../utils/colors';

export default class Deck extends Component {

  render() {

    return (
      <Image style={styles.container} source={require('../../img/fundo.png')}>
        <View style={styles.View}>

          <Image style={styles.backgroundCard} source={require('../../img/fundoDetalhesCartaoComEf.png')}>

            <View style={{flex: 2}} />

            <Card>
              <View style={styles.viewCard}>
                <Text style={styles.cardInfo}>Question</Text>
                <Text style={{fontSize: 17}}>Front</Text>
              </View>
              <View style={styles.viewCard}>
                <Text style={styles.cardInfo}>Answer</Text>
                <Text style={{fontSize: 17}}>Back</Text>
              </View>
            </Card>

            <View style={{flex: 2}} />

            <View style={styles.progressView}>
              <Text style={[styles.progress, {fontSize: 22, fontWeight: 'bold'}]}>1</Text>
              <Text style={[styles.progress, {fontSize: 12, top: 3}]}>/15</Text>
            </View>

          </Image>
          <View style={styles.buttonsView}>

            <ButtonImage value='Correct' />

            <Button value='Incorrect' />

          </View>
        </View>
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
  View: {
    flex: 1,
    alignItems: 'stretch'
  },
  backgroundCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  titleCard: {
    color: white,
    fontSize: 22,
    marginBottom: 5
  },
  buttonsView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 30
  },
  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: yellow,
    borderRadius: 50,
    position: 'absolute',
    width: 55,
    height: 55,
    bottom: 0,
    right: 25
  },
  progress: {
    color: pink,
    position: 'relative',
    bottom: 3
  },
  cardInfo: {
    position: 'absolute',
    top: 0,
    color: pink
  },
  viewCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
