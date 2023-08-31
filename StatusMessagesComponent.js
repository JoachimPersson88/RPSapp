//StatusMessagesComponent.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class StatusMessagesComponent extends React.Component {
    render() {
        const { showWaitingForMove, showWin, showLose, showDraw, newGame } = this.props;

        return (
            <View>
                {showWaitingForMove && <Text>Waiting for opponent</Text>}
                {showWin && <Text>You won!</Text>}
                {showLose && <Text>You lost!</Text>}
                {showDraw && <Text>It's a draw!</Text>}
                {(showWin || showLose || showDraw) && (
                    <TouchableOpacity onPress={newGame}>
                        <Text>Play again?</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

export default StatusMessagesComponent;