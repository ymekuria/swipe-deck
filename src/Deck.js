import React, { Component } from 'react';
import { View, 
  Text,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager
} from 'react-native'; 

class Deck extends Component {
  constructor(props) {
    super(props);
  }

  renderCards() {
      
  return this.props.cardData.map((item) => {
    return this.props.renderCard(item);
  });

  }

  render() {
    return(
      <View>
        {this.renderCards()}
      </View>   
    );
  }
}

export default Deck;