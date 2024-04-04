const homeScreen = document.getElementById('home-screen');
const playground = document.getElementById('playground');
const scoreScreen = document.getElementById('score-screen');
const keyboardButtons = document.getElementsByClassName('kbd');
const getAlphabetText = document.querySelector('.artboard span');
const scoreButton = document.getElementById('score-button');
const currentScore = document.getElementById('current-score');
const currentLife = document.getElementById('current-life');
const finalScore = document.getElementById('final-score');

function hideSection(section) {
    section.classList.add('hidden');
}

function showSection(section) {
    section.classList.remove('hidden');
}

function startFromHomeScreen() {
    hideSection(homeScreen);
    showSection(playground);
    continueGame();
}

function startFromScoreScreen() {
    hideSection(scoreScreen);
    showSection(playground);
    continueGame();
}

// Adding keyboard event
// Pressing enter will redirect to playground page
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        startFromHomeScreen();
    }
})

// Get the random alphabet
const alphabetList = "abcdefghijklmnopqrstuvwxyz";
const alphabets = alphabetList.split('');

function randomAlphabet() {
    const random = Math.floor(Math.random() * alphabets.length);
    return alphabets[random].toUpperCase();
}

// Set a random alphabet
function continueGame() {
    getAlphabetText.textContent = randomAlphabet();
}

// This function removes the color previous pressed button
function removeButtonColor() {
    for (const button of keyboardButtons) {
        button.classList.remove('bg-orange-400');
        button.classList.remove('text-black');
    }
}

// Add color to button on pressed
function addColorToButton(button) {
    removeButtonColor();
    for (const btn of keyboardButtons) {
        if (btn.textContent === button) {
            btn.classList.add('bg-orange-400');
            btn.classList.add('text-black');
            return;
        }
    }
    button.classList.add('bg-orange-400');
    button.classList.add('text-black');
}

// Add onclick handler on keyboard button
for (const keyboardButton of keyboardButtons) {
    keyboardButton.addEventListener('click', function () {
        const displayedText = getAlphabetText.textContent;
        const keyPressedText = this.textContent.toUpperCase();
        addColorToButton(this);
        if (displayedText === keyPressedText) {
            updateScore();
        } else {
            updateLife();
        }
    })
}

// Adding keyboard event
// Pressing buttons except enter will continue the game till score 0
document.addEventListener('keyup', function (event) {
    const key = event.key;
    if (key !== 'Enter') {
        const displayedText = getAlphabetText.textContent;
        // addColorToButton(this);
        addColorToButton(key);
        if (displayedText === key.toUpperCase()) {
            updateScore();
        } else {
            updateLife();
        }
    }
})

// Update the score if guess is correct
function updateScore() {
    const updatedLife = checkLife();
    if (!updatedLife) {
        alert('You spent all of you life');
        return;
    }
    const newScore = parseInt(currentScore.textContent);
    currentScore.textContent = newScore + 1;
    continueGame();
}

// Update the life if guess is not correct
function updateLife() {
    const lifeAvailable = parseInt(currentLife.textContent);
    if (lifeAvailable === 0) {
        alert('You spent all of you life');
        return;
    }
    currentLife.textContent = lifeAvailable - 1;
    continueGame();
}

// Check for current life available
function checkLife() {
    const currentLifeAvailable = currentLife.textContent;
    if (parseInt(currentLifeAvailable) === 0) {
        return false;
    }
    return true;
}

// Go the the final score page
scoreButton.addEventListener('click', function () {
    const getLife = checkLife();
    if (getLife) {
        alert('You still have life left');
        return;
    }
    hideSection(playground);
    showSection(scoreScreen);
    const getScore = this.querySelector('#current-score').textContent;
    finalScore.textContent = getScore;
})

// Start the game from score screen
document.querySelector('.custom button').addEventListener('click', function () {
    currentScore.textContent = 0;
    currentLife.textContent = 5;
    startFromScoreScreen();
})