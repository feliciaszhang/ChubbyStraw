import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Boba extends React.Component {

  render() {

    const noBoba = "ᕙ(⇀‸↼‶)ᕗ"
    const fewBoba = "ヾ(≧∇≦*)ゝ"
    const manyBoba = "ᕕ( ᐛ )ᕗ"

    const {city, results, deleteBoba} = this.props
    return (
      <View style={styles.card}>
      <LinearGradient colors={['#98B4BC', '#BFADAA']} style={styles.cardgradient} />
        <View>
          <Text style={styles.city}>{city}</Text>
        </View>
        <View>
          <Text style={styles.results}>{results} BOBA PLACES {noBoba}</Text>
        </View>

        <TouchableHighlight onPressOut={() => deleteBoba(city)}>
          <View style={{width:20,height:20,backgroundColor:'#591117'}} />
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#98B4BC',
    borderRadius: 20,
    borderWidth: 0,
    width: 360,
    height: 180,
    shadowOffset:{ width: 5, height: 10,},
    shadowColor: '#975326',
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
