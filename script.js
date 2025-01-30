const points = 0;
let field = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

function generate(){
    let gameplay_field = document.getElementById("gameplay");
    for (let i = 0; i < 64; i++){

        gameplay_field.innerHTML += `<div id="${i}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`;
    }

    let selection = document.getElementById("selection_field");
    if (selection.innerHTML.trim() == ''){
        for (let i = 0; i < 3; i++){
            selection.innerHTML += `<div class="pakolo" draggable="true" ondragstart="drag(event)" id="item${i}"></div>`
        }
    }


    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            field[i][j] = false;
        }
    }


}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();

    
}

function drop(ev) {
    let holder = ev.target;
    var data = ev.dataTransfer.getData("text");
    let item = document.getElementById(data);
    if (parseInt(holder.id) > -1){
        ev.preventDefault();
        holder.appendChild(item);   
        holder.innerHTML = "";
        holder.innerHTML = '<div class="pakolo" draggable="false"> </div>'; 
        //console.log(holder.id)
        //hol van
        field[parseInt(holder.id / 8)][(parseFloat(holder.id / 8) - parseInt(holder.id / 8)) * 8] = true;

        //pont-e?
        let beszinezve = 0;
        let index = [];
        let oszlopBeszinezve = 0;
        let oszlop = [];
        for(let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (field[i][j] == true){
                    ++beszinezve;
                }

            }
            if (beszinezve == 8){
                index.push(i);
            }
            beszinezve = 0;

            for (let k = 0; k < 8; k++){
                if (field[k][i] == true){
                    ++oszlopBeszinezve;
                }
            }
            if (oszlopBeszinezve == 8){
                oszlop.push(i);
            }
            oszlopBeszinezve = 0;
        }
        for (let k = 0; k < index.length; k++){
            let id = 0;
            for (let m = 0; m < 8; m++){
                //visszafejteni id-re, 0,125-el nő
                document.getElementById(index[k] * 8 + id * 8).innerHTML = "";
                field[index[k]][id * 8] = false;
                id += 0.125
            }
        }

        for (let k = 0; k < oszlop.length; k++){
            let id = oszlop[k];
            for (let m = 0; m < 8; m++){
                //visszafejteni id-re, 0,125-el nő
                document.getElementById(id).innerHTML = "";
                field[m][id] = false;
                id += 8
            }
        }
        index = [];
    
    
    
        //új generálása
        let selection = document.getElementById("selection_field");
        if (selection.innerHTML.trim() == ''){
            for (let i = 0; i < 3; i++){
                selection.innerHTML += `<div class="pakolo" draggable="true" ondragstart="drag(event)" id="item${i}"></div>`
            }
        }
    }

}
  


//            <div id="target" ondrop="drop(event)" ondragover="allowDrop(event)"></div>