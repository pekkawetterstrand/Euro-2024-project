const games = [
    { team1: 'Germany', team2: 'Scotland', date: '2024-06-14' },
    { team1: 'Hungary', team2: 'Switzerland', date: '2024-06-15' },
    { team1: 'Spain', team2: 'Croatia', date: '2024-06-15' },
    { team1: 'Italy', team2: 'Albania', date: '2024-06-15' },
    { team1: 'Serbia', team2: 'England', date: '2024-06-16' },
    { team1: 'Slovenia', team2: 'Denmark', date: '2024-06-16' },
    { team1: 'Poland', team2: 'Netherlands', date: '2024-06-17' },
    { team1: 'Austria', team2: 'France', date: '2024-06-17' },
    { team1: 'Belgium', team2: 'Slovakia', date: '2024-06-18' },
    { team1: 'Romania', team2: 'Ukraine', date: '2024-06-18' },
    { team1: 'Turkey', team2: 'Georgia', date: '2024-06-19' },
    { team1: 'Portugal', team2: 'Czechia', date: '2024-06-19' },
    { team1: 'Scotland', team2: 'Switzerland', date: '2024-06-20' },
    { team1: 'Germany', team2: 'Hungary', date: '2024-06-20' },
    { team1: 'Croatia', team2: 'Albania', date: '2024-06-21' },
    { team1: 'Spain', team2: 'Italy', date: '2024-06-21' },
    { team1: 'Denmark', team2: 'England', date: '2024-06-22' },
    { team1: 'Slovenia', team2: 'Serbia', date: '2024-06-22' },
    { team1: 'Poland', team2: 'Austria', date: '2024-06-23' },
    { team1: 'Netherlands', team2: 'France', date: '2024-06-23' },
    { team1: 'Slovakia', team2: 'Ukraine', date: '2024-06-24' },
    { team1: 'Belgium', team2: 'Romania', date: '2024-06-24' },
    { team1: 'Turkey', team2: 'Portugal', date: '2024-06-25' },
    { team1: 'Georgia', team2: 'Czechia', date: '2024-06-25' },
    { team1: 'Switzerland', team2: 'Germany', date: '2024-06-26' },
    { team1: 'Scotland', team2: 'Hungary', date: '2024-06-26' },
    { team1: 'Albania', team2: 'Spain', date: '2024-06-27' },
    { team1: 'Croatia', team2: 'Italy', date: '2024-06-27' },
    { team1: 'England', team2: 'Slovenia', date: '2024-06-28' },
    { team1: 'Denmark', team2: 'Serbia', date: '2024-06-28' },
    { team1: 'Netherlands', team2: 'Austria', date: '2024-06-29' },
    { team1: 'France', team2: 'Poland', date: '2024-06-29' },
    { team1: 'Slovakia', team2: 'Romania', date: '2024-06-30' },
    { team1: 'Ukraine', team2: 'Belgium', date: '2024-06-30' },
    { team1: 'Georgia', team2: 'Portugal', date: '2024-07-01' },
    { team1: 'Czechia', team2: 'Turkey', date: '2024-07-01' }
    // Other game objects...
];

const games = [
    { team1: 'Germany', team2: 'France', date: '2024-06-14', group: 'A' },
    { team1: 'Italy', team2: 'Spain', date: '2024-06-15', group: 'A' },
    // Other game objects...
];

const groups = {
    'A': [
        { country: 'Germany', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'France', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Italy', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Spain', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
    ],
    // Other groups...
};

document.addEventListener('DOMContentLoaded', () => {
    const registrationPage = document.getElementById('registration-page');
    const gamePage = document.getElementById('game-page');
    const registrationForm = document.getElementById('registration-form');
    const registrationError = document.getElementById('registration-error');
    const gameList = document.getElementById('game-list');
    const groupTableContainer = document.getElementById('group-table');

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

    const updateGroupTable = (game, score1, score2) => {
        const group = groups[game.group];
        const team1 = group.find(team => team.country === game.team1);
        const team2 = group.find(team => team.country === game.team2);

        team1.gamesPlayed++;
        team2.gamesPlayed++;

        team1.goalsFor += parseInt(score1);
        team1.goalsAgainst += parseInt(score2);
        team2.goalsFor += parseInt(score2);
        team2.goalsAgainst += parseInt(score1);

        if (score1 > score2) {
            team1.gamesWon++;
            team2.gamesLost++;
            team1.points += 3;
        } else if (score1 < score2) {
            team2.gamesWon++;
            team1.gamesLost++;
            team2.points += 3;
        } else {
            team1.points += 1;
            team2.points += 1;
        }

        updateGroupTableDisplay();
    };

    const updateGroupTableDisplay = () => {
        groupTableContainer.innerHTML = '';
        for (const groupName in groups) {
            const group = groups[groupName];
            group.sort((a, b) => b.points - a.points);
            let tableHtml = `
                <h3>Group ${groupName}</h3>
                <table class="group-table">
                    <tr>
                        <th>Country</th>
                        <th>GP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>Pts</th>
                    </tr>
            `;
            for (const team of group) {
                tableHtml += `
                    <tr>
                        <td>${team.country}</td>
                        <td>${team.gamesPlayed}</td>
                        <td>${team.gamesWon}</td>
                        <td>${team.gamesLost}</td>
                        <td>${team.goalsFor}</td>
                        <td>${team.goalsAgainst}</td>
                        <td>${team.points}</td>
                    </tr>
                `;
            }
            tableHtml += '</table>';
            groupTableContainer.innerHTML += tableHtml;
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
    updateGroupTableDisplay();

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
