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
      onPanResponderMove: (event, gesture) => {
        console.log('event: ', event)
      },
      onPanResponderRelease: () => {

      }

    });

    this.state = { panResponder, position, index: 0 };

  }

  getCardStyle(){
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards() {
    const { cardData, renderCard } = this.props;  
        
    return cardData.map((item) => {
      return renderCard(item);
    });
  }

  render() {
    return(
      <Animated.View
        {...panResponder.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>   
    );
  }
}

export default Deck;