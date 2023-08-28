//SetNameComponent.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface SetName {
    name: string;
    setName: (name: string) => void;
    setAnonymousPlayer: () => void;
  }

  class SetNameComponent extends React.Component<SetName> {
    render() {
      let { name, setName, setAnonymousPlayer } = this.props;
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


