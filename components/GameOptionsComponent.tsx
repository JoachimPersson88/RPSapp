//GameOptionsComponent.tsx
import React from 'react';

interface GameOptions {
    startGame: () => void;
    getPlayers: () => void;
}
//Klasskomponent för spelarens övergång
class GameOptionsComponent extends React.Component<GameOptions> {
    handleButtonClick = (action: () => void) => {
        action();
        const buttonElem = document.getElementById('game-button');
        buttonElem?.classList.add('button-clicked');
        setTimeout(() => {
            buttonElem?.classList.remove('button-clicked');
        }, 500);
    }

    render() {
        let {startGame, getPlayers} = this.props;
        return (
            <div className="fade-in-goc">
                <button
                    id="game-button"
                    className="scale-up"
                    onClick={() => this.handleButtonClick(getPlayers)}>
                    Find players
                </button>
                <button
                    id="game-button"
                    className="scale-up"
                    onClick={() => this.handleButtonClick(startGame)}>
                    Start game
                </button>
            </div>
        );
    }
}

export default GameOptionsComponent;

