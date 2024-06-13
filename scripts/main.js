// main.js
import games from './games.js';
import { createGroupTable, updateGroupTable } from './groupTable.js';
import { handleRegistration } from './registration.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');

    const loadGuesses = () => {
        const guesses = JSON.parse(localStorage.getItem('guesses')) || [];
        return guesses;
    };

    const saveGuesses = (guesses) => {
        localStorage.setItem('guesses', JSON.stringify(guesses));
    };

    const renderGames = () => {
        gameList.innerHTML = ''; // Clear existing games

        games.forEach((game, index) => {
            const gameElement = document.createElement('div');
            gameElement.className = 'game';
            gameElement.innerHTML = `
                <div>${game.date}: ${game.team1} vs ${game.team2}</div>
                <input type="number" id="score1-${index}" placeholder="0" />
                <span>-</span>
                <input type="number" id="score2-${index}" placeholder="0" />
            `;
            gameList.appendChild(gameElement);
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const guesses = [];

        games.forEach((game, index) => {
            const score1 = parseInt(document.getElementById(`score1-${index}`).value) || 0;
            const score2 = parseInt(document.getElementById(`score2-${index}`).value) || 0;
            guesses.push({ ...game, score1, score2 });
        });

        saveGuesses(guesses);
        updateGroupTable(guesses);
    };

    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', handleFormSubmit);

    handleRegistration();
    renderGames();
    createGroupTable();
    updateGroupTable(loadGuesses());
});
