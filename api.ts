// api.ts

// Skapar token till spelaren
export const fetchNewToken = () =>
    fetch("http://localhost:8080/rock-paper-scissors/auth/token").then((response) =>
        response.json()
    );

// Sparar spelarens namn
export const setNameFunction = (token: string, name: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/user/name", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
    });

// Hämtar öppna spel
export const getAllGames = () =>
    fetch("http://localhost:8080/rock-paper-scissors/games", {
        method: "GET",
    }).then((response) => response.json());

// Startar ditt spel
export const startGameFunction = (token: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/start", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
    });

// Funktion för att gå med i andras spel
export const joinGameFunction = (token: string, gameId: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/join/" + gameId, {
        method: "GET",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
    });

// Sparar spelarens drag
export const makeMoveFunction = (token: string, playerMove: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/move/" + playerMove, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
    });

// Funktion för att uppdatera spelstatus
export const gameInfoUpdate = (token: string, gameId: string) =>
    fetch("http://localhost:8080/rock-paper-scissors/games/" + gameId, {
        method: "GET",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
    });
