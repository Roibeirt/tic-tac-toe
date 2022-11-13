const contentArea = document.getElementById("content-area");

const player = (playerName) => {

    return{playerName};

};

const gameboard = (() => {

    const board = [[null,null,null],[null,null,null],[null,null,null]];

    function updateGameboard(row, index, player){

        if (player = "playerOne"){
            board[row[index]] = "X";
        }
        else{
            board[row[index]] = "O";
        }

    }


})();

const tiles = (row, index, marker, element) => {

    return{
        row,
        index,
        element,
        marker        
        };
};

const updateDisplay =(() => {

    function drawGameboard(board){

        const boardContainer = document.createElement('div');
        boardContainer.id = "gameboard";

        for (x=0; x<board.length; x++){

            for (y=0; y<board.length; y++){

                const boardSquare = document.createElement('div');
                boardSquare.textContent = board[x[y]];
                boardContainer.appendChild(boardSquare);

            }

        }

    }
    const gameBoard = document.createElement("div");
    gameBoard.id = "gameboard";


    


})();
















/*pubsub module
const pubsub = (() => {

    subscriptions:{

    },
    subscribe: function()

}) */