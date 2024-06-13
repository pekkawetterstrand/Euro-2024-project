// registration.js
function handleRegistration() {
    const registrationForm = document.getElementById('registration-form');
    const registrationError = document.getElementById('registration-error');
    const registrationPage = document.getElementById('registration-page');
    const gamePage = document.getElementById('game-page');

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

    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
        registrationPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    }
}

// groupTable.js
const groups = {
    A: [
        { country: 'Germany', played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'France', played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Italy', played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Spain', played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
    ],
};

function updateGroupTable(game, score1, score2) {
    const group = groups[game.group];
    if (!group) return;

    const team1 = group.find(team => team.country === game.team1);
    const team2 = group.find(team => team.country === game.team2);

    if (!team1 || !team2) return;

    team1.played += 1;
    team2.played += 1;

    team1.goalsFor += parseInt(score1);
    team1.goalsAgainst += parseInt(score2);
    team2.goalsFor += parseInt(score2);
    team2.goalsAgainst += parseInt(score1);

    if (score1 > score2) {
        team1.won += 1;
        team2.lost += 1;
        team1.points += 3;
    } else if (score1 < score2) {
        team2.won += 1;
        team1.lost += 1;
        team2.points += 3;
    } else {
        team1.points += 1;
        team2.points += 1;
    }

    group.sort((a, b) => b.points - a.points);

    renderGroupTable();
}

function renderGroupTable() {
    const groupTableContainer = document.getElementById('group-table');
    groupTableContainer.innerHTML = '';

    for (const groupName in groups) {
        const group = groups[groupName];
        const table = document.createElement('table');
        table.classList.add('group-table');

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Country</th>
                <th>Games Played</th>
                <th>Games Won</th>
                <th>Games Lost</th>
                <th>Goals For</th>
                <th>Goals Against</th>
                <th>Points</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        group.forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.country}</td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.lost}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td>${team.points}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        groupTableContainer.appendChild(table);
    }
}

// main.js
document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { team1: 'Germany', team2: 'France', date: '2024-06-14', group: 'A' },
        { team1: 'Italy', team2: 'Spain', date: '2024-06-15', group: 'A' },
        // Add more game objects as needed
    ];

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
            <div>
                <span class="flag-icon flag-icon-${getCountryCode(game.team1).toLowerCase()}"></span> ${game.team1} 
                vs 
                <span class="flag-icon flag-icon-${getCountryCode(game.team2).toLowerCase()}"></span> ${game.team2}
                - ${game.date}
            </div>
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

    displayGuesses();
    handleRegistration();
});

// utils.js
function renderGameList() {
    // Example function to render game list
    const gamePage = document.getElementById('game-page');
    const games = ['Game 1', 'Game 2', 'Game 3']; // Example game data

    games.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.textContent = game;
        gamePage.appendChild(gameElement);
    });
}
