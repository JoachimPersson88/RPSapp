//SetNameComponent.tsx
import React from 'react';

interface SetName {
    name: string;
    setName: (name: string) => void;
    setAnonymousPlayer: () => void;
}

class SetNameComponent extends React.Component<SetName> {
    render() {
        let { name, setName, setAnonymousPlayer } = this.props;
        return (
            <div className="fade-in-snc">
                <h1 className="slide-in-right">ROCK PAPER SCISSORS</h1>
                <h2>Type in your name below</h2>
                <input
                    className="input-animate"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <button
                    className="button-animate bounce-on-hover"
                    onClick={setAnonymousPlayer}>
                    Play as {name}
                </button>
            </div>
        );
    }
}

export default SetNameComponent;


