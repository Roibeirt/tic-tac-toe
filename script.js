const gameboard = (() => {

    const contentArea = document.getElementById("content-area");

    const board = [[null,null,null],[null,null,null],[null,null,null]];

    const tileFactory = (row,index,element) => {

        this.row = row;
        this.index = index;
        this.element = element;

        return(element);
    }
    
    const drawGameboard = () => {
        const boardContainer = document.createElement('div');
        boardContainer.id = "gameboard";
    
        for (x=0; x<board.length; x++){
    
            for (y=0; y<board.length; y++){
                const boardSquare = document.createElement('div');
                boardSquare.addEventListener("click", () => updateGameboard(this.row,this.index));
                const tile = tileFactory(x,y,boardSquare);
                board[x][y] = tile;
                boardContainer.appendChild(tile);
    
            }
    
        }
    
        contentArea.appendChild(boardContainer);
    }
    
    function updateGameboard(row, index){
        
            board[row][index].textContent = "X";
    
    }

    return{drawGameboard, updateGameboard};
    

})();

gameboard.drawGameboard();



/*const tiles = (row, index, element) => {

    return{
        row,
        index,
        element,
        marker        
        };
};*/



/*pubsub module
const pubsub = (() => {

    subscriptio\]=s:{

    },
    subscribe: function()

}) */