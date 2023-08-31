//GameListComponent.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { joinGameFunction } from './api';

const GameListComponent = ({ players, token, setGameId, setShowGames, setShowMoves, setShowGameList }) => {
  return (
    <View>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Player
            key={item.id}
            {...item}
            token={token}
            setGameId={setGameId}
            setShowGames={setShowGames}
            setShowMoves={setShowMoves}
            setShowGameList={setShowGameList}
          />
        )}
      />
    </View>
  );
};

class Player extends React.Component {
  render() {
    const { id, name, token, setGameId, setShowGames, setShowMoves, setShowGameList } = this.props;

    const joinGame = async () => {
      setShowMoves(true);
      setShowGames(false);
      setShowGameList(false);

      try {
        const response = await joinGameFunction(token, id);
        const player = await response.json();
        console.log(player.id);
        setGameId(player.id);
      } catch (error) {
        console.error("Error joining the game:", error);
      }
    };

    return (
      <TouchableOpacity onPress={joinGame}>
        <Text>Join {name}'s game?</Text>
      </TouchableOpacity>
    );
  }
}

export default GameListComponent;