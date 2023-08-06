const xClass = "x";
const circleClass = "circle";
const winningArrayOfArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningElement = document.getElementById("winningMessage");
const winningTextElement = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restart-button");
let circleTurn;

function startGame() {
    winningElement.classList.remove("show");
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
        // {once : true} A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.
    });
    setHoverEffects();
}

restartButton.addEventListener("click", startGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;

    // place a mark
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    swapTurns();
    setHoverEffects();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}
function endGame(draw) {
    if (draw) {
        winningTextElement.innerHTML = "Draw Again!";
    }
    else {
        winningTextElement.innerHTML = `${circleTurn ? "O's" : "X's"}` + " Wins"
    }
    winningElement.classList.add("show");
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setHoverEffects() {
    if (circleTurn) {
        board.classList.remove(xClass);
        board.classList.add(circleClass);
    }
    else {
        board.classList.remove(circleClass);
        board.classList.add(xClass);
    }
}

function checkWin(currentClass) {
    //

    return winningArrayOfArrays.some(combination => { // this is applied on the big array and .some(condition) returns  true if theres one element in the array satisfies certain condition ---> array.some(function(value, index, arr), this)

        return combination.every(index => { // this is applied on each of the subArrays and it checks if every nbr of this combination array satisfies certain condition where all cell elements of this number index have same class 

            return cellElements[index].classList.contains(currentClass); // if the index of the combination are all having the same class then we are winner!
        })
    })
}
startGame();