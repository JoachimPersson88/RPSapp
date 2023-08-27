//StatusMessagesComponent.tsx
import React from 'react';

interface StatusMessage {
    showWaitingForMove: boolean;
    showWin: boolean;
    showLose: boolean;
    showDraw: boolean;
    newGame: () => void;
}
//Klasskomponent för spelstatus
class StatusMessagesComponent extends React.Component<StatusMessage> {
    render() {
        let {showWaitingForMove, showWin, showLose, showDraw, newGame} = this.props;
        return (
            <>
                {showWaitingForMove && <div className="fade-in-smc"><h1>Waiting for opponent</h1></div>}
                {showWin && <div className="fade-in-smc jiggle"><h1>You won!</h1>
                    <button className="button-hover-scale-smc" onClick={newGame}>Play AGAIN!</button>
                </div>}
                {showLose && <div className="fade-in-smc jiggle"><h1>You lost!</h1>
                    <button className="button-hover-scale-smc" onClick={newGame}>Play again?</button>
                </div>}
                {showDraw && <div className="fade-in-smc"><h1>It's a draw!</h1>
                    <button className="button-hover-scale-smc" onClick={newGame}>Play again?</button>
                </div>}
            </>
        );
    }
}

export default StatusMessagesComponent;
