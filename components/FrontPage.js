//FrontPage.js
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, Platform } from 'react-native';

function FrontPage({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const fetchToken = async () => {
        try {
            const response = await fetch(`http://192.168.1.132:8080/rock-paper-scissors/auth/token`);
            const data = await response.json();

            if (data && data.token) {
                navigation.navigate('NamePage');
            }
        } catch (error) {
            console.error("Error fetching token:", error);
            Alert.alert('Error', 'Failed to fetch token. Please check your connection and try again.');
        }
    };

    const handleModalToggle = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#dbe6fd', '#a3b8ed']} style={styles.container}>
                <Text style={styles.welcomeText}>Lets play some Rock, Paper, Scissors!</Text>

                <Pressable onPress={handleModalToggle} activeOpacity={0.7}>
                    <Text style={styles.howToPlayText}>How to play?</Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        fetchToken();
                        navigation.navigate('NamePage');
                    }}
                    style={styles.startButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.startButtonText}>Start Game</Text>
                </Pressable>

                <InfoModal isVisible={isModalVisible} onClose={handleModalToggle} />
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const InfoModal = ({ isVisible, onClose }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Rock beats Scissors, Scissors beats Paper, and Paper beats Rock. Choose your move and see if you can defeat your opponent!</Text>
                    <Pressable
                        style={styles.closeButton}
                        onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    howToPlayText: {
        textDecorationLine: 'underline',
        marginTop: 20
    },
    startButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#0099ff',
        borderRadius: 5
    },
    startButtonText: {
        color: 'white'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10
    },
    closeButton: {
        marginTop: 15,
        alignSelf: 'flex-end'
    },
    closeButtonText: {
        color: 'blue'
    }
});

export default FrontPage;
