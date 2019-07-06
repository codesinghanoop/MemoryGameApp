import React from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

const GameCardGrid = ({ openCard, isCardOpen, hiddenNumber, index }) => (
    <TouchableOpacity disabled={isCardOpen} onPress={ () => openCard(index)} style={[style.container, {backgroundColor: isCardOpen ? 'white' : 'green', borderWidth: isCardOpen}]}>
        {isCardOpen?<Text>{hiddenNumber}</Text> : null}
    </TouchableOpacity>
)

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 150,
        height: 300,
        marginTop: 10
    }
})

export default GameCardGrid
