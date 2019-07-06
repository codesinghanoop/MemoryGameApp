import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { getTimeLeft } from '../util'

const GameHeader = ({ gameSetup: { level, score }, timeLeft }) => (
    <View style={style.container}>
        <Text>Memory game</Text>
        <View style={style.gameResult}>
            <View style={style.stats}>
                <Text>
                    Level
                </Text>
                <Text>
                     {level}
                </Text>
            </View>
            <View style={style.stats}>
                <Text>
                    Score
                </Text>
                <Text>
                     {score}
                </Text>
            </View>
        </View>
        <Text>Time left</Text>
        <Text>{getTimeLeft(timeLeft)}</Text>
    </View>
)

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        alignItems: 'center'
    },
    gameResult: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    stats: {
        alignItems: 'center'
    }
})

export default GameHeader
