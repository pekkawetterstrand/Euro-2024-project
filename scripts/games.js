// games.js
const games = [
    { team1: 'Germany', team2: 'Scotland', date: '2024-06-14', group: 'A' },
    { team1: 'Hungary', team2: 'Switzerland', date: '2024-06-15', group: 'A' },
    { team1: 'Spain', team2: 'Croatia', date: '2024-06-15', group: 'B' },
    { team1: 'Italy', team2: 'Albania', date: '2024-06-15', group: 'B' },
    { team1: 'Poland', team2: 'Netherlands', date: '2024-06-16', group: 'D' },
    { team1: 'Slovenia', team2: 'Denmark', date: '2024-06-16', group: 'C' },
    { team1: 'Serbia', team2: 'England', date: '2024-06-16', group: 'C' },
    { team1: 'Romania', team2: 'Ukraine', date: '2024-06-17', group: 'E' },
    { team1: 'Belgium', team2: 'Slovakia', date: '2024-06-17', group: 'E' },
    { team1: 'Austria', team2: 'France', date: '2024-06-17', group: 'D' },
    { team1: 'Türkiye', team2: 'Georgia', date: '2024-06-18', group: 'F' },
    { team1: 'Portugal', team2: 'Czechia', date: '2024-06-18', group: 'F' },
    { team1: 'Croatia', team2: 'Albania', date: '2024-06-19', group: 'B' },
    { team1: 'Germany', team2: 'Hungary', date: '2024-06-19', group: 'A' },
    { team1: 'Scotland', team2: 'Switzerland', date: '2024-06-19', group: 'A' },
    { team1: 'Slovenia', team2: 'Serbia', date: '2024-06-20', group: 'C' },
    { team1: 'Denmark', team2: 'England', date: '2024-06-20', group: 'C' },
    { team1: 'Spain', team2: 'Italy', date: '2024-06-20', group: 'B' },
    { team1: 'Slovakia', team2: 'Ukraine', date: '2024-06-21', group: 'E' },
    { team1: 'Poland', team2: 'Austria', date: '2024-06-21', group: 'D' },
    { team1: 'Netherlands', team2: 'France', date: '2024-06-21', group: 'D' },
    { team1: 'Georgia', team2: 'Czechia', date: '2024-06-22', group: 'F' },
    { team1: 'Türkiye', team2: 'Portugal', date: '2024-06-22', group: 'F' },
    { team1: 'Belgium', team2: 'Romania', date: '2024-06-22', group: 'E' },
    { team1: 'Switzerland', team2: 'Germany', date: '2024-06-23', group: 'A' },
    { team1: 'Scotland', team2: 'Hungary', date: '2024-06-23', group: 'A' },
    { team1: 'Croatia', team2: 'Italy', date: '2024-06-24', group: 'B' },
    { team1: 'Albania', team2: 'Spain', date: '2024-06-24', group: 'B' },
    { team1: 'Netherlands', team2: 'Austria', date: '2024-06-25', group: 'D' },
    { team1: 'France', team2: 'Poland', date: '2024-06-25', group: 'D' },
    { team1: 'England', team2: 'Slovenia', date: '2024-06-25', group: 'C' },
    { team1: 'Denmark', team2: 'Serbia', date: '2024-06-25', group: 'C' },
    { team1: 'Slovakia', team2: 'Romania', date: '2024-06-26', group: 'E' },
    { team1: 'Ukraine', team2: 'Belgium', date: '2024-06-26', group: 'E' },
    { team1: 'Czechia', team2: 'Türkiye', date: '2024-06-26', group: 'F' },
    { team1: 'Georgia', team2: 'Portugal', date: '2024-06-26', group: 'F' },
    { team1: '2A', team2: '2B', date: '2024-06-29', group: '38', venue: 'Berlin', time: '18:00' },
    { team1: '1A', team2: '2C', date: '2024-06-29', group: '37', venue: 'Dortmund', time: '21:00' },
    { team1: '1C', team2: '3D/E/F', date: '2024-06-30', group: '40', venue: 'Gelsenkirchen', time: '18:00' },
    { team1: '1B', team2: '3A/D/E/F', date: '2024-06-30', group: '39', venue: 'Cologne', time: '21:00' },
    { team1: '2D', team2: '2E', date: '2024-07-01', group: '42', venue: 'Düsseldorf', time: '18:00' },
    { team1: '1F', team2: '3A/B/C', date: '2024-07-01', group: '41', venue: 'Frankfurt', time: '21:00' },
    { team1: '1E', team2: '3A/B/C/D', date: '2024-07-02', group: '43', venue: 'Munich', time: '18:00' },
    { team1: '1D', team2: '2F', date: '2024-07-02', group: '44', venue: 'Leipzig', time: '21:00' },
    { team1: 'W39', team2: 'W37', date: '2024-07-05', group: '45', venue: 'Stuttgart', time: '18:00' },
    { team1: 'W41', team2: 'W42', date: '2024-07-05', group: '46', venue: 'Hamburg', time: '21:00' },
    { team1: 'W40', team2: 'W38', date: '2024-07-06', group: '48', venue: 'Düsseldorf', time: '18:00' },
    { team1: 'W43', team2: 'W44', date: '2024-07-06', group: '47', venue: 'Berlin', time: '21:00' },
    { team1: 'W45', team2: 'W46', date: '2024-07-09', group: '49', venue: 'Munich', time: '21:00' },
    { team1: 'W47', team2: 'W48', date: '2024-07-10', group: '50', venue: 'Dortmund', time: '21:00' },
    { team1: 'W49', team2: 'W50', date: '2024-07-14', group: 'Final', venue: 'Berlin', time: '21:00' }
];

export default games;