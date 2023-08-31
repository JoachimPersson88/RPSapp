//GameBoard.js

import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { gameInfoUpdate, getAllGames, makeMoveFunction, setNameFunction, startGameFunction } from './api';
import GameListComponent from './GameListComponent';
import GameOptionsComponent from './GameOptionsComponent';
import MoveButtonsComponent from './MoveButtonsComponent';
import SetNameComponent from './SetNameComponent';
import StatusMessagesComponent from './StatusMessagesComponent';
import { TokenContext } from './TokenContext';




function GameBoard() {

    const { token, setToken } = useContext(TokenContext);
    const [players, setPlayers] = useState([]);
    const [gameId, setGameId] = useState("")
    const [name, setName] = useState("");
    const [showMoves, setShowMoves] = useState(false)
    const [showGames, setShowGames] = useState(false)
    const [showWaitingForMove, setShowWaitingForMove] = useState(false)
    const [showSetName, setShowSetName] = useState(true)
    const [showWin, setShowWin] = useState(false)
    const [showLose, setShowLose] = useState(false)
    const [showDraw, setShowDraw] = useState(false)
    const [showGameList ,setShowGameList] = useState(false)
    const interval = setInterval(updateGameStatus, 500);
    const [winOrLose, setWinOrLose] = useState(false)
        
    useEffect(() => {
        const interval = setInterval(updateGameStatus, 500);
        return () => clearInterval(interval);
      }, [winOrLose, token, gameId]);  // Added dependencies
    

 const makePlayerMoveStone = () => {
    setShowMoves(false);
    setShowWaitingForMove(true);
    setWinOrLose(true);
    makeMoveFunction(token, "ROCK")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
            setShowWaitingForMove(false);
        });
};
    const makePlayerMoveScissor = () => {
        setShowMoves(false);
        setShowWaitingForMove(true);
        setWinOrLose(true);
        makeMoveFunction(token, "SCISSOR")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                setShowWaitingForMove(false);
            });
    };
    const makePlayerMovePaper = () => {
        setShowMoves(false);
        setShowWaitingForMove(true);
        setWinOrLose(true);
        makeMoveFunction(token, "PAPER")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                setShowWaitingForMove(false);
            });
    };

    const setAnonymousPlayer = () => {
        setShowSetName(false)
        setShowGames(true)
        setNameFunction(token, name.toString())
            .then(response => {
                console.log(response)
            })
    }
    const newGame = () => {
        setWinOrLose(false)
        setShowWin(false)
        setShowLose(false)
        setShowDraw(false)
        setShowGames(true)
    }

    function updateGameStatus() {
        if (!winOrLose) return;

        console.log(winOrLose);

        gameInfoUpdate(token, gameId)
            .then(response => response.json())
            .then(game => {
                const { move, opponentMove, opponentName } = game;

                if (move !== null && opponentMove !== null) {
                    clearInterval(interval);
                    setShowWaitingForMove(false);

                    if (move === opponentMove) {
                        console.log("Draw");
                        setShowDraw(true);
                    } else if (
                        (move === "ROCK" && opponentMove === "PAPER") ||
                        (move === "PAPER" && opponentMove === "SCISSORS") ||
                        (move === "SCISSORS" && opponentMove === "ROCK")
                    ) {
                        console.log("Lose!!");
                        setShowLose(true);
                    } else {
                        console.log("Win!!");
                        setShowWin(true);
                    }

                    setWinOrLose(false);
                } else if (opponentName !== null) {
                    console.log("No name of opponent.. still ok right!?! ");
                }
            });
    }

    const startGame = () => {
        setShowMoves(true)
        setShowGames(false)
        setShowGameList(false)
        startGameFunction(token)
            .then(response => response.json())
            .then(player => {
                console.log(player.id)
                setGameId(player.id)
            })
    }

    const getPlayers = () => {
        setShowGameList(true)
        getAllGames()
            .then((allPlayers) => {
                setPlayers(allPlayers)

            })
    }
    return (
        <View>
            {showSetName && <SetNameComponent name={name} setName={setName} setAnonymousPlayer={setAnonymousPlayer} />}
            {showGames && <GameOptionsComponent startGame={startGame} getPlayers={getPlayers} />}
            {showGameList && <GameListComponent players={players} token={token} setGameId={setGameId} setShowGames={setShowGames} setShowMoves={setShowMoves} setShowGameList={setShowGameList} />}
            {showMoves && <MoveButtonsComponent makeMoveStone={makePlayerMoveStone} makeMovePaper={makePlayerMovePaper} makeMoveScissor={makePlayerMoveScissor} />}
            <StatusMessagesComponent showWaitingForMove={showWaitingForMove} showWin={showWin} showLose={showLose} showDraw={showDraw} newGame={newGame} />
        </View>
    );
}

export default GameBoard;