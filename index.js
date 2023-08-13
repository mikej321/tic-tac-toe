// Global variables
const nameInput = document.querySelector('#playerName');
const headingTitle = document.querySelector('.title');
const gameBoardEl = document.querySelector('#gameBoard');
const playButton = document.querySelector('#playButton');

const myGameboard = (() => {
    // Creates the gameBoard array
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    
    // Renders the board based on the beginning state of the gameBoard array
    let renderBoard = function() {
        let gameboardLength = gameBoard.length;
        for (let i = 0; i < gameboardLength; i++) {
            const square = document.createElement('div');
            square.id = 'square' +  `${i}`;
            square.dataset.square = `${i}`;
            square.classList.add('square');
            square.textContent = gameBoard[i];
            gameBoardEl.insertAdjacentElement('beforeend', square);
        }
    }

    let reRender = function(arr) {
        const squares = document.querySelectorAll('.square');
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = gameBoard[i];
        }
    }

    // Allows human player to pick a square that isn't occupied
    let pickASquare = function(event) {
        if (!event.target.hasAttribute('occupied') && event.target.classList.contains('square')) {
            playerChoice();
            computerChoice(gameBoard);
        }
        reRender(gameBoard);
    }
    
    // changes the arr to fill it with the content of the picked squares
    let fillArrPlayer = function(arr) {
        let myElement = event.target;
        const index = myElement.getAttribute('data-square');
        arr[index] = 'O';
    }
    
    let computerChoice = function(arr) {
        let cpu = 'X';
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
        } while (arr[randomIndex] !== '');
        
        arr[randomIndex] = cpu;
    }
    
    let playerChoice = function() {
        let element = event.target;
        if (!element.hasAttribute('occupied') && element.classList.contains('square')) {
            element.setAttribute('occupied', '');
            element.style.cursor = 'default'; 
            fillArrPlayer(gameBoard);
        }
    }




    return {
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

/* Tomorrow, I need to create a conditional function that checks if a winner is found by matching characters across the arr
and if it does, it will return a winner by creating an element below the board that states that either the player or the CPU has won. */


playButton.addEventListener('click', createPlayer);
document.addEventListener('click', myGameboard.pickASquare);

