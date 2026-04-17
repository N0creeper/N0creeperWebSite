let exercices = {};
let exercice_en_cours = false;

const Btnclick = document.getElementById("click");
const zonejauge = document.getElementById("remplissage");
const AffichageCoins = document.getElementById("money");

let remplissage_jauge = 100;
let coins = 0;

const configBoost = {
    gainParNiveau: 10,   // coins gagnés par niveau de difficulté
    bonusFixe: 0,        // bonus fixe optionnel
    perteSiRate: 0       // malus si raté
};

let coins_gain = {
    divider: 1000,
    power: 2,
};

async function chargerExercices() {
    try {
        const response = await fetch("exercices.json");
        exercices = await response.json();
        console.log("Exercices chargés :", exercices);
    } catch (err) {
        console.error("Erreur de chargement du JSON :", err);
    }
}

function coins_click_modif(n) {
    return (n ** coins_gain.power) / coins_gain.divider;
}

function afficherExercice(exo) {
    const enonce = document.getElementById("Enonce");
    const repContainer = document.getElementById("Reponses");
    const feedback = document.getElementById("Feedback");

    enonce.textContent = exo.Q;
    repContainer.innerHTML = "";
    feedback.textContent = "";

    let reponses = exo.C.map((texte, index) => ({
        texte: texte,
        bonne: index === exo.R
    }));

    for (let i = reponses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reponses[i], reponses[j]] = [reponses[j], reponses[i]];
    }

    exo._Rmelange = reponses.findIndex(r => r.bonne);

    reponses.forEach((rep) => {
        const btn = document.createElement("button");
        btn.textContent = rep.texte;
        repContainer.appendChild(btn);
    });
}

async function lancerExercice(mode) {
    exercice_en_cours = true;

    const types = Object.keys(exercices);
    const type = types[Math.floor(Math.random() * types.length)];
    const liste = exercices[type];
    const exo = liste[Math.floor(Math.random() * liste.length)];

    afficherExercice(exo);

    const zone = document.getElementById("Exercice");
    const repContainer = document.getElementById("Reponses");
    const feedback = document.getElementById("Feedback");

    zone.style.visibility = "visible";

    repContainer.querySelectorAll("button").forEach((btn, index) => {
        btn.onclick = () => {
            repContainer.querySelectorAll("button").forEach(b => b.disabled = true);

            const bonne = (index === exo._Rmelange);

            if (mode === "jauge") {
                if (bonne) {
                    btn.classList.add("correct");
                    feedback.textContent = "Bonne réponse !";
                    remplissage_jauge = 75;
                } else {
                    btn.classList.add("wrong");
                    feedback.textContent = "Mauvaise réponse.";
                    remplissage_jauge = 50;

                    const perte = Math.round(exo.D * 10);
                    coins = Math.max(0, coins - perte);
                }
            }

            if (mode === "boost") {
                if (bonne) {
                    btn.classList.add("correct");
                    feedback.textContent = "Boost réussi !";

                    coins += exo.D * configBoost.gainParNiveau + configBoost.bonusFixe;
                } else {
                    btn.classList.add("wrong");
                    feedback.textContent = "Raté...";

                    coins = Math.max(0, coins - configBoost.perteSiRate);
                }
            }

            zonejauge.style.width = remplissage_jauge + "%";

            setTimeout(() => {
                zone.style.visibility = "hidden";
                exercice_en_cours = false;
            }, 1500);
        };
    });
}


function remplissage_jauge_action() {
    if (exercice_en_cours) return;

    remplissage_jauge -= Math.round(Math.exp(0.01 * remplissage_jauge) + 1);

    if (remplissage_jauge < 0) {
        remplissage_jauge = 0;
        lancerExercice("jauge");
    }

    zonejauge.style.width = remplissage_jauge + "%";
    coins += Math.round(coins_click_modif(remplissage_jauge));
}

async function startGame() {
    await chargerExercices();

    zonejauge.style.width = remplissage_jauge + "%";

    setInterval(() => {
        remplissage_jauge_action();
        AffichageCoins.innerText = "Coins : " + coins;
    }, 500);
}

startGame();

Btnclick.addEventListener("click", () => {
    if (exercice_en_cours) return;

    remplissage_jauge = Math.round(remplissage_jauge + 5 - 0.0005 * (remplissage_jauge ** 2));
    if (remplissage_jauge > 100) remplissage_jauge = 100;

    zonejauge.style.width = remplissage_jauge + "%";
});

document.getElementById("boost").onclick = () => {
    if (!exercice_en_cours) lancerExercice("boost");
};

document.getElementById("formule_coin_gain").innerText =
    `Gain = \\( \\frac{x^{y}}{z} \\). y = ${coins_gain.power}, z = ${coins_gain.divider}`;
MathJax.typeset();
