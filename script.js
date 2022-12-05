
const ticTacToe = (() => {

    const contentArea = document.getElementById("content-area");

    // gameLogic

    const game = (() => {

        let gameType = "";
        let currentPlayer = 1;

        const gameStep = (row, index) => {
            //update board

            gameBoard.updateGameboard(row, index, currentPlayer)

            // check for win/draw
            if (checkWin() === true){
                winner(currentPlayer);
            }
            else if (checkDraw() === true){
                draw();
            }
            else{
                changePlayer();
            }
            
        }

        const checkWin = () => {
            // check lines
            for (i=0; i<3; i++){
                if (gameBoard.board[i].every((x) => x.boardSquare.textContent == "O")){
                    return(true);
                }
                else if (gameBoard.board[i].every((x) => x.boardSquare.textContent == "X")){
                    return(true);
                }
            }

            // check diagonals

            let leftDiagonal = [gameBoard.board[0][0],gameBoard.board[1][1],gameBoard.board[2][2]];
            let rightDiagonal = [gameBoard.board[0][2],gameBoard.board[1][1],gameBoard.board[2][0]];

            if (leftDiagonal.every((x) => x.boardSquare.textContent == "O")){
                return(true);
            }
            else if (leftDiagonal.every((x) => x.boardSquare.textContent == "X")){
                return(true);
            }
            
            if (rightDiagonal.every((x) => x.boardSquare.textContent == "O")){
                return(true);
            }
            else if (rightDiagonal.every((x) => x.boardSquare.textContent == "X")){
                return(true);
            }
        }

        const checkDraw = () => {
                
            let drawCheck = gameBoard.board.flat();

            if (drawCheck.every((x) => x.boardSquare.textContent != "")){
                return(true);
            }
        }
        

        const changePlayer =() => {

            if (currentPlayer == 1){
                currentPlayer = 2;
            }
            else currentPlayer = 1;

        }

        const winner =() =>{

            alert("Winner!");
        }

        const draw = () => {
            alert("Draw!");
        }

        return{gameStep}

    })();

    // Player Object

    const Players = (() => {

        const playerList = [];

        const createPlayerOne = (playerName) => {

            const playerOne = playerFactory(playerName, 1);
            playerList.push(playerOne);
            for(const player of playerList){
                console.log(player);
            }
            alert("didit!");

        };

        const createPlayerTwo = (playerName) =>{


        };

        const playerFactory = (playerName, number) => {

            return{playerName, number};
    
        };

        return{createPlayerOne, playerList}

    })();

    const gameBoard =(() => {

        const board = [[null,null,null],[null,null,null],[null,null,null]];

        const tileFactory = (row,index,boardSquare) => {
            
            return{row,index,boardSquare};
        }

        const updateGameboard = (row, index, player) =>{
            if (player == 1){
                board[row][index].boardSquare.textContent = "X";
            }
            else{
                board[row][index].boardSquare.textContent = "O";
            }
        }

        return{board, tileFactory, updateGameboard}

    })();

    const displayController = (() => {

        /* Clear Screen */

        const clearScreen = () => {
            while (contentArea.firstChild){
                contentArea.removeChild(contentArea.firstChild);
            }
        }

        /* Gameboard Screen */

        const drawGameboard = () => {
        
            clearScreen();
    
            const boardContainer = document.createElement('div');
            boardContainer.id = "gameboard";
        
            for (x=0; x<gameBoard.board.length; x++){
        
                for (y=0; y<gameBoard.board.length; y++){
                    const boardSquare = document.createElement('div');
                    const tile = gameBoard.tileFactory(x,y,boardSquare);
                    tile.boardSquare.addEventListener("click", () => game.gameStep(tile.row,tile.index));
                    gameBoard.board[x][y] = tile;
                    boardContainer.appendChild(tile.boardSquare);
                }
            }
        
            contentArea.appendChild(boardContainer);
        }

        /* Title Screen */

        const drawTitleScreen = () => {
        
            clearScreen();
    
            const startMenu = document.createElement('div');
            startMenu.id = 'start-menu';
    
            const blurb = document.createElement('div');
            blurb.textContent = "Let's Begin!";
    
            const startButtons = document.createElement('div');
            startButtons.id = "start-buttons";
    
            const singlePlayer = document.createElement('button');
            const twoPlayer = document.createElement('button');
            singlePlayer.textContent = "Single Player";
            singlePlayer.addEventListener('click', () => drawSinglePlayerSelect());
            twoPlayer.textContent = "Two Player";

    
            startMenu.appendChild(blurb);
            
            startButtons.appendChild(singlePlayer);
            startButtons.appendChild(twoPlayer);
    
            startMenu.appendChild(startButtons);
    
            contentArea.appendChild(startMenu);
    
        }


        /* Player Select Screens */

        const drawSinglePlayerSelect = () => {
        // first clear the screen
        clearScreen();
        // create screen elements
        const containerForm = document.createElement('form');

        const nameLabel = document.createElement('label');
        nameLabel.htmlFor = "player-name";
        nameLabel.textContent = "Player Name: "

        const nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.name = "player-name";
        nameInput.id = "player-name";

        const markSelectDiv = document.createElement("div");
        markSelectDiv.classList = "mark-select";
        const markSelectLabel = document.createElement('div');
        markSelectLabel.classList = "mark-select-label";
        markSelectLabel.textContent = "Select Marker";

        const markSelectButtonsDiv = document.createElement('div');
        markSelectButtonsDiv.classList = "mark-select-buttons";
        const xButton = document.createElement('button');
        xButton.textContent = "X";
        const oButton = document.createElement('button');
        oButton.textContent = "O";

        // add event listener to marker button
        xButton.addEventListener('click', (e) =>{
            // prevent clicking the button from refreshing the page
            e.preventDefault();
            createSinglePlayer("X")
        } );
        oButton.addEventListener('click', (e) =>{
            // prevent clicking the button from refreshing the page
            e.preventDefault();
            createSinglePlayer("O")
        } );

        function createSinglePlayer(marker) {
            if (nameInput.value.length < 1){
                alert("Please enter your name");
                return;
            }
            else{
                // create player
                Players.createPlayerOne(nameInput.value);
                // disable buttons so additional players cant be created during animation
                xButton.disabled = true;
                oButton.disabled = true;
                // once the animation ends, draw the gameboard
                containerForm.addEventListener('animationend', () => drawGameboard('singleplayer', marker));
                // animate the form moving off screen
                containerForm.classList = 'exit-down';
            }

        }
        // append elements to correct containers
        
        markSelectButtonsDiv.appendChild(oButton);
        markSelectButtonsDiv.appendChild(xButton);
        markSelectDiv.appendChild(markSelectButtonsDiv);
        markSelectDiv.appendChild(markSelectLabel);

        containerForm.appendChild(nameLabel);
        containerForm.appendChild(nameInput);

        containerForm.appendChild(markSelectDiv);
        
        contentArea.appendChild(containerForm);

        }

       return{drawSinglePlayerSelect, drawGameboard, drawTitleScreen}

    })();

    function startGame (){
        displayController.drawTitleScreen();
    }

    return{startGame};

})();

ticTacToe.startGame();
