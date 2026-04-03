const oe = document.querySelector("#start");
const bt1 = document.getElementById("zoneImageA");
const bt2 = document.getElementById("zoneImageB");
const bt3 = document.getElementById("zoneImageC");
const titre = document.getElementById("titre");
const question = document.getElementById("text");
let slide = 0;

function reussite1() {
  bt1.style.display = "none";
  bt2.style.display = "none";
  bt3.style.display = "none";
  oe.style.display = "block";
  oe.innerText = "Suivant";
  titre.innerText = "Bien joué";
  question.innerText = "";
  if (slide == 10) {
    oe.innerHTML =
      "<button id='start'><a href='https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei'>Finaliser</a></button>";
    titre.innerText = "BRAVO";
  }
}

function update() {
  if (slide == 0) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/il.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      ' <a> <img height="200px" src="https://flagcdn.com/w2560/fr.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/it.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 1";
    question.innerText = "Quel est le drapeau de la France?";
    slide = 1;
  } else if (slide == 1) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a> <img height="200px" src="https://flagcdn.com/w2560/ag.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/bi.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/er.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 2";
    question.innerText = "Quel est le drapeau d'Antigua et Barbuda?";
    slide = 2;
  } else if (slide == 2) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/gg.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/cx.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a><img height="200px" src="https://flagcdn.com/w2560/ck.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 3";
    question.innerText = "Quel est le drapeau des iles Cook?";
    slide = 3;
  } else if (slide == 3) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/cw.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/ax.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a><img height="200px" src="https://flagcdn.com/w2560/ky.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 4";
    question.innerText = "Quel est le drapeau des iles Caimans?";
    slide = 4;
  } else if (slide == 4) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a> <img height="200px" src="https://flagcdn.com/w2560/us.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/es.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/jp.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 5";
    question.innerText = "Quel est le drapeau des Etats Unis?";
    slide = 5;
  } else if (slide == 5) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/ro.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a> <img height="200px" src="https://flagcdn.com/w2560/md.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/ad.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 6";
    question.innerText = "Quel est le drapeau de la Moldavie?";
    slide = 6;
  } else if (slide == 6) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/aw.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a> <img height="200px" src="https://flagcdn.com/w2560/gi.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/hk.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 7";
    question.innerText = "Quel est le drapeau de Gibraltar?";
    slide = 7;
  } else if (slide == 7) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a> <img height="200px" src="https://flagcdn.com/w2560/mh.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/mp.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"><img height="200px" src="https://flagcdn.com/w2560/vi.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 8";
    question.innerText = "Quel est le drapeau des iles Marshall?";
    slide = 8;
  } else if (slide == 8) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/gu.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/im.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a><img height="200px" src="https://flagcdn.com/w2560/nf.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Question 9";
    question.innerText = "Quel est le drapeau de l'ile Norfolk?";
    slide = 9;
  } else if (slide == 9) {
    bt1.style.display = "block";
    bt1.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/fk.png"></img> </a>';
    bt2.style.display = "block";
    bt2.innerHTML =
      '<a href="https://youtu.be/dQw4w9WgXcQ?si=igBUtnzB5SMI99ei"> <img height="200px" src="https://flagcdn.com/w2560/vg.png"></img> </a>';
    bt3.style.display = "block";
    bt3.innerHTML =
      '<a><img height="200px" src="https://flagcdn.com/w2560/tc.png"></img> </a>';
    oe.style.display = "none";
    titre.innerText = "Dernière Question";
    question.innerText = "Quel est le drapeau des iles Turques-et-Caïques?";
    slide = 10;
  }
}

function reponseA() {
  if (slide == 2 || slide == 5 || slide == 8) {
    reussite1();
  }
}
function reponseB() {
  if (slide == 1 || slide == 6 || slide == 7) {
    reussite1();
  }
}
function reponseC() {
  if (slide == 3 || slide == 4 || slide == 9 || slide == 10) {
    reussite1();
  }
}

bt1.style.display = "none";
bt2.style.display = "none";
bt3.style.display = "none";

oe.onclick = update;
bt1.onclick = reponseA;
bt2.onclick = reponseB;
bt3.onclick = reponseC;
