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
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

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
          this.swipeOffScreen('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
          this.swipeOffScreen('left');
        } else {
          // reset card to initial position
          this.resetCardPositon();
        }          
      }

    });

    this.state = { panResponder, position, topCardIndex: 0 };

  }

  // swipes the card off the screen once a user drags past the threshold
  swipeOffScreen(direction) {
    // direction argument determines which side the screen animates too
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
   
    Animated.timing(this.state.position, {
      toValue: { x, y: 0},
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));     
  }

  // this method is executed after a card is swiped
  onSwipeComplete(direction) {
   
    // onSwipeRight/onSwipeLeft handlers can be defined and passed down as props to this component
    const { onSwipeLeft, onSwipeRight, cardData } = this.props;
    const item = cardData[this.state.topCardIndex]; // item is set to the card that was swiped

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    
    // reset the position and increments the topCardIndex
    this.state.position.setValue({ x: 0, y: 0 }); 
    this.setState({ topCardIndex: this.state.topCardIndex + 1 });
  }  
  
  // animates card to initial position 
  resetCardPositon() {
    Animated.spring(this.state.position, {
      toValue: { x:0, y:0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    // this maps the animated x position of the card to a rotation degree 
    // ie at the left edge of screen card will rotate -100deg at 0 rotation is 0
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
    const { topCardIndex, panResponder } = this.state;
    const { cardData, renderCard, renderNoMoreCards } = this.props;  
        
    if (topCardIndex >= cardData.length) {
      return renderNoMoreCards();
    }

    return cardData.map((item, index) => {

      // cards that are swiped are no longer rendered
      if (index < topCardIndex) { return null; }

      // attaches animations and panResponder handlers to top card of the deck
      if (index === topCardIndex) {
        return (
          <Animated.View 
            key={item.id}
            style={this.getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      // all other cards below the top are rendered without animation handlers  
      return (
        <View
          key={item.id}
        >
          {renderCard(item)}
        </View>  

      );  

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