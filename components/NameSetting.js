//NameSetting.js
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';


function NameSetting({ navigation }) {
    const [name, setName] = useState("");
    const [playerId, setPlayerId] = useState("");

    useEffect(() => {
        getId();
    }, []);

    const getId = async () => {
        try {
            const response = await fetch('http://192.168.1.132:8080/rock-paper-scissors/auth/token');
            if (!response.ok) {
                console.error("Failed to get ID");
                throw new Error("Failed to get ID");
            }
            const json = await response.json();
            setPlayerId(json);
        } catch (error) {
            console.error("Error getting ID:", error.message);
        }
    };

    const setNameForToken = async () => {
        try {
            const id = playerId || await getId();

            if (!id) {
                console.error("Failed to retrieve ID/token.");
                return;
            }

            const response = await fetch('http://192.168.1.132:8080/rock-paper-scissors/user/name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: playerId,
                },
                body: JSON.stringify({ name })
            });

            if (response.ok) {
                navigation.navigate("PickGamePage", { id: playerId });
            } else {
                console.error("Error setting name for token.");
            }
        } catch (error) {
            console.error("Error setting name:", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#dbe6fd', '#a3b8ed']} style={styles.container}>
                <Text style={styles.title}>Enter your name:</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                    placeholder="Your Name"
                />
                <Pressable onPress={setNameForToken} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        borderBottomWidth: 2,
        borderColor: '#555',
        paddingVertical: 5,
        marginBottom: 20,
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
        color: '#333'
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: '#0099ff',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default NameSetting;
