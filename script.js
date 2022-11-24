
const gameboard = (() => {

    const contentArea = document.getElementById("content-area");

    const board = [[null,null,null],[null,null,null],[null,null,null]];

    const tileFactory = (row,index,boardSquare) => {
        
        return{row,index,boardSquare};
    }
    
    const drawGameboard = () => {
        const boardContainer = document.createElement('div');
        boardContainer.id = "gameboard";
    
        for (x=0; x<board.length; x++){
    
            for (y=0; y<board.length; y++){
                const boardSquare = document.createElement('div');
                const tile = tileFactory(x,y,boardSquare);
                tile.boardSquare.addEventListener("click", () => updateGameboard(tile.row,tile.index));
                board[x][y] = tile;
                boardContainer.appendChild(tile.boardSquare);
            }
        }
    
        contentArea.appendChild(boardContainer);
    }
    
    function updateGameboard(row, index){
        
            board[row][index].boardSquare.textContent = "X";
    
    }

    return{drawGameboard, contentArea};
    
})();

