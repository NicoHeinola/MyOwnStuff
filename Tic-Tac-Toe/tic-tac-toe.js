var layout = []
var current_turn = "O"

function CreateTicTacToe(rows=3){
    CreateLayout(rows)
}

function CreateLayout(rows){
    for(let i = 0; i < rows; i++){
        let row = CreateRow();
        for(let n = 0; n < rows; n++){
            AddCell(row, i, n);
        }
        InsertRow(row);
    }
}

function CreateRow(){
    layout.push([]);
    let tic_row = document.createElement("tr");
    return tic_row
}

function AddCell(row_element, row_num, column){
    layout[row_num].push("");

    let tic_button = document.createElement("button");
    tic_button.className = "tic-table-button tic-table-button-active";
    tic_button.onclick = function(){ClickCell(tic_button, row_num, column)}

    cell = row_element.insertCell(column);
    cell.appendChild(tic_button);
}

function InsertRow(row_element){
    GetTicTable().appendChild(row_element);
}

function GetTicTable(){
    return document.getElementById("tic-table")
}

function ClickCell(button, row, column){
    if(button.textContent == ""){
        button.textContent = current_turn;
        layout[row][column] = current_turn;
        if(current_turn == "X") current_turn = "O";
        else current_turn = "X";
        current_turn = "O"

        let victory = CheckVictory();
        if(victory[0]){
            let table = GetTicTable();
            let cells = table.getElementsByTagName("button");
            let win_button;
            let lose_button;
            for(let i = 0; i < cells.length; i++){
                console.log(cells.length, victory)
                if(victory[1].includes(i)){;
                    win_button = cells[i];
                    win_button.className = "tic-table-win tic-table-button";
                } else {
                    lose_button = cells[i];
                    lose_button.className = "tic-table-lose tic-table-button";
                }
            }
        }
    }
}

function GetLetter(row, col){
    return layout[row][col]
}

function CheckVictory(){
    var letter = ""
    var victory_tic_list = [];
    // Up to down
    for(let col = 0; col < layout.length; col++){
        letter = GetLetter(0, col)
        victory_tic_list = [col];

        for(let row = 1; row < layout.length; row++){
            if(letter == "" || GetLetter(row, col) != letter){
                break;
            } else {
                victory_tic_list.push(col + row * layout.length)
                if(row == layout.length - 1){
                    return [true, victory_tic_list];
                }
            }
        }
    }

    // Left to right
    for(let col = 0; col < layout.length; col++){
        letter = GetLetter(col, 0)
        victory_tic_list = [col * layout.length];

        for(let row = 1; row < layout.length; row++){
            if(letter == "" || GetLetter(col, row) != letter){
                break;
            } else {
                victory_tic_list.push(row + col * layout.length)
                if(row == layout.length - 1){
                    return [true, victory_tic_list]
                }
            }
        }
    }

    // Top Corner
    victory_tic_list = [0];
    for(let n = 1; n < layout.length; n++){
        let letter = GetLetter(0, 0)

        if(letter == "" || GetLetter(n, n) != letter){
            break;
        } else {
            victory_tic_list.push(n + n * layout.length)
            if(n == layout.length - 1){
                return [true, victory_tic_list]
            }
        }
    }

    // Bottom Corner
    victory_tic_list = [];
    for(let n = layout.length - 1; n > -1; n--){
        let letter = GetLetter(n, layout.length - 1 - n);
        if(letter == "" || GetLetter(n, layout.length - 1 - n) != letter){
            break;
        } else {
            victory_tic_list.push(n * (layout.length - 1))
            if(n == 0){
                victory_tic_list[layout.length - 1] = layout.length * (layout.length - 1)
                return [true, victory_tic_list]
            }
        }
    }

    return [false]
}