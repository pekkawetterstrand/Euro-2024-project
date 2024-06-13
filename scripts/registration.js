export function handleRegistration() {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nickname = document.getElementById('nickname').value.trim();
        if (nickname) {
            localStorage.setItem('nickname', nickname);
            document.getElementById('registration-page').classList.add('hidden');
            document.getElementById('game-page').classList.remove('hidden');
        } else {
            alert('Please enter a nickname.');
        }
    });
}


