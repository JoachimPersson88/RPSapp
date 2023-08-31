    // api.js

    export const fetchNewToken = () => 
        fetch("http://localhost:8080/rock-paper-scissors/auth/token")
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            });


    export const setNameFunction = (token, name) => 
        fetch("http://localhost:8080/rock-paper-scissors/user/name", {
            method: "POST",
            headers: {
                token: token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
        });

    export const getAllGames = () => 
        fetch("http://localhost:8080/rock-paper-scissors/games", {
            method: "GET"
        }).then(response => response.json());

    export const startGameFunction = (token) => 
        fetch("http://localhost:8080/rock-paper-scissors/games/start", {
            method: "POST",
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        });

    export const joinGameFunction = (token, gameId) => 
        fetch("http://localhost:8080/rock-paper-scissors/games/join/" + gameId, {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        });

    export const makeMoveFunction = (token, playerMove) => 
        fetch("http://localhost:8080/rock-paper-scissors/games/move/" + playerMove, {
            method: "POST",
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        });

    export const gameInfoUpdate = (token, gameId) => 
        fetch("http://localhost:8080/rock-paper-scissors/games/" + gameId, {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": "application/json"
            }
        });
