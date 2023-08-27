//GameListComponent.tsx
import React from 'react';
import { joinGameFunction } from "../api";

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
        <div className="slide-in-from-right-glc">
            <ul>
                {players.map(player => (
                    <Player key={player.id} {...player} token={token} setGameId={setGameId} setShowGames={setShowGames} setShowMoves={setShowMoves} setShowGameList={setShowGameList} />
                ))}
            </ul>
        </div>
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
            <li className="highlight-on-hover">
                <button className="button-pressed" onClick={joinGame}>Join {name}s game?</button>
            </li>
        );
    }
}

//Exporterar GameListComponent som standardexport för denna modul
export default GameListComponent;
