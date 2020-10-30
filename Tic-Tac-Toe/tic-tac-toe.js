var layout = [];
var size = 3;
var toWin = size;
var currentTurn = "X";
var scoreO = 0;
var scoreX = 0;


function CreateTicTacToe(){
    CreateLayout();
}

function GetSize(){
    return Number(document.getElementById("rows").value)
}

function CreateLayout(){
    // Variables
    let row_element;
    let column_element;
    let tic_tac_toe_area = document.getElementById("tic-tac-toe-area");
    let tic_tac_toe = document.createElement("table");
    // Creates layout.
    tic_tac_toe.className = "tic-tac-toe";
    for(let r = 0; r < size; r++){
        // size
        layout.push([])
        row_element = document.createElement("tr");
        row_element.id = "r" + r;
        for(let c = 0; c < size; c++){
            // Cols
            layout[r].push("");
            column_element = CreateColumnElement(r, c);
            row_element.appendChild(column_element);
        }
        tic_tac_toe.appendChild(row_element);
    }
    tic_tac_toe_area.appendChild(tic_tac_toe);
}

function FixStyle(element, col, row){
    if(row == size - 1){
        element.style.borderBottom = "0";
    }
    else if(row == 0){
        element.style.borderTop = "0";
    }
    if(col == size - 1){
        element.style.borderRight = "0";
    }
    else if(col == 0){
        element.style.borderLeft = "0";
    }
    return element;
}

function CreateColumnElement(row, col){
    let column_element = document.createElement("td");
    column_element.id= "r" + row + ".c" + col;
    column_element.style.cursor = "context-menu";
    column_element.onclick = function(){OnClick(column_element)}
    column_element = FixStyle(column_element, col, row);
    return column_element
}

function OnClick(element){
    let position = element.id.split(".");
    let row = parseInt(position[0].substring(1));
    let col = parseInt(position[1].substring(1));

    if(GetValue(row, col) == ""){
        ToggleTurn(element.id);
        layout[row][col] = currentTurn;
        win_positions = CheckVictoryFromPosition(row, col);
        if(win_positions.length > 0){
            Win();
        }
    }

}

function Win(){
    for(let i = 0; i < win_positions.length; i++){
        let win_element = GetValueElement("r"+win_positions[i][0]+".c"+win_positions[i][1]);
        win_element.style.color="orange";
    }
    if(currentTurn == "O"){
        scoreX += 1;
        document.getElementById("player2score").textContent = scoreX
    } else {
        scoreO += 1;
        document.getElementById("player2score").textContent = scoreO
    }

    ClearLayout();
}

function ClearLayout(){
    currentTurn = "X";

    console.log(GetSize())
    if(GetSize() != size){
        size = GetSize();
        layout = [];
        document.getElementById("tic-tac-toe-area").textContent = ""
        CreateLayout();
    } else {
        for(let i = 0; i < layout.length; i++){
            for(let n = 0; n < layout[i].length; n++){
                layout[i][n] = "";
                let id = "r"+i+".c"+n;
                let element = GetValueElement(id);
                element.style.color="white";
                element.textContent = "";
            }
        }
    }
}

function GetValueElement(element_id){
    return document.getElementById(element_id);
}

function ToggleTurn(element_id){
    if(currentTurn == "O") currentTurn = "X";
    else currentTurn = "O";
    GetValueElement(element_id).textContent = currentTurn;
}

function tempPosToWin(tempPos, winPos){
    for(let i = 0; i < tempPos.length; i++){
        winPos.push(tempPos[i]);
    }
    return winPos;
}

function CheckVictoryFromPosition(row, col){
    let letter = GetValue(row, col); // Determines the letter to win.
    let winning_positions = [];
    let temp_positions;

    // Check TOP to BOTTOM
    temp_positions = [];
    for(let i = 0; i < size; i++){
        temp_positions.push([i, col]);
        if(GetValue(i, col) == letter){
            if(i == size - 1){
                winning_positions = tempPosToWin(temp_positions, winning_positions);
            }
        } else {
            break;
        }
    }

    // LEFT TO RIGHT
    temp_positions = [];
    for(let i = 0; i < size; i++){
        temp_positions.push([row, i]);
        if(GetValue(row, i) == letter){
            if(i == size - 1){
                winning_positions = tempPosToWin(temp_positions, winning_positions);
            }
        } else {
            break;
        }
    }

    // BOTTOM-LEFT CORNER
    temp_positions = [];
    let position_found = false;
    for(let i = 0; i < size; i++){
        r = size - 1 - i;
        temp_positions.push([r, i]);
        if(GetValue(r, i) == letter){
            if(r == row && i == col){
                position_found = true;
            }
            if(i == size - 1 && position_found){
                winning_positions = tempPosToWin(temp_positions, winning_positions);
            }
        } else {
            break;
        }
    }

    // TOP-LEFT CORNER
    temp_positions = [];
    position_found = false;
    for(let i = 0; i < size; i++){
        temp_positions.push([i, i]);
        if(GetValue(i, i) == letter){
            if(i == row && i == col){
                position_found = true;
            }
            if(i == size - 1 && position_found){
                winning_positions = tempPosToWin(temp_positions, winning_positions);
            }
        } else {
            break;
        }
    }

    return winning_positions;
}

function GetValue(row, col){
    return layout[row][col];
}