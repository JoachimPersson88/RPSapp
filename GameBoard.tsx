//GameBoard.tsx

//Importera nödvändiga dependencies
import { useContext, useState } from "react";
import { TokenComponent } from "./components/TokenComponent";
import {gameInfoUpdate, getAllGames, makeMoveFunction, setNameFunction, startGameFunction} from "./api";
import SetNameComponent from './components/SetNameComponent';
import GameOptionsComponent from './components/GameOptionsComponent';
import GameListComponent from './components/GameListComponent';
import MoveButtonsComponent from './components/MoveButtonsComponent';
import StatusMessagesComponent from './components/StatusMessagesComponent';

//Main GameBoard funktionskomponent som håller spellogiken
function GameBoard() {
    //Deklarera och initiera nödvändiga tillstånds- och kontextvariabler
    const {token} = useContext(TokenComponent)
    const [players, setPlayers] = useState([])
    const [gameId, setGameId] = useState("")
    const [name, setname] = useState("")
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

    //Funktioner för olika spelaråtgärder som att göra ett drag
    const makePlayerMoveStone = () => {
        //Funktioner för sten-drag
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "ROCK")
            .then(response => {
                console.log(response)
            })
    }
    //Funktioner för sax-drag
    const makePlayerMoveScissor = () => {
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "SCISSORS")
            .then(response => {
                console.log(response)
            })
    }
    //Funktioner för påse-drag
    const makePlayerMovePaper = () => {
        setShowMoves(false)
        setShowWaitingForMove(true)
        setWinOrLose(true)
        makeMoveFunction(token, "PAPER")
            .then(response => {
                console.log(response)
            })
    }

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
    //Huvudrendering av GameBoard-komponenten som villkorligt visar andra komponenter baserat på spelets tillstånd
    return (
        <>
            {showSetName && <SetNameComponent name={name} setName={setname} setAnonymousPlayer={setAnonymousPlayer} />}
            {showGames && <GameOptionsComponent startGame={startGame} getPlayers={getPlayers} />}
            {showGameList && <GameListComponent players={players} token={token} setGameId={setGameId} setShowGames={setShowGames} setShowMoves={setShowMoves} setShowGameList={setShowGameList} />}
            {showMoves && <MoveButtonsComponent makeMoveStone={makePlayerMoveStone} makeMovePaper={makePlayerMovePaper} makeMoveScissor={makePlayerMoveScissor} />}
            <StatusMessagesComponent showWaitingForMove={showWaitingForMove} showWin={showWin} showLose={showLose} showDraw={showDraw} newGame={newGame} />
        </>
    )
}

export default GameBoard;

