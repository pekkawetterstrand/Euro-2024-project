export function handleRegistration() {
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

