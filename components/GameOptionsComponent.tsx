//GameOptionsComponent.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface GameOptions {
    startGame: () => void;
    getPlayers: () => void;
  }
//Klasskomponent för spelarens övergång
class GameOptionsComponent extends React.Component<GameOptions> {
    handleButtonClick = (action: () => void) => {
      action();
    }
  
    render() {
      let {startGame, getPlayers} = this.props;
      return (
        <View>
          <TouchableOpacity onPress={() => this.handleButtonClick(getPlayers)}>
            <Text>Find players</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleButtonClick(startGame)}>
            <Text>Start game</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
export default GameOptionsComponent;

