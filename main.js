import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';


// Dummy array of card items for testing. 
const CARDDATA = [
  { id: 1, text: '#1', uri: 'https://unsplash.com/?photo=5EVrQKXPa5g' },
  { id: 2, text: '#2', uri: 'https://unsplash.com/?photo=2h_i_BB_X2E' },
  // { id: 3, text: '#3', uri: 'https://unsplash.com/?photo=DxAV6se7QPM' },
  // { id: 4, text: '#4', uri: 'https://unsplash.com/?photo=trvP9JiYC1E' }
];

class App extends Component {

  renderCard(item, color) {
    const { id, text, uri } = item;

    return (
      <Card
        key={id}
        containerStyle={{ borderRadius: 10 }}
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

  renderNoMoreCards() {
    return (
      <Card 
        title="No More Cards"
        containerStyle={{ borderRadius: 10 }}    
      >
        <Text style={{ marginBottom: 10 }}>
          We are all done here!
        </Text>
        <Button
          backgroundColor="#03A9F4"
          title="Show More"
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
          renderNoMoreCards={this.renderNoMoreCards}
        />  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

Expo.registerRootComponent(App);
