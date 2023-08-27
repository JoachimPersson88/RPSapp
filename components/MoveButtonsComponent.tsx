//MoveButtonsComponent.tsx
import React from 'react';

//Definiera typer för spelarens drag
interface MoveButtons {
    makeMoveStone: () => void;
    makeMovePaper: () => void;
    makeMoveScissor: () => void;
}
//Klasskomponent för spelarens drag
class MoveButtonsComponent extends React.Component<MoveButtons> {
    render() {
        let {makeMoveStone, makeMovePaper, makeMoveScissor} = this.props;
        return (
            <div className="slide-in-from-bottom">
                <br />
                <button className="button-hover-scale-mbc button-pressed" onClick={makeMoveScissor}>SCISSOR</button>
                <br />
                <br />
                <button className="button-hover-scale-mbc button-pressed" onClick={makeMovePaper}>PAPER</button>
                <br />
                <br />
                <button className="button-hover-scale-mbc button-pressed" onClick={makeMoveStone}>ROCK</button>
                <br />
            </div>
        );
    }
}

export default MoveButtonsComponent;
