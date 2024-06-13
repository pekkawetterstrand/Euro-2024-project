export function renderGameList() {
    // Example function to render game list
    const gamePage = document.getElementById('game-page');
    const games = ['Game 1', 'Game 2', 'Game 3']; // Example game data

    games.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.textContent = game;
        gamePage.appendChild(gameElement);
    });
}
