const groups = {
    A: [
        { country: 'Germany', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'France', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Italy', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        { country: 'Spain', gamesPlayed: 0, gamesWon: 0, gamesLost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
        // Add more teams as necessary...
    ],
    // Add more groups as necessary...
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
    const groupTableContainer = document.getElementById('group-table');
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

export { updateGroupTable };
