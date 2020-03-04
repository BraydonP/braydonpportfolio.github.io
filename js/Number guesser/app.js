/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3,

// Ui Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('.#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min anx max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listerner
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play again'){
        window.location.reload();
    }
});

// Listen for guess 
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage('Please Enter a number between ${min} and ${max}', 'red');
    }

    // Check if won
    if(guess === winningNum){
        // Game over - Won
        
        gameOver(true,'${winningNum} is correct, YOU WIN!')

    } else {
        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over - Lost

            gameOver(false, 'Game over, You lost.The correct answer was ${winningNum}')

        } else {
            // Game continues - answer wrong

            // Clear input
            guessInput.value = '';

            // Tell user its wrong number
            setMessage('${guess} is not correct, ${guessesLeft} guesses left','red');
        }
    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'color';
    // Set Text color
    message.style.color = color;
    // Set message 
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
    message.style.color = color ;
    message.textContent = msg;
}