import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Boba from './components/boba.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      results: "",
      displaytext: "",
      displayemijo: "",
      data: {},
      isEmpty: true,
    };
  }

  handleSave = () => {

  }

  handleSubmit = () => {
    const {city} = this.state;
    fetch(
      `https://developers.zomato.com/api/v2.1/cities?q=${city}&apikey=da9010e85d15798abd4afa175a44f514`
    )
      .then(res => res.json())
      .then(json => {
        const city = json.location_suggestions[0];
        const city_id = city.id;
        fetch(
          `https://developers.zomato.com/api/v2.1/search?entity_id=${city_id}&entity_type=city&q=boba&apikey=da9010e85d15798abd4afa175a44f514`
        )
          .then(res => res.json())
          .then(json => {
            this.setState({results: json.results_found, displaytext: "BOBA PLACES", isLoading: false, prevdata: [{city: this.state.city}], isEmpty: false});
            const r = json.results_found;
            if (r == 0) {
              if (this.state.prevdata === [this.empty]) {
                this.setState({data: [...this.array]})
              } else {
                this.array.push({city: this.state.city, results: this.state.results, displaytext: this.state.displaytext, displayemoji: "ᕙ(⇀‸↼‶)ᕗ"})
                this.setState({data: [...this.array]})
              }
            }
            if (r != 0 && r < 100) {
              if (this.state.prevdata === [this.empty]) {
                this.setState({data: [...this.array]})
              } else {
                this.array.push({city: this.state.city, results: this.state.results, displaytext: this.state.displaytext, displayemoji: "ヾ(≧∇≦*)ゝ"})
                this.setState({data: [...this.array]})
              }
            }
            if (r > 100) {
              if (this.state.prevdata === [this.empty]) {
                this.setState({data: [...this.array]})
              } else {
                this.array.push({city: this.state.city, results: this.state.results, displaytext: this.state.displaytext, displayemoji: "ᕕ( ᐛ )ᕗ"})
                this.setState({data: [...this.array]})
              }
            }
          });
      })
    this.setState({city: ""});
  };


  render() {
    const {isEmpty, city} = this.state;
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#FFA392', '#ffecd2']} style={styles.backgroundgradient} />
      {isEmpty ? <Image source={require('./assets/boba.png')} style={styles.image} /> : null}
        <Text style={styles.title}>ChubbyStraw</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} value={city} placeholder="C I T Y"
          onChangeText={city => this.setState({city: city})} placeholderTextColor='rgba(89,17,23,0.4)' />
          <TouchableHighlight underlayColor='#46090F' onPressOut={this.handleSubmit} style={styles.search}>
            <View style={styles.searchIcon}><Icon name="search" size={30} color='#F3C4B7' /></View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight underlayColor='#ECE1D9' style={styles.save} onPressOut={this.handleSave}>
          <Text style={styles.saveText}>SAVE DAT BOBA ( ੭ˊ꒳ˋ)੭ ♡⁺˚</Text>
        </TouchableHighlight>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCCAA',
    paddingTop: 70,
  },
  image: {
    opacity: 0.1,
    position: 'absolute',
    top: 400,
    width: 200,
    height: 300,
    alignSelf: 'center',
  },
  backgroundgradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 3,
    fontFamily: 'ArialRoundedMTBold',
    textAlign: 'center',
  },
  bobaContainer: {
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    paddingTop: 20,
    marginLeft: 32,
    marginRight: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    borderColor: 'rgba(89,17,23,0.2)',
    borderBottomWidth: 3,
    color: '#591117',
    width: 270,
    height: 50,
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 16,
    fontFamily: 'ArialRoundedMTBold',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  save: {
    width: 370,
    height: 65,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#FFF4E9',
    padding: 16,
    margin: 16,
    shadowOffset:{ width: 5, height: 10,},
    shadowColor: '#975326',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  saveText: {
    color: 'rgba(89,17,23,0.4)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'ArialRoundedMTBold',
    letterSpacing: 3,
  },
  search: {
    backgroundColor: '#591117',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowOffset:{ width: 5, height: 5,},
    shadowColor: '#975326',
    shadowOpacity: 0.6,
    shadowRadius: 7,
  },
  searchIcon: {
    left: 15,
    top: 15,
  }
});
