import { updateGroupTable } from './groupTable.js';

const games = [
    { team1: 'Germany', team2: 'France', date: '2024-06-14', group: 'A' },
    { team1: 'Italy', team2: 'Spain', date: '2024-06-15', group: 'A' },
    // Other game objects...
];

document.addEventListener('DOMContentLoaded', () => {
    const registrationPage = document.getElementById('registration-page');
    const gamePage = document.getElementById('game-page');
    const registrationForm = document.getElementById('registration-form');
    const registrationError = document.getElementById('registration-error');
    const gameList = document.getElementById('game-list');

    const loadGuesses = () => {
        const guesses = localStorage.getItem('guesses');
        return guesses ? JSON.parse(guesses) : {};
    };

    const saveGuess = (game, score1, score2) => {
        const guesses = loadGuesses();
        guesses[`${game.team1} vs ${game.team2}`] = { score1, score2 };
        localStorage.setItem('guesses', JSON.stringify(guesses));
        updateGroupTable(game, score1, score2);
    };

    const displayGuesses = () => {
        const guesses = loadGuesses();
        for (const game of games) {
            const key = `${game.team1} vs ${game.team2}`;
            if (guesses[key]) {
                const gameDiv = document.querySelector(`.game[data-key="${key}"]`);
                if (gameDiv) {
                    const inputs = gameDiv.querySelectorAll('input');
                    inputs[0].value = guesses[key].score1;
                    inputs[1].value = guesses[key].score2;
                }
            }
        }
    };

    const validateScores = (score1, score2) => {
        if (isNaN(score1) || isNaN(score2) || score1 === '' || score2 === '') {
            return 'Please enter valid numeric scores.';
        }
        if (score1 < 0 || score1 > 10 || score2 < 0 || score2 > 10) {
            return 'Scores must be between 0 and 10.';
        }
        return null;
    };

    const getCountryCode = (countryName) => {
        switch (countryName.toLowerCase()) {
            case 'germany':
                return 'de';
            case 'france':
                return 'fr';
            case 'italy':
                return 'it';
            case 'spain':
                return 'es';
            // Add more cases for other countries as needed
            default:
                return 'unknown';
        }
    };

    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        const gameKey = `${game.team1} vs ${game.team2}`;
        gameDiv.setAttribute('data-key', gameKey);
        gameDiv.innerHTML = `
            <div><span class="flag-icon flag-icon-${getCountryCode(game.team1).toLowerCase()}"></span> ${game.team1} vs <span class="flag-icon flag-icon-${getCountryCode(game.team2).toLowerCase()}"></span> ${game.team2}</div>
            <div>${game.date}</div>
            <input type="text" class="goal-input" placeholder="Score for ${game.team1}">
            <input type="text" class="goal-input" placeholder="Score for ${game.team2}">
            <button>Submit Guess</button>
            <div class="error-message" style="color: red; display: none;"></div>
        `;
        const button = gameDiv.querySelector('button');
        button.addEventListener('click', () => {
            const inputs = gameDiv.querySelectorAll('input');
            const errorDiv = gameDiv.querySelector('.error-message');
            const score1 = inputs[0].value;
            const score2 = inputs[1].value;
            const validationError = validateScores(score1, score2);
            if (validationError) {
                errorDiv.textContent = validationError;
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
                saveGuess(game, score1, score2);
                alert('Guess submitted!');
            }
        });
        gameList.appendChild(gameDiv);
    });

    // Check if a nickname is already stored and display the game page if it is
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
        registrationPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    }

    displayGuesses();

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nickname = document.getElementById('nickname').value.trim();
        if (nickname) {
            localStorage.setItem('nickname', nickname);
            registrationPage.classList.add('hidden');
            gamePage.classList.remove('hidden');
        } else {
            registrationError.textContent = 'Please enter a valid name or nickname.';
            registrationError.style.display = 'block';
        }
    });
});
