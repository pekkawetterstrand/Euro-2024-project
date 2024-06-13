// groupTable.js

import games from './games.js';

const groups = {};

games.forEach(game => {
    const { group, team1, team2 } = game;
    if (!groups[group]) {
        groups[group] = [];
    }
    if (!groups[group].includes(team1)) {
        groups[group].push(team1);
    }
    if (!groups[group].includes(team2)) {
        groups[group].push(team2);
    }
});

const createGroupTable = () => {
    const groupTableContainer = document.getElementById('group-table-container');
    groupTableContainer.innerHTML = ''; // Clear existing content

    for (const group in groups) {
        const groupTable = document.createElement('table');
        groupTable.className = 'group-table';
        const caption = document.createElement('caption');
        caption.textContent = `Group ${group}`;
        groupTable.appendChild(caption);

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Team', 'Played', 'Won', 'Drawn', 'Lost', 'GF', 'GA', 'GD', 'Points'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        groupTable.appendChild(thead);

        const tbody = document.createElement('tbody');
        groups[group].forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team}</td>
                <td id="${team}-played">0</td>
                <td id="${team}-won">0</td>
                <td id="${team}-drawn">0</td>
                <td id="${team}-lost">0</td>
                <td id="${team}-gf">0</td>
                <td id="${team}-ga">0</td>
                <td id="${team}-gd">0</td>
                <td id="${team}-points">0</td>
            `;
            tbody.appendChild(row);
        });
        groupTable.appendChild(tbody);
        groupTableContainer.appendChild(groupTable);
    }
};

const updateGroupTable = (results) => {
    const stats = {};

    results.forEach(result => {
        const { team1, team2, score1, score2 } = result;

        if (!stats[team1]) stats[team1] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
        if (!stats[team2]) stats[team2] = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };

        stats[team1].played++;
        stats[team2].played++;
        stats[team1].gf += score1;
        stats[team1].ga += score2;
        stats[team2].gf += score2;
        stats[team2].ga += score1;

        if (score1 > score2) {
            stats[team1].won++;
            stats[team1].points += 3;
            stats[team2].lost++;
        } else if (score1 < score2) {
            stats[team2].won++;
            stats[team2].points += 3;
            stats[team1].lost++;
        } else {
            stats[team1].drawn++;
            stats[team2].drawn++;
            stats[team1].points++;
            stats[team2].points++;
        }

        stats[team1].gd = stats[team1].gf - stats[team1].ga;
        stats[team2].gd = stats[team2].gf - stats[team2].ga;
    });

    for (const team in stats) {
        document.getElementById(`${team}-played`).textContent = stats[team].played;
        document.getElementById(`${team}-won`).textContent = stats[team].won;
        document.getElementById(`${team}-drawn`).textContent = stats[team].drawn;
        document.getElementById(`${team}-lost`).textContent = stats[team].lost;
        document.getElementById(`${team}-gf`).textContent = stats[team].gf;
        document.getElementById(`${team}-ga`).textContent = stats[team].ga;
        document.getElementById(`${team}-gd`).textContent = stats[team].gd;
        document.getElementById(`${team}-points`).textContent = stats[team].points;
    }
};

export { createGroupTable, updateGroupTable };
