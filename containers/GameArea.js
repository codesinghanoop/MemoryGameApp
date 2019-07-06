import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import GameHeader from '../components/GameHeader'
import GameCardGrid from '../components/GameCardGrid'
import { cardOpened, levelUp, gameOverAction, restartGame, tickTok } from '../store/gameActions'
import { checkIfNextLevel } from '../util'

class GameArea extends React.Component {

    state = {
        timeLeft: this.props.gameSetup.timeLeft
    }

    _scrollView = React.createRef();

    openCard = (i) => {
        const { gameSetup: { cardArray, previousClick } } = this.props
        this.props.cardOpened(i, cardArray, previousClick)
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            this.props.tickTok(this.props.gameSetup.timeLeft - 1)
            // this.setState((prevState)=> {
            // return {
            //     timeLeft: prevState.timeLeft - 1
            // }
            // })
        },1000)
    }

    componentDidMount() {
        // this.props.persistor.purge()
        const { timeLeft } = this.state
        this.startTimer()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.gameSetup.cardArray != this.props.gameSetup.cardArray && checkIfNextLevel(nextProps.gameSetup.cardArray)) {
            this.props.levelUp()
            this._scrollView.current.scrollTo({x: 0, y: 0, animated: true});
        }
        if(nextProps.gameSetup.gameOver != this.props.gameSetup.gameOver && nextProps.gameSetup.gameOver) {
            console.log('the game is over',nextProps.gameSetup.gameOver, this.props.gameSetup.gameOver)
            this.gameOverAlert()
        }
    }

    restartGame = () => {
        this.props.restartGame()
        this.startTimer();
    }

    gameOverAlert = () => {
        Alert.alert(
            'Game over',
            'Better Luck next time.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Restart',
                onPress: () => this.restartGame(),
              },
            ],
          );
    }

    componentDidUpdate(previousProps, previousState){
        const { gameSetup } = this.props
        if(previousProps.gameSetup.timeLeft != gameSetup.timeLeft && gameSetup.timeLeft === 0){
          console.log('repeated again',this.state.timeLeft, previousState)
          this.props.gameOverAction()
          clearInterval(this.interval);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        const { gameSetup } = this.props
        return (
            <View style={style.container}>
              <GameHeader timeLeft={gameSetup.timeLeft} {...this.props} />
              <ScrollView ref={this._scrollView} contentContainerStyle={style.scrollContent} style={style.cardsContainer}>
                {gameSetup.cardArray.map((ele, i) => <GameCardGrid key={i} openCard= {this.openCard} index={i} {...ele} />)}
              </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsContainer: {
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
    },
    scrollContent: {
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})

const mapStateToProps = (state) => ({
    gameSetup: state.gameReducer
})

const mapDispatchToProps = (dispatch) => ({
    cardOpened: (i, cardArray, prevClick) => dispatch(cardOpened(i, cardArray, prevClick)),
    levelUp: () => dispatch(levelUp()),
    gameOverAction: () => dispatch(gameOverAction()),
    restartGame: () => dispatch(restartGame()),
    tickTok: (seconds) => dispatch(tickTok(seconds))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameArea)
