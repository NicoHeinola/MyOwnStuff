var layout = [];
var size = 3;
var max = 6;
var min = 2;
var toWin = size;
var currentTurn = "X";
var scoreO = 0;
var scoreX = 0;
var victory = false;

function CreateTicTacToe(){
    CreateLayout();
}

function GetSize(){
    let num = Number(document.getElementById("rows").value)
    if(num > max) {num = max; AnimateInvalidNumber()}
    if(num < min) {num = min; AnimateInvalidNumber()}
    if(isNaN(num)) {num = 3; AnimateInvalidNumber()}
    document.getElementById("rows").value = String(num);
    return num;
}

function AnimateInvalidNumber(){
    var id = setInterval(HandleAnimation);
    var frame_count = 0;
    var max_frame_count = 60;
    var half = max_frame_count / 2;
    var multiplier = 15;
    var element = document.getElementById("rows");
    function HandleAnimation(){
        frame_count += 1;
        if(frame_count > max_frame_count){
            element.style.background = "black";
            clearInterval(id);
        } else {
            if(frame_count >= half){
                element.style.background = "rgb("+((max_frame_count-frame_count)*multiplier)+",0,0)";
            }else{
                element.style.background = "rgb("+(frame_count*multiplier)+",0,0)";
            }
        }
    }
}

function AnimateSelection(element){
    var max_frames = 20;
    var frame_count = 0;
    var id = setInterval(HandleAnimation);
    function HandleAnimation(){
        frame_count += 1;
        if(frame_count > max_frames){
            clearInterval(id);
        } else {
            element.style.fontSize = (frame_count/40)*3.5+"em";
        }
    }
}

function CreateOverlayText(){
    let overlay_text = document.createElement("p");
    overlay_text.id = "overlay";
    overlay_text.style.display = "none";
    return overlay_text;
}

function CreateLayout(){
    // Variables
    let row_element;
    let column_element;
    let tic_tac_toe_area = document.getElementById("tic-tac-toe-area");
    tic_tac_toe_area.style.position = "relative"
    let overlay_text = CreateOverlayText();
    tic_tac_toe_area.appendChild(overlay_text);
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
    if(!victory){
        let position = element.id.split(".");
        let row = parseInt(position[0].substring(1));
        let col = parseInt(position[1].substring(1));

        if(GetValue(row, col) == ""){
            ToggleTurn(element.id);
            AnimateSelection(element);
            layout[row][col] = currentTurn;
            win_positions = CheckVictoryFromPosition(row, col);
            if(win_positions.length > 0){
                Win();
            } else {
                CheckDraw();
            }
        }
    }

}

function GetEndGameElement(){
    return document.getElementById("overlay");
}

function SetEndGameText(text){
    let element = GetEndGameElement();
    element.textContent = text;
    element.style.display = "block";

}

function HideEndGameText(){
    let element = GetEndGameElement();
    element.textContent = "";
    element.style.display = "none"
}

function Win(){
    victory = true;
    for(let i = 0; i < win_positions.length; i++){
        let win_element = GetValueElement("r"+win_positions[i][0]+".c"+win_positions[i][1]);
        win_element.style.color="orange";
    }
    if(currentTurn == "O"){
        scoreO += 1;
        document.getElementById("player1score").textContent = scoreO;
        SetEndGameText("O-Player Wins!");
    } else {
        scoreX += 1;
        document.getElementById("player2score").textContent = scoreX;
        SetEndGameText("X-Player Wins!");
    }
}

function Draw(){
    victory = true;
    SetEndGameText("Draw!");
}

function ClearLayout(){
    currentTurn = "X";
    victory = false;
    HideEndGameText();

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

function CheckDraw(){
    for(let i = 0; i < size; i++){
        for(let n = 0; n < size; n++){
            if(layout[i][n] != ""){
                return;
            }
        }
    }
    Draw();
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