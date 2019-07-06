import { checkOnlyCardClose } from '../util'

export const cardOpened = (i, gameArray, previousClick) => {
    return (dispatch) => {
        let newGameArray = [...gameArray];
        if(previousClick != newGameArray[i].hiddenNumber) {
            newGameArray[i].isCardOpen = true;
            dispatch(cardStateChange(newGameArray, newGameArray[i].hiddenNumber))
        } else if(checkOnlyCardClose(newGameArray)) {
            dispatch(gameOverAction())
        }
    }
}

const cardStateChange = (data, previousClick) => ({
    type: 'CARD_CHANGED',
    data,
    previousClick
})

export const levelUp = () => ({
    type: 'LEVEL_UP'
})

export const gameOverAction = () => ({
    type: 'GAME_OVER'
})

export const restartGame = () => ({
    type: 'RESTART_GAME'
})

export const tickTok = (seconds) => ({
    type: 'TICK_TOK',
    seconds
})
