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

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: () => {

      },
      onPanResponderRelease: () => {

      }

    });

    this.state = { panResponder, position, index: 0 };

  }

  renderCards() {
  const { cardData, renderCard } = this.props;  
      
  return cardData.map((item) => {
    return renderCard(item);
  });

  }

  render() {
    return(
      <Animated.View>
        {this.renderCards()}
      </Animated.View>   
    );
  }
}

export default Deck;