import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { List, ListItem } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Feather";
import Boba from './components/boba.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.empty = {city: "", results: "", displaytext: "", displayemoji: ""};
    this.array = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      value: "",
      city: "",
      results: "",
      displaytext: "",
      displayemijo: "",
      data: [],
      prevdata: [],
      isLoading: false,
      isEmpty: true,
    };
  }

  handleViewRef = ref => this.view = ref;

  handleAdd(e) {
    if (this.state.prevdata === [this.empty]) {
      this.setState({data: [...this.array], prevdata: [], isEmpty: false})
    } else {
      this.setState({data: [...this.array, this.empty], prevdata: [this.empty], isEmpty: false})
    }
  }

  handleChange(event) {
    this.setState({value: event.nativeEvent.text})
  }

  handleSubmit(e) {
    this.view.bounce(1000);
    const city = this.state.value;
    this.setState({value: "", city: city, isLoading: true});
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
  };


  render() {
    const isLoading = this.state.isLoading;
    const isEmpty = this.state.isEmpty;
    return (
      <View style={styles.container}>
      <LinearGradient colors={['#FFA392', '#ffecd2']} style={styles.backgroundgradient} />
      <View style={styles.addshadow}></View>
      {isEmpty ? <Image source={require('./assets/boba.png')} style={styles.image} /> : null}
        <Text style={styles.chubbystraw}>
          ChubbyStraw
        </Text>
        <View>
          <View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput} value={this.state.value}
                onChange={this.handleChange.bind(this)} placeholder="C I T Y" />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor='#ECE1D9' style={styles.Button} onPress={this.handleAdd}>
              <View>
                <Text style={styles.ButtonText}>ADD DAT BOBA ( ੭ˊ꒳ˋ)੭ ♡⁺˚</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{height: 620}}>
          <FlatList data={this.state.data.reverse()} contentContainerStyle={styles.bobaContainer}
          keyboardShouldPersistTaps='handled' keyExtractor={(item, index) => item.city}
          renderItem={({item}) => <Boba city={item.city} results={item.results} displaytext={item.displaytext} displayemoji={item.displayemoji} />} />
        </View>
          <TouchableWithoutFeedback onPress={this.handleSubmit}>
            <Animatable.View ref={this.handleViewRef} style={styles.circle}>
              <View style={styles.add}><Icon name="search" size={30} color='#F3C4B7' /></View>
            </Animatable.View>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCCAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    opacity: 0.1,
    position: 'absolute',
    top: 400,
    width: 200,
    height: 300,
  },
  backgroundgradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  chubbystraw: {
    paddingTop: 115,
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
    paddingLeft: 25,
    paddingRight: 100,
  },
  textInput: {
    borderColor: 'rgba(89,17,23,0.2)',
    borderBottomWidth: 3,
    color: '#591117',
    height: 50,
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 16,
    fontFamily: 'ArialRoundedMTBold',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
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
  ButtonText: {
    color: 'rgba(89,17,23,0.4)',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'ArialRoundedMTBold',
    letterSpacing: 3,
  },
  circle: {
    backgroundColor: '#591117',
    bottom: 780,
    left: 150,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  add: {
    left: 15,
    top: 15,
  },
  addshadow: {
    position: 'absolute',
    backgroundColor: '#BC8B6A',
    bottom: 735,
    left: 335,
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowOffset:{ width: 10, height: 25,},
    shadowColor: '#975326',
    shadowOpacity: 0.6,
    shadowRadius: 5,
  }
});
