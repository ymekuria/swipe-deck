import React, { Component } from 'react';
import { View, 
  Text,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native'; 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log('event: ', event)
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swipe right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
        } else {
          // reset card to initial position
        }          
      }

    });

    this.state = { panResponder, position, index: 0 };

  }

  // swipes the card off the screen once a user drags past the threshold
  swipeOffScreen() {

  }
  
  // resets card to initial position 
  resetCardPositon() {
    Animated.spring(this.state.position, {
      toValue: { x:0, y:0 }
    }).start();
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
        style={[this.getCardStyle()]}
        {...this.state.panResponder.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>   
    );
  }
}

export default Deck;