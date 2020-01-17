let table = document.getElementById("table");
table.align = "center";

const num_rows = 50;
const num_columns = 50;

let state = [num_rows]

for (let i = 0; i < num_rows; ++i) {
    state[i] = [num_columns];
    for (let j = 0; j < num_columns; ++j) {
        state[i][j] = false;
    }
}

function mark(i, j, alive) {
    let td = document.getElementById(i + "_" + j);
    td.style.backgroundColor = (alive ? "red" : "black");
}

is_alive = (i, j) => {
    return (i >= 0 && i < num_rows && j >= 0 && j < num_columns) ? state[i][j] : false;
}

count_neighbours = (i, j) => {
    let res = 0;
    res += is_alive(i - 1, j - 1);
    res += is_alive(i - 1, j);
    res += is_alive(i - 1, j + 1);
    res += is_alive(i, j - 1);
    res += is_alive(i, j + 1);
    res += is_alive(i + 1, j - 1);
    res += is_alive(i + 1, j);
    res += is_alive(i + 1, j + 1);
    return res;
}

update = () => {
    let st = [num_rows];
    for (let i = 0; i < num_rows; ++i) {
        st[i] = [num_columns];
        for (let j = 0; j < num_columns; ++j) {
            st[i][j] = false;
        }
    }
    
    for (let i = 0; i < num_rows; ++i) {
        for (let j = 0; j < num_columns; ++j) {
            let near = count_neighbours(i, j);
            //console.log(near);
            if (!state[i][j]) {
                if (near == 3) {
                    st[i][j] = true;
                }
            } else {
                if (near < 2 || near > 3) {
                    st[i][j] = false;
                } else {
                    st[i][j] = true;
                }
            }
        }
    }
    
    for (let i = 0; i < num_rows; ++i) {
        for (let j = 0; j < num_columns; ++j) {
            mark(i, j, st[i][j]);
        }
    }
    
    state = st;
    //console.log("tick");
}

start = (event) => {
    event.target.disabled = true;
    document.getElementById("randbutton").disabled = true;
    setInterval(update, 400);
}

random_oh = (event) => {
    for (let i = 0; i < num_rows; ++i) {
        for (let j = 0; j < num_columns; ++j) {
            state[i][j] = Math.random() >= 0.6 ? true : false;
            mark(i, j, state[i][j]);
        }
    }
}

clicker = (event) => {
    let td = event.target;
    id = td.id.split('_')
    i = parseInt(id[0])
    j = parseInt(id[1])
    state[i][j] = !state[i][j]
    mark(i, j, state[i][j]);
}

for (let i = 0; i < num_rows; ++i) {
    let tr = document.createElement("tr");
    for (let j = 0; j < num_columns; ++j) {
        let td = document.createElement("td");
        td.onclick = clicker;
        td.id = i + "_" + j;
        td.style.backgroundColor = "black";
        td.style.height = "20px";
        td.style.width = "20px";
        tr.appendChild(td)
    }
    table.appendChild(tr)
}

document.getElementById("randbutton").onclick = random_oh;
document.getElementById("starter").onclick = start;
