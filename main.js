import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Deck />
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
