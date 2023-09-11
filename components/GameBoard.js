//GameBoard.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Pressable, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';

function GameBoard({ navigation, route }) {
    const { playerGameIdSend, playerIdSend } = route.params;

    const makeMove = (moveType) => {
        fetch(`http://192.168.1.132:8080/rock-paper-scissors/games/move/${moveType}`, {
            method: 'POST',
            headers: {
                token: playerIdSend,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            console.log(`Move made: ${moveType}`);
            navigation.navigate('ResultsPage', { sendGameIdToResult: playerGameIdSend, sendPlayerIdToResult: playerIdSend });
        })
        .catch((error) => {
            console.error('An error occurred when making a move:', error.message);
        });
    };

    const renderMoveOption = (move, imageSrc) => (
        <View style={styles.moveContainer}>
            <Image style={styles.stretch} source={imageSrc} />
            <Pressable onPress={() => makeMove(move)} style={styles.button}>
                <Text style={styles.buttonText}>{move.charAt(0).toUpperCase() + move.toLowerCase().slice(1)}</Text>
            </Pressable>
        </View>
    );

    return (
        <TouchableWithoutFeedback>
            <LinearGradient colors={['#dbe6fd', '#a3b8ed']} style={styles.container}>
                {renderMoveOption('ROCK', require('../assets/Rock.png'))}
                {renderMoveOption('PAPER', require('../assets/Paper.png'))}
                {renderMoveOption('SCISSORS', require('../assets/Scissor.png'))}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    moveContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 2,
        borderColor: '#0099ff',
        borderRadius: 10,
        marginVertical: 10,
        width: '90%'
    },
    button: {
        width: 200,
        height: 60,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#0099ff',
        borderRadius: 5,
        elevation: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 50,
    },
});

export default GameBoard;
