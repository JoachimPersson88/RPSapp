//GameOptionsComponent.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const GameOptionsComponent = ({ startGame, getPlayers }) => {
  const handleButtonClick = (action) => {
    action();
  }

  return (
    <View>
      <TouchableOpacity onPress={() => handleButtonClick(getPlayers)}>
        <Text>Find players</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleButtonClick(startGame)}>
        <Text>Start game</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GameOptionsComponent;