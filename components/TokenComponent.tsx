//TokenComponent.tsx
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { fetchNewToken } from "../api";
import GameBoard from "../GameBoard";

interface ITokenContext {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenComponent = createContext<ITokenContext>({
    token: "",
    setToken: () => {},
});

function Token() {
    const [token, setToken] = useState("");

    useEffect(() => {
        fetchNewToken()
            .then((newToken) => {
                setToken(newToken);
                console.log("token=" + newToken);
                localStorage.setItem("token", newToken);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <TokenComponent.Provider value={{ token, setToken }}>
            <GameBoard />
        </TokenComponent.Provider>
    );
}

export default Token;
