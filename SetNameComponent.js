//SetNameComponent.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

class SetNameComponent extends React.Component {
    render() {
        const { name, setName, setAnonymousPlayer } = this.props;

        return (
            <View>
                <Text>ROCK PAPER SCISSORS</Text>
                <Text>Type in your name below</Text>
                <TextInput value={name} onChangeText={text => setName(text)} />
                <TouchableOpacity onPress={setAnonymousPlayer}>
                    <Text>Play as {name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SetNameComponent;