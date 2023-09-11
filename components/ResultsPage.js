//ResultsPage.js
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Pressable } from 'react-native';

function ResultsPage({ navigation, route }) {
    const { sendGameIdToResult, sendPlayerIdToResult } = route.params;

    const [gameOutcome, setGameOutcome] = useState("");
    const [buttonText, setButtonText] = useState("Loading");
    const [waitingDuration, setWaitingDuration] = useState(0);

    useEffect(() => {
        const waitingMessages = [
            "Loading..", "Loading...", "Loading.....", "Loading.......", "Loading.........."
        ];

        const interval = setInterval(() => {
            setWaitingDuration(prevDuration => {
                if (prevDuration < waitingMessages.length - 1) {
                    setButtonText(waitingMessages[prevDuration]);
                    return prevDuration + 1;
                } else {
                    clearInterval(interval);
                    setButtonText("Quit game?");
                    return prevDuration;
                }
            });
        }, 1000);

        fetch(`http://192.168.1.132:8080/rock-paper-scissors/games/${sendGameIdToResult}`, {
            method: 'GET',
            headers: {
                token: sendPlayerIdToResult,
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(game => {
                const { move, opponentMove } = game;
                if (move && opponentMove) {
                    const outcomeMap = {
                        'ROCKPAPER': 'Lose',
                        'ROCKSCISSORS': 'Win',
                        'PAPERROCK': 'Win',
                        'PAPERSCISSORS': 'Lose',
                        'SCISSORSROCK': 'Lose',
                        'SCISSORSPAPER': 'Win'
                    };

                    setGameOutcome(outcomeMap[move + opponentMove] || 'Draw');
                    setButtonText("Play again");
                    clearInterval(interval);
                }
            })
            .catch(error => console.error('Failed to fetch game result:', error));

        return () => clearInterval(interval);
    }, [sendGameIdToResult, sendPlayerIdToResult]);

    const handleButtonPress = () => {
        if (["Play again", "Quit game?"].includes(buttonText)) {
            navigation.navigate("PickGamePage", { id: sendPlayerIdToResult });
        }
    };

    return (
        <LinearGradient colors={['#dbe6fd', '#a3b8ed']} style={styles.container}>
            <Text style={styles.resultText}>{gameOutcome}</Text>
            <Pressable onPress={handleButtonPress} style={styles.actionButton}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultText: {
        color: "#0099ff",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20
    },
    actionButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: '#0099ff',
        borderRadius: 5,
        alignItems: "center",
        elevation: 3
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    }
});

export default ResultsPage;
