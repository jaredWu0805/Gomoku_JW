const canvas1 = document.getElementById('board');
const background = canvas1.getContext("2d"); 
background.strokeStyle = "Black";

var msg = document.getElementById('message');

const whiteStone = new Image();
whiteStone.src = 'white.png'

const blackStone = new Image();
blackStone.src = 'black.png'

//Initate GoBoard
const GoBoard = [];
for (let i = 0; i < 15; i++) {
	GoBoard[i] = [];
	for (let j = 0; j < 15; j++) {
		GoBoard[i][j] = 0;
	}
}

//Draw GoBoard
const texture = new Image();
texture.src = 'wood.jpg';
texture.onload = () => {
 background.drawImage(texture, 0, 0
    , 450, 450);
    drawGoBoard();
}

function drawGoBoard() {
 background.moveTo(0,0);
    for (let 
        i = 0; i< 16 ; i++){  

     background.lineTo(0 + 30*i, 450);
     background.moveTo(0, 0 + 30 * i);
     background.lineTo(450, 0 + 30*i);
     background.moveTo(0 + 30 * (i+1), 0);        
    }
 background.stroke();
}

//Detect 
//mouse click and draw stone
let turn = 1;
document.getElementById('board').addEventListener("click",placeStone)

function placeStone(event) {
    
    if (gameEnds){
        alert(" Good Game. Please start over. ")
        return;
    }

    var x = event.offsetX;
    var y = event.offsetY;
    var i = ~~(x/30); 
    var j = ~~(y/30);
    
    //check if board had been drawn
    if (GoBoard[i][j] == 0){
        
        GoBoard[i][j] = turn;
        drawStone(turn, i, j);

        checkWin(turn, i, j)
        //switch
        if (turn == 1) { 
            turn = 2;
            msg.innerHTML = "Black's turn";
        }
        else { 
            turn = 1;
            msg.innerHTML = "White's turn";
        }  
    }
        
};

//Draw stone on where mouse click
function drawStone(turn, i, j){
        if (turn == 1){
            background.drawImage(whiteStone, 0 + i*30, 0 + j*30, 30, 30);
        }
        else {
            background.drawImage(blackStone, 0 + i*30, 0 + j*30, 30, 30);
        }
}


let gameEnds = 0;

function checkWin(turn, i, j){
    
    var row_count =0, column_count =0,rgt_slash_cnt =0, lft_slash_cnt =0;
    //check row
    for (let x = i; x < 15; x++){
        if (GoBoard[x][j] == turn){
            row_count++ ;
        }
        else {break;}
    }
    for (let x = i-1; x >= 0; x--){
        if (GoBoard[x][j] == turn){
            row_count++ ;
        }    
        else {break;}
    }    
    //check column
    for (let y = j; y < 15; y++){
        if (GoBoard[i][y] == turn){  
            column_count++;
        }
        else {break;}
    }
    for (let y = j-1; y >= 0; y--){
        if (GoBoard[i][y] == turn){
            column_count++;
        }    
        else {break;}
    }    

    //check right slash
    for (let x = i, y = j; x < 15 && y < 15; x++, y++){
        if (GoBoard[x][y] == turn){  
            rgt_slash_cnt++;
        }
        else {break;}
    }
    for (let x = i-1, y = j-1; x >= 0 && y >= 0; x--, y--){
        if (GoBoard[x][y] == turn){  
            rgt_slash_cnt++;
        }
        else {break;}
    }
    //check left slash
    for (let x = i, y = j; x >= 0 && y < 15; x--, y++){
        if (GoBoard[x][y] == turn){  
            console.log('1');
            lft_slash_cnt++;
            console.log(lft_slash_cnt);
        }
        else {break;}
    }
    for (let x = i+1, y = j-1; x < 15 && y >= 0; x++, y--){
        if (GoBoard[x][y] == turn){  
            console.log('2');
            lft_slash_cnt++;
            console.log(lft_slash_cnt);
        }
        else {break;}
    }    
    
    
    if ( row_count == 5 || column_count == 5 || 
        rgt_slash_cnt == 5 || lft_slash_cnt == 5){
        gameEnds = 1;
        if (turn == 1){
            alert('White Win!');
        }
        else { 
            alert('Black Win!');
        };
    }
    
         
}
