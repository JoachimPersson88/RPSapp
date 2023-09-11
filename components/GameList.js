//GameList.js
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';

function GameList({ navigation, route }) {
    const { id } = route.params;
    const [playerId, setPlayerId] = useState(id);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        showGames();
    }, []);

    const saveGameId = async (gameId) => {
        navigation.navigate("PlayPage", { playerGameIdSend: gameId, playerIdSend: playerId });
    }

    const showGames = async () => {
        try {
            const response = await fetch("http://192.168.1.132:8080/rock-paper-scissors/games", {
                method: "GET"
            });
            const allPlayers = await response.json();
            setPlayers(allPlayers);
        } catch (error) {
            console.error("Error showing games:", error.message);
        }
    }

    const joinGame = async (theGameId) => {
        try {
            const res = await fetch(`http://192.168.1.132:8080/rock-paper-scissors/games/join/${theGameId}`, {
                method: "GET",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            await saveGameId(data.id);
        } catch (error) {
            console.error("Error joining game:", error.message);
        }
    }

    const createGame = async () => {
        try {
            const res = await fetch("http://192.168.1.132:8080/rock-paper-scissors/games/start", {
                method: "POST",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            await saveGameId(data.id);
        } catch (error) {
            console.error("Error creating game:", error.message);
        }
    };

    return (
        <LinearGradient colors={['#dbe6fd', '#a3b8ed']} style={styles.container}>
            <Pressable onPress={createGame} style={styles.button}>
                <Text style={styles.buttonText}>Create game</Text>
            </Pressable>

            <Pressable onPress={showGames} style={styles.button}>
                <Text style={styles.buttonText}>List of players</Text>
            </Pressable>

            <View style={styles.gameListBody}>
                <ScrollView>
                    {players.map(item => (
                        <Pressable
                            key={item.id}
                            onPress={() => joinGame(item.id)}
                            style={({ pressed }) => [
                                { backgroundColor: pressed ? '#8e8f64' : '#bdcb24' },
                                styles.listButton
                            ]}
                        >
                            <Text style={styles.buttonText}>{item.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    gameListBody: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#e8c967",
        borderRadius: 8,
        padding: 15
    },
    text: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 30
    },
    button: {
        width: 200,
        height: 60,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: '#0099ff',
        borderRadius: 5,
        elevation: 3
    },
    listButton: {
        width: '100%',
        height: 60,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: '500'
    }
});

export default GameList;
