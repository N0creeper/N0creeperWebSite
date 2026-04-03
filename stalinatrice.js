const affichage = document.getElementById("affichage");
let nombreactuel = "";
let nombreprécédent = "";
let so = "";
let résultatAffiché = false;
const signe = document.getElementById("signe");
const nombrep = document.getElementById("nombrep");
function ajouterChiffre(chiffre) {
  if (résultatAffiché) {
    nombreactuel = "";
    résultatAffiché = false;
  }
  nombreactuel += chiffre;
  affichage.innerText = nombreactuel;
}
document.getElementById("playButton").addEventListener("click", function () {
  const sound = document.getElementById("clickSound");
  sound.play();
});

function un() {
  ajouterChiffre("1");
}
function deux() {
  ajouterChiffre("2");
}
function trois() {
  ajouterChiffre("3");
}
function quatre() {
  ajouterChiffre("4");
}
function cinq() {
  ajouterChiffre("5");
}
function six() {
  ajouterChiffre("6");
}
function sept() {
  ajouterChiffre("7");
}
function huit() {
  ajouterChiffre("8");
}
function neuf() {
  ajouterChiffre("9");
}
function zero() {
  ajouterChiffre("0");
}

function changerSigne() {
  if (nombreactuel !== "") {
    nombreactuel = (parseFloat(nombreactuel) * -1).toString();
    affichage.innerText = nombreactuel;
  }
}

function c() {
  nombreactuel = "";
  nombreprécédent = "";
  so = "";
  résultatAffiché = false;
  affichage.innerText = "";
  signe.innerText = so;
  nombrep.innerText = nombreprécédent;
}

function v() {
  if (!nombreactuel.includes(".")) {
    nombreactuel += nombreactuel.length > 0 ? "." : "0.";
    affichage.innerText = nombreactuel;
  }
}

function choisirOpérateur(op) {
  if (so && nombreprécédent && nombreactuel) {
    operation();
  }
  if ((nombreactuel.length > 0 && so == "") || (résultatAffiché && so == "")) {
    if (résultatAffiché) {
      résultatAffiché = false;
    }
    nombreprécédent = nombreactuel;
    so = op;
    nombrep.innerText = nombreprécédent;
    nombreactuel = "";
    affichage.innerText = nombreactuel;
    signe.innerText = so;
  }
}

function plus() {
  choisirOpérateur("+");
}
function moins() {
  choisirOpérateur("-");
}
function fois() {
  choisirOpérateur("x");
}
function diviser() {
  choisirOpérateur("÷");
}
function puissance() {
  choisirOpérateur("^");
}
function cos() {
  if (nombreactuel) {
    nombreactuel = Math.cos(parseFloat(nombreactuel)).toString();
    affichage.innerText = nombreactuel;
  }
}
function sin() {
  if (nombreactuel) {
    nombreactuel = Math.sin(parseFloat(nombreactuel)).toString();
    affichage.innerText = nombreactuel;
  }
}
function tan() {
  if (nombreactuel) {
    nombreactuel = Math.tan(parseFloat(nombreactuel)).toString();
    affichage.innerText = nombreactuel;
  }
}

function operation() {
  {
  }
  if (so && nombreprécédent && nombreactuel) {
    const a = parseFloat(nombreprécédent);
    const b = parseFloat(nombreactuel);
    let résultat;

    switch (so) {
      case "+":
        résultat = a + b;
        break;
      case "-":
        résultat = a - b;
        break;
      case "x":
        résultat = a * b;
        break;
      case "÷":
        résultat = b !== 0 ? a / b : "Erreur";
        break;
      case "^":
        résultat = a ** b;
        break;
    }

    nombreactuel = résultat.toString();
    nombreprécédent = "";
    so = "";
    résultatAffiché = true;
    affichage.innerText = nombreactuel;
    signe.innerText = so;
    nombrep.innerText = nombreprécédent;
  }
}

document.getElementById("1").onclick = un;
document.getElementById("2").onclick = deux;
document.getElementById("3").onclick = trois;
document.getElementById("4").onclick = quatre;
document.getElementById("5").onclick = cinq;
document.getElementById("6").onclick = six;
document.getElementById("7").onclick = sept;
document.getElementById("8").onclick = huit;
document.getElementById("9").onclick = neuf;
document.getElementById("z").onclick = zero;
document.getElementById("c").onclick = c;
document.getElementById("v").onclick = v;
document.getElementById("p").onclick = plus;
document.getElementById("m").onclick = moins;
document.getElementById("f").onclick = fois;
document.getElementById("d").onclick = diviser;
document.getElementById("e").onclick = operation;
document.getElementById("ch").onclick = changerSigne;
document.getElementById("pu").onclick = puissance;
document.getElementById("cos").onclick = cos;
document.getElementById("sin").onclick = sin;
document.getElementById("tan").onclick = tan;
