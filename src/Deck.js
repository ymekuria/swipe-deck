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
const SCREEN_HEIGHT = Dimensions.get('window').height;
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
    // direction argument determines which side of the screen the card animates to 
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
    // ie at the left edge of screen card will rotate -120deg at 0 rotation is 0
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

    const color = this.state.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ['red', 'white', 'green']
    });    

    
    // shows the user that all the cards have been swiped    
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
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      // all other cards are staggered below the top card and are rendered without gesture handlers  
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (index - topCardIndex), zIndex: -index }]}
        >
          {renderCard(item)}
        </Animated.View>  
      );  
    }).reverse();
  }

  render() {
    return(
      <View>
        {this.renderCards()}
      </View>   
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  }
};


export default Deck;