
export const getCardArray = (level) => {
    const arraySize = level * 2 + 2;
    let cardsNumber = []
    for(let i = 1; i <= arraySize/2; i++) {
        const cardObj = {
            hiddenNumber: i-1,
            isCardOpen: false
        }
        cardsNumber.push({...cardObj});
        cardsNumber.push({...cardObj});
    }
    return shuffleArray(cardsNumber);
}

export const checkIfNextLevel = (cardArray) => cardArray.every(isLevelUp)

function isLevelUp(currentValue) {
    return currentValue.isCardOpen === true;
}

export function checkOnlyCardClose(arr) {
    return arr.filter((ele) => ele.isCardOpen === false).length === 1
}

export function getTimeLeft(seconds) {
   return Math.floor(seconds/60) + ':' + (((seconds % 60) % 10 === seconds % 60) ? ('0' + seconds % 60) : seconds % 60)
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
