// Global variables
const nameInput = document.querySelector('#playerName');
const headingTitle = document.querySelector('.title');
const gameBoardEl = document.querySelector('#gameBoard');
const playButton = document.querySelector('#playButton');
const mainStage = document.querySelector('main');

const myGameboard = (() => {
    // Creates the gameBoard array
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    
    // Renders the board based on the beginning state of the gameBoard array
    let renderBoard = function() {
        gameBoardEl.innerHTML = "";
        let gameboardLength = gameBoard.length;
        for (let i = 0; i < gameboardLength; i++) {
            const square = document.createElement('div');
            square.id = 'square' +  `${i}`;
            square.dataset.square = `${i}`;
            square.classList.add('square');
            gameBoardEl.insertAdjacentElement('beforeend', square);
        }
        
    }

    // Changes the text in the tic-tac-toe every turn to match the gameBoard Array
    let reRender = function(arr) {
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = arr[i];
        }
    }

    // Allows human player to pick a square that isn't occupied
    let pickASquare = function(event) {
        if (!event.target.hasAttribute('occupied') && event.target.classList.contains('square')) {
            playerChoice();
            reRender(gameBoard);
            // if the board is full and a winner isn't declared by the last turn (a human will be controlling at this point), will declare a draw
            if (isBoardFull(gameBoard) && !checkLine()) {
                return declareDraw();
            }

            // if the human player passes the checkLine function, they are declared the winner
            if (checkLine()) {
                gameBoardEl.classList.add('stop');
                return declareWinner();
                
            }

            // proceeds to the computer if a winner isn't declared before and checks to see if they win afterwards
            computerChoice(gameBoard);
            reRender(gameBoard);

            if (checkLine()) {
               return declareLoser();
               
            }
        }


    }
    
    // changes the arr to fill it with the content of the picked squares
    let fillArrPlayer = function(arr) {
        let myElement = event.target;
        const index = myElement.getAttribute('data-square');
        arr[index] = 'O';
    }

    // allows the computer to make a random choice as long as that spot in the array isn't taken 
    let computerChoice = function(arr) {
        let cpu = 'X';
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
        } while (arr[randomIndex] !== '');
        
        arr[randomIndex] = cpu;
    }
    
    // changes the css of the element that a player clicks and fills the array
    let playerChoice = function() {
        let element = event.target;
        if (!element.hasAttribute('occupied') && element.classList.contains('square')) {
            element.setAttribute('occupied', '');
            element.style.cursor = 'default'; 
            fillArrPlayer(gameBoard);
        }
    }

    // Conditionals that check the horizontal path first for match across all 3 lines 
    let checkHorizontal = function(arr) {
        let flag = false;
        for (let i = 0; i < arr.length; i += 3) {
            if (arr[i] === 'O' && arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
                flag = true;
                return flag;
            } else if (arr[i] === 'X' && arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
                flag = true;
                return flag;
            }
        }
    }

    // Conditionals that check the vertical path only on the first line as that's all that's needed
    let checkVertical = function(arr) {
        let flag = false;
        for (let i = 0; i < 3; i++) {
            if (arr[i] === 'O' && arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
                flag = true;
                return flag;
            } else if (arr[i] === 'X' && arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
                flag = true;
                return flag;
            }
        }
    }

    // Conditionals that check the diagonal path only on the first line as that's all that's needed
    let checkDiagonal = function(arr) {
        let i = 0;
        let flag = false;
        if (arr[i] === 'O' && arr[i] === arr[i + 4] && arr[i + 4] === arr[i + 8]) {
            flag = true;
            return flag;
        } else if (arr[i + 2] === 'O' && arr[i + 2] === arr[i + 4] && arr[i + 4] === arr[i + 6]) {
            flag = true;
            return flag;
        } else if (arr[i] === 'X' && arr[i] === arr[i + 4] && arr[i + 4] === arr[i + 8]) {
            flag = true;
            return flag;
        } else if (arr[i + 2] === 'X' && arr[i + 2] === arr[i + 4] && arr[i + 4] === arr[i + 6]) {
            flag = true;
            return flag;
        }
    }

    // Utilizes the check helper functions to check if a match is found whether it's through the player or AI
    let checkLine = function() {
        let flag = false;
        if (checkHorizontal(gameBoard) || checkVertical(gameBoard) || checkDiagonal(gameBoard)) {
            flag = true;
        }
        return flag;
    }

    // helper function that tests for a full array
    let testForFullArr = function(element) {
        return element !== '';
    }

    // tests if the board is full via a helper function and a flag
    let isBoardFull = function(arr) {
        let isFull = false;
        if (arr.every(testForFullArr)) {
            isFull = true;
        }
    }

    // the declare functions generate DOM elements based on if a winner, loser, or a draw occurs
    let declareWinner = function() {
        const winner = document.createElement('h1');
        winner.classList.add('winner');
        winner.textContent = 'You win!';
        gameBoardEl.insertAdjacentElement('afterend', winner);
    }

    let declareLoser = function() {
        const loser = document.createElement('h1');
        loser.classList.add('loser');
        loser.textContent = 'You lose!';
        gameBoardEl.insertAdjacentElement('afterend', loser);
    }

    let declareDraw = function() {
        const draw = document.createElement('h1');
        draw.classList.add('draw');
        draw.textContent = 'It\'s a draw!';
        gameBoardEl.insertAdjacentElement('afterend', draw);
    }

    let resetButton = function() {
        const reset = document.createElement('button');
        reset.classList.add('reset');
        reset.textContent = 'Reset';
        mainStage.insertAdjacentElement('beforeend', reset);
    }
    
    

    return {
        gameBoard,
        reRender,
        renderBoard,
        pickASquare,
    }

})();

function Player(name) {
    // An object that simply creates the player object
    this.name = name;
    return {
        name,
    }
}

function createPlayer() {

    // creates the player object

    // input must have a value or it won't render the board

    if (nameInput.value !== '') {
        const newPlayer = Player(nameInput.value);
        player1 = newPlayer;
        changeHeading(player1.name);
        resetNameInput();
        myGameboard.renderBoard();
    } else {
        nameInput.style.outline = '2px solid red';
        headingTitle.textContent = 'Can\'t move forward unless you pick a name';
    }
    
}

// changes the heading H1 if the player inputs a name

function changeHeading(player) {
    headingTitle.textContent = `${player} vs CPU`;
}

// resets the value in the input after a name is selected

function resetNameInput() {
    nameInput.value = '';
    nameInput.style.outline = 'none';
}

// variable that holds the player object that is created with createPlayer

let player1;




playButton.addEventListener('click', createPlayer);
gameBoardEl.addEventListener('click', myGameboard.pickASquare);



