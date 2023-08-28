//GameListComponent.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { joinGameFunction } from '../api';

//Trunkerad för korthetens skull
interface GameList {
    players: { id: string, name: string }[];
    token: string;
    setGameId: React.Dispatch<React.SetStateAction<string>>;
    setShowGames: React.Dispatch<React.SetStateAction<boolean>>;
    setShowMoves: React.Dispatch<React.SetStateAction<boolean>>;
    setShowGameList: React.Dispatch<React.SetStateAction<boolean>>;
}

//Main GameListComponent som visar listan över spelare
const GameListComponent: React.FC<GameList> = ({ players, token, setGameId, setShowGames, setShowMoves, setShowGameList }) => {
    return (
      <View>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
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
  }

//Definiera typer för individuella spelaregenskaper
interface IPlayer {
    id: string;
    name: string;
    token: string;
    setGameId: (id: string) => void;
    setShowGames: (value: boolean) => void;
    setShowMoves: (value: boolean) => void;
    setShowGameList: (value: boolean) => void;
  }

//Klasskomponent för att representera en enskild spelare
class Player extends React.Component<IPlayer> {
    render() {
      let {id, name, token, setGameId, setShowGames, setShowMoves, setShowGameList} = this.props;
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
      }
  
      return (
        <TouchableOpacity onPress={joinGame}>
          <Text>Join {name}'s game?</Text>
        </TouchableOpacity>
      );
    }
  }

//Exporterar GameListComponent som standardexport för denna modul
export default GameListComponent;
