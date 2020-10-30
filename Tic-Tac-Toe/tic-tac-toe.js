var layout = [];
var rows = 3;


function CreateTicTacToe(){
    CreateLayout();
}

function CreateLayout(){
    for(let r = 0; r < rows; r++){
        layout.push([])
        for(let c = 0; c < rows; c++){
            layout[r].push("");
            
        }
    }
}