window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','','',''];
    let cursorPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYER0_WON = 'PLAYER0_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const resetBoard = () => {
        board = ["","","","","","","","",""];
        isGameActive = true;
        announcer.classList.add("hide");
    
        if(cursorPlayer === "0"){
            changePlayer();
        }
    
        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("player0");
        });
    };
    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });
    resetButton.addEventListener("click", resetBoard);

    function handleResultValidation() {
        let roundWon = false;
        for(let i=0;i<=7;i++){
            const winCondition = winningConditions[i];
            const a= board[winCondition[0]];
            const b= board[winCondition[1]];
            const c= board[winCondition[2]];
            if(a==="" || b==="" || c===""){
                continue;
            }
            if(a===b && b===c){
                roundWon = true;
                break;
            }
        }
    
        if(roundWon){
            announce(cursorPlayer === "X" ? PLAYERX_WON : PLAYER0_WON);
            isGameActive = false;
            return;
        }
    
        if(!board.includes("")) announce(TIE);
    }
    
    const announce = (type) => {
        switch(type){
            case PLAYER0_WON:
                announcer.innerHTML = 'Player <span class = "player0">0</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class = "playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerHTML = TIE;
                
        }
        announcer.classList.remove("hide");
    };
    
    const isValidation = (title) => {
        return tiles.innerHTML !== "X" && tiles.innerHTML !== "0";
    };
    
    const updateBoard = (index) => {
        board[index] = cursorPlayer;
    };
    
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${cursorPlayer}`);
        cursorPlayer = cursorPlayer === "X" ? "0" : "X";
        playerDisplay.innerText = cursorPlayer;
        playerDisplay.classList.add(`player${cursorPlayer}`);
    } ;
    
    const userAction = (tile, index) => {
        if(isValidation(tile) && isGameActive){
            tile.innerText = cursorPlayer;
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };
    

});

