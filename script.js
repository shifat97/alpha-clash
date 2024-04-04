const homeScreen = document.getElementById('home-screen');
const playground = document.getElementById('playground');
const scoreScreen = document.getElementById('score-screen');
const getAlphabetText = document.querySelector('.artboard span');
const scoreButton = document.getElementById('score-button');
const currentScore = document.getElementById('current-score');
const currentLife = document.getElementById('current-life');
const finalScore = document.getElementById('final-score');

function hideHomeScreen() {
    homeScreen.classList.add('hidden');
}

function showPlayground() {
    playground.classList.remove('hidden');
}

function hidePlayground() {
    playground.classList.add('hidden');
}

function showScoreScreen() {
    scoreScreen.classList.remove('hidden');
}

function hideScoreScreen() {
    scoreScreen.classList.add('hidden');
}

function startPlaying() {
    hideHomeScreen();
    showPlayground();
    continueGame();
}

function startFromScoreScreen() {
    hideScoreScreen();
    showPlayground();
    continueGame();
}

// Adding keyboard event
// Pressing enter will redirect to playground page
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        startPlaying();
    }
})

// Get the random alphabet
function randomAlphabet() {
    const alphabetList = "abcdefghijklmnopqrstuvwxyz";
    const alphabets = alphabetList.split('');
    const random = Math.floor(Math.random() * 25);
    return alphabets[random].toUpperCase();
}

// Set a random alphabet
function continueGame() {
    getAlphabetText.textContent = randomAlphabet();
}

// Add onclick handler on keyboard button
const keyboardButtons = document.getElementsByClassName('kbd');
for (const keyboardButton of keyboardButtons) {
    keyboardButton.addEventListener('click', function () {
        const displayedText = getAlphabetText.textContent;
        const keyPressedText = this.textContent.toUpperCase();
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
    hidePlayground();
    showScoreScreen();
    const getScore = this.querySelector('#current-score').textContent;
    finalScore.textContent = getScore;
})

// Start the game from score screen
document.querySelector('.custom button').addEventListener('click', function () {
    currentScore.textContent = 0;
    currentLife.textContent = 5;
    startFromScoreScreen();
})