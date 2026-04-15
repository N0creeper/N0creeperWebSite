board = [

];
let maxlevel = 10;
let level = 1;
function createboard() {
    for (let i = 0; i < maxlevel; i++) {
        board.push(Math.floor(Math.random() * 8)+1);
    }
}
let goodubutton;

buttons = [
    document.getElementById("a"),
    document.getElementById("b"),
    document.getElementById("c"),
    document.getElementById("d"),
    document.getElementById("e"),
    document.getElementById("f"),
    document.getElementById("g"),
    document.getElementById("h"),
    document.getElementById("i"),
]

function assignButton() {
    buttons.forEach(btn => btn.onclick = bad);
    buttons[board[level]].onclick = good;
}

function clicked() {
    document.getElementById("title").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("level").innerText = "Niveau " + level + "/" + (maxlevel-1);
    createboard(); 
    assignButton();
}


function good() {
    document.getElementById("midtrue").style.display = "block";
    document.getElementById("game").style.display = "none";
}

function bad() {
    document.getElementById("midfalse").style.display = "block";
    document.getElementById("game").style.display = "none";
}

function end() {
    document.getElementById("end").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("titleend").innerText = "BIEN JOUÉ VOUS ÊTES SORTI DU LABYRINTH DE " + (maxlevel-1) + " PORTES !!!";
}
function next() {
    document.getElementById("midtrue").style.display = "none";
    document.getElementById("game").style.display = "block";
    level++;
    document.getElementById("level").innerText = "Niveau " + level + "/" + (maxlevel-1);
    if (level === maxlevel) {
        end()
    }
    else {
        assignButton()
    }
}

function restart() {
    document.getElementById("midfalse").style.display = "none";
    document.getElementById("game").style.display = "block";
    level = 1;
    assignButton();
    document.getElementById("level").innerText = "Niveau " + level + "/" + (maxlevel-1);
}

function back() {
    location.reload();
}

document.getElementById("start").onclick = clicked;
document.getElementById("continue").onclick = next;
document.getElementById("restart").onclick = restart;
document.getElementById("back").onclick = back;

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('output');

slider.addEventListener('input', function () {
    sliderValue.textContent = "Nombre de portes: " +(this.value-1);
    maxlevel = parseInt(this.value);
});
