
const ticTacToe = (() => {

    const contentArea = document.getElementById("content-area");

    // gameLogic

    const game = (() => {

        let gameType = "";
        let currentPlayer = 1;
        let aiPlayer = 0;
        let aiDifficulty = "easy"

        const gameStart = (singlePlayer, aiDifficulty) => {

            if (singlePlayer == true){
                aiDifficulty = aiDifficulty;
                if (Players.playerList[0].playerNumber == 2){
                    aiPlayer = 1;
                }
                else{
                    aiPlayer = 2;
                }
                displayController.drawGameboard(aiPlayer);
            }
        }

        const aiMove = () => {
            let playableTiles = gameBoard.board.flat().filter(x => x.boardSquare.textContent == "");
            let move = Math.floor(Math.random() * playableTiles.length);
            gameBoard.updateGameboard(playableTiles[move].row, playableTiles[move].index, currentPlayer);

        }

        const gameStep = (row, index) => {
            
            if (currentPlayer == aiPlayer){
                aiMove();
            }
            else{
                gameBoard.updateGameboard(row, index, currentPlayer)
            }
           
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

            if(currentPlayer == aiPlayer){
                gameStep();
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
        // check for a draw
        const checkDraw = () => {
                
            // flatten the board and make sure every tile has a mark
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

        return{gameStep, aiMove, gameStart}

    })();

    // Player Object

    const Players = (() => {

        const playerList = [];

        const createPlayer = (playerName, playerNumber) => {

            const playerOne = playerFactory(playerName, playerNumber);
            playerList.push(playerOne);
            
        };

        const playerFactory = (playerName, playerNumber) => {

            return{playerName, playerNumber};
    
        };

        return{createPlayer, playerList}

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

        /* Win Screen */

        const drawWinScreen = (winner) => {

            


        }

        /* Clear Screen */

        const clearScreen = () => {
            while (contentArea.firstChild){
                contentArea.removeChild(contentArea.firstChild);
            }
        }

        /* Gameboard Screen */

        const drawGameboard = (aiPlayer) => {
        
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
            if (aiPlayer == 1){
                game.gameStep();
            }
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
        const labelsAndInputs = document.createElement('div')
        labelsAndInputs.id ="labels-and-inputs";
        const inputs = document.createElement('div')
        inputs.classList = "inputs";
        const labels = document.createElement('div')
        labels.classList = "labels"


        const nameLabel = document.createElement('label');
        nameLabel.htmlFor = "player-name";
        nameLabel.textContent = "Player Name: "
        const nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.name = "player-name";
        nameInput.id = "player-name";

        const difficultyLabel = document.createElement("label");
        difficultyLabel.htmlFor = "ai-menu";
        difficultyLabel.textContent = "AI Difficulty: "
        
        const aiMenu = document.createElement("select");
        aiMenu.name = "ai-menu";
        aiMenu.id = "ai-menu"; 
        
        const easy = document.createElement("option")
        easy.value = "easy";
        easy.textContent = "Easy"
        const medium = document.createElement("option")
        medium.value = "medium";
        medium.textContent = "Medium"
        const hard = document.createElement("option")
        hard.value = "hard";
        hard.textContent = "Hard"

        aiMenu.appendChild(easy);
        aiMenu.appendChild(medium);
        aiMenu.appendChild(hard);

        inputs.appendChild(nameInput);
        inputs.appendChild(aiMenu);

        labels.appendChild(nameLabel);
        labels.appendChild(difficultyLabel);

        labelsAndInputs.appendChild(labels);
        labelsAndInputs.appendChild(inputs);

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
            if (nameInput.value.length < 1){
                alert("Please enter your name");
                return;
            }
            SinglePlayer(1)
        } );
        oButton.addEventListener('click', (e) =>{
            // prevent clicking the button from refreshing the page
            e.preventDefault();
            if (nameInput.value.length < 1){
                alert("Please enter your name");
                return;
            }
            SinglePlayer(2)
        } );

        function SinglePlayer(playerNumber) {

                // create player
                Players.createPlayer(nameInput.value, playerNumber);
                // start the game
                game.gameStart(true, aiMenu.value);
                // disable buttons so additional players cant be created during animation
                xButton.disabled = true;
                oButton.disabled = true;
                // once the animation ends, draw the gameboard
                containerForm.addEventListener('animationend', () => game.gameStep());
                // animate the form moving off screen
                containerForm.classList = 'exit-down';
                
            

        }
        // append elements to correct containers
        
        markSelectButtonsDiv.appendChild(xButton);
        markSelectButtonsDiv.appendChild(oButton);
        markSelectDiv.appendChild(markSelectLabel);
        markSelectDiv.appendChild(markSelectButtonsDiv);
        
        
        containerForm.appendChild(labelsAndInputs);
        containerForm.appendChild(markSelectDiv);
        
        contentArea.appendChild(containerForm);

        }

       return{drawSinglePlayerSelect, drawGameboard, drawTitleScreen}

    })();

    function startGame (){
        displayController.drawTitleScreen();
    }

    function testAI(){
        game.aiMove();
    }

    return{startGame, testAI};

})();

ticTacToe.startGame();
