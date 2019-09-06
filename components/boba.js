import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';

export default class Boba extends React.Component {
  renderRight = () => {
    const {city, deleteBoba} = this.props
    return (
      <TouchableWithoutFeedback onPressOut={() => deleteBoba(city)}>
        <Icon name='trash-2' size={60} style={{paddingTop:60,paddingLeft:20,paddingRight:20}} color='rgba(89,17,23,0.2)' />
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const noBoba = "ᕙ(⇀‸↼‶)ᕗ"
    const fewBoba = "ヾ(≧∇≦*)ゝ"
    const manyBoba = "ᕕ( ᐛ )ᕗ"
    const {city, results} = this.props
    return (
      <Swipeable friction={1} leftThreshold={5} rightThreshold={5} renderLeftActions={() => <View style={{width:5}} />} renderRightActions={this.renderRight}>
      <View style={styles.card}>
      <LinearGradient colors={['#98B4BC', '#BFADAA']} style={styles.cardgradient} />
        <View>
          <Text style={styles.city}>{city}</Text>
        </View>
        <View>
          {results == 0 ? <Text style={styles.results}>{results} BOBA PLACES {noBoba}</Text> :
            results < 100 ? <Text style={styles.results}>{results} BOBA PLACES {fewBoba}</Text> :
            <Text style={styles.results}>{results} BOBA PLACES {manyBoba}</Text>
          }
        </View>

      </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 0,
    width: 360,
    height: 180,
    shadowOffset:{ width: 5, height: 3,},
    shadowColor: '#975326',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 10,
  },
  cardgradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 180,
    borderRadius: 20,
  },
  city: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 42,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#FFF4ED',
    letterSpacing: 2,
    fontFamily: 'ArialRoundedMTBold',
  },
  results: {
    paddingTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#591117',
    letterSpacing: 2,
    fontFamily: 'ArialRoundedMTBold',
  },
});
