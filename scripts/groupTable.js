import { games } from './games.js';

const groups = {};

// Initialize groups based on the teams in the games
games.forEach(game => {
    if (!groups[game.group]) {
        groups[game.group] = [];
    }
    if (!groups[game.group].find(team => team.country === game.team1)) {
        groups[game.group].push({ country: game.team1, played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 });
    }
    if (!groups[game.group].find(team => team.country === game.team2)) {
        groups[game.group].push({ country: game.team2, played: 0, won: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 });
    }
});

const updateGroupTable = (game, score1, score2) => {
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
    determineKnockoutTeams();
};

const determineKnockoutTeams = () => {
    const knockoutGames = games.filter(game => game.group === '38' || game.group === '37' || game.group === '40' || game.group === '39' || game.group === '42' || game.group === '41' || game.group === '43' || game.group === '44' || game.group === '45' || game.group === '46' || game.group === '48' || game.group === '47' || game.group === '49' || game.group === '50' || game.group === 'Final');
    knockoutGames.forEach(game => {
        const team1 = getTeamName(game.team1);
        const team2 = getTeamName(game.team2);
        game.team1 = team1;
        game.team2 = team2;
    });
};

const getTeamName = (placeholder) => {
    const match = placeholder.match(/([1-3])([A-F])/);
    if (match) {
        const rank = parseInt(match[1]);
        const group = match[2];
        if (groups[group]) {
            return groups[group][rank - 1].country;
        }
    }
    return placeholder;
};

const renderGroupTable = () => {
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
};

export { updateGroupTable, renderGroupTable };
