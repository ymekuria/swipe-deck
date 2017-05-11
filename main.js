import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';


// Dummy array of card items for testing. 
const CARDDATA = [
  { id: 1, text: '#1', uri: 'https://unsplash.com/?photo=5EVrQKXPa5g' },
  { id: 2, text: '#2', uri: 'https://unsplash.com/?photo=2h_i_BB_X2E' },
  { id: 3, text: '#3', uri: 'https://unsplash.com/?photo=DxAV6se7QPM' },
  { id: 4, text: '#4', uri: 'https://unsplash.com/?photo=trvP9JiYC1E' }
];

class App extends Component {

  renderCard(item) {
    const { id, text, uri } = item;

    return (
      <Card
        key={id}
        title={text}
        image={{ uri }}
       >
         <Button
          icon={{ name: 'autorenew'}} 
          backgroundColor="#03A9F4"
          title="Button"  
         /> 

      </Card>   
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
          cardData={CARDDATA} 
          renderCard={this.renderCard}
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

Expo.registerRootComponent(App);
