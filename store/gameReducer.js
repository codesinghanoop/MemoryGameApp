import { getCardArray } from '../util'

const initialState = {
    score: 0,
    level: 1,
    cardArray: getCardArray(1),
    gameOver: false,
    previousClick: -1,
    numberOfClicks: 0,
    currentClick: -1,
    timeLeft: 10
}

export function gameReducer(state = initialState, action) {
    switch (action.type) {
        case 'LEVEL_UP':
            return {
                ...state,
                level: state.level + 1,
                score: (state.level + 1)*10,
                cardArray: getCardArray(state.level + 1),
                previousClick: -1
            }
        case 'CARD_CHANGED':
            return {
                ...state,
                cardArray: action.data,
                previousClick: action.previousClick
            }
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true
            }
        case 'RESTART_GAME':
            return {
                score: 0,
                level: 1,
                cardArray: getCardArray(1),
                gameOver: false,
                previousClick: -1,
                numberOfClicks: 0,
                currentClick: -1,
                timeLeft: 180
            }
        case 'TICK_TOK':
            return {
                ...state,
                timeLeft: action.seconds
            }
        default:
            return state;
    }

}
