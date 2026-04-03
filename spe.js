const qDiv = document.getElementById("Question");
const t = document.getElementById("Titre");
const nQ = document.getElementById("NumeroQuestion");
const btnA = document.getElementById("RéponseA");
const btnB = document.getElementById("RéponseB");
const btnC = document.getElementById("RéponseC");
const btnD = document.getElementById("RéponseD");
const btnE = document.getElementById("RéponseE");
const startBtn = document.getElementById("startbutton");
const finDiv = document.getElementById("Fin");
const resDiv = document.getElementById("Resultats");

let idx = 0;
let scores = {
    Maths: 0,
    Physique: 0,
    SVT: 0,
    SI: 0,
    NSI: 0,
    SES: 0,
    HGGSP: 0,
    HLP: 0,
    LLCE: 0,
    LLCA: 0,
    Arts: 0,
};

const questions = [
    {
        Question:
            "Tu te sens à l’aise avec les problèmes logiques et les calculs ?",
        effet: [
            { A: { Maths: "1", NSI: "0.5", Physique: "0.5" } },
            { B: { Maths: "0.5", NSI: "0.25", Physique: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", NSI: "-0.25", Physique: "-0.25" } },
            { E: { Maths: "-0.5", NSI: "-0.25", Physique: "-0.25" } },
        ],
    },
    {
        Question: "La programmation t’intéresse ?",
        effet: [
            { A: { NSI: "1", Maths: "0.5" } },
            { B: { NSI: "0.5", Maths: "0.25" } },
            { C: {} },
            { D: { NSI: "-0.25", Maths: "-0.25" } },
            { E: { NSI: "-0.5", Maths: "-0.25" } },
        ],
    },
    {
        Question:
            "Comprendre comment un objet ou une machine fonctionne t’attire ?",
        effet: [
            { A: { SI: "1", Physique: "0.5", Maths: "0.25" } },
            { B: { SI: "0.5", Physique: "0.25" } },
            { C: {} },
            { D: { SI: "-0.25", Physique: "-0.25" } },
            { E: { SI: "-0.5", Physique: "-0.25", Maths: "-0.25" } },
        ],
    },
    {
        Question:
            "Tu es curieux du fonctionnement de la société et de l’économie ?",
        effet: [
            { A: { SES: "1", HGGSP: "0.5" } },
            { B: { SES: "0.5", HGGSP: "0.25" } },
            { C: {} },
            { D: { SES: "-0.25", HGGSP: "-0.25" } },
            { E: { SES: "-0.5", HGGSP: "-0.25" } },
        ],
    },
    {
        Question: "Comprendre des enjeux internationaux t’intéresse ?",
        effet: [
            { A: { HGGSP: "1", SES: "0.5" } },
            { B: { HGGSP: "0.5", SES: "0.25" } },
            { C: {} },
            { D: { HGGSP: "-0.25", SES: "-0.25" } },
            { E: { HGGSP: "-0.5", SES: "-0.25" } },
        ],
    },
    {
        Question: "Analyser des textes, des idées ou des œuvres, c’est ton truc ?",
        effet: [
            { A: { HLP: "1", LLCE: "0.5" } },
            { B: { HLP: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { HLP: "-0.25", LLCE: "-0.25" } },
            { E: { HLP: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Lire ou parler en langue étrangère, c’est naturel pour toi ?",
        effet: [
            { A: { LLCE: "1", HLP: "0.5" } },
            { B: { LLCE: "0.5", HLP: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", HLP: "-0.25" } },
            { E: { LLCE: "-0.5", HLP: "-0.25" } },
        ],
    },
    {
        Question:
            "Les mythes anciens, les langues mortes ou l’étymologie t’intéressent ?",
        effet: [
            { A: { LLCA: "1", HLP: "0.5" } },
            { B: { LLCA: "0.5", HLP: "0.25" } },
            { C: {} },
            { D: { LLCA: "-0.25", HLP: "-0.25" } },
            { E: { LLCA: "-0.5", HLP: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes étudier la nature, le vivant ou les écosystèmes ?",
        effet: [
            { A: { SVT: "1", Physique: "0.5" } },
            { B: { SVT: "0.5", Physique: "0.25" } },
            { C: {} },
            { D: { SVT: "-0.25", Physique: "-0.25" } },
            { E: { SVT: "-0.5", Physique: "-0.25" } },
        ],
    },
    {
        Question: "Créer (dessin, musique, théâtre…) te motive ?",
        effet: [
            { A: { Arts: "1", LLCE: "0.5" } },
            { B: { Arts: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCE: "-0.25" } },
            { E: { Arts: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Raisonner étape par étape te semble naturel ?",
        effet: [
            { A: { Maths: "1", NSI: "0.5", Physique: "0.5" } },
            { B: { Maths: "0.5", NSI: "0.25", Physique: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", NSI: "-0.25", Physique: "-0.25" } },
            { E: { Maths: "-0.5", NSI: "-0.25", Physique: "-0.25" } },
        ],
    },
    {
        Question:
            "Travailler longtemps sur un problème complexe ne te dérange pas ?",
        effet: [
            { A: { Maths: "1", SI: "0.5", Physique: "0.5" } },
            { B: { Maths: "0.5", SI: "0.25", Physique: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", SI: "-0.25", Physique: "-0.25" } },
            { E: { Maths: "-0.5", SI: "-0.25", Physique: "-0.25" } },
        ],
    },
    {
        Question:
            "Observer des comportements humains pour les analyser, ça te plaît ?",
        effet: [
            { A: { SES: "1", HGGSP: "0.5", HLP: "0.5" } },
            { B: { SES: "0.5", HGGSP: "0.25" } },
            { C: {} },
            { D: { SES: "-0.25", HGGSP: "-0.25", HLP: "-0.25" } },
            { E: { SES: "-0.5", HGGSP: "-0.25", HLP: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes réfléchir à des questions éthiques ou philosophiques ?",
        effet: [
            { A: { HLP: "1", LLCE: "0.5" } },
            { B: { HLP: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { HLP: "-0.25", LLCE: "-0.25" } },
            { E: { HLP: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Tu es capable de te concentrer sur des textes longs ?",
        effet: [
            { A: { LLCE: "1", HLP: "0.5" } },
            { B: { LLCE: "0.5", HLP: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", HLP: "-0.25" } },
            { E: { LLCE: "-0.5", HLP: "-0.25" } },
        ],
    },
    {
        Question:
            "Imaginer des histoires, des dessins ou des scènes te vient facilement ?",
        effet: [
            { A: { Arts: "1", LLCE: "0.5" } },
            { B: { Arts: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCE: "-0.25" } },
            { E: { Arts: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes comprendre comment fonctionnent les êtres vivants ?",
        effet: [
            { A: { SVT: "1", Physique: "0.5" } },
            { B: { SVT: "0.5", Physique: "0.25" } },
            { C: {} },
            { D: { SVT: "-0.25", Physique: "-0.25" } },
            { E: { SVT: "-0.5", Physique: "-0.25" } },
        ],
    },
    {
        Question:
            "Tu te sens à l’aise pour expliquer des idées ou enseigner quelque chose ?",
        effet: [
            { A: { HLP: "0.75", SES: "0.75", LLCE: "0.5" } },
            { B: { HLP: "0.5", SES: "0.5" } },
            { C: {} },
            { D: { HLP: "-0.25", SES: "-0.25", LLCE: "-0.25" } },
            { E: { HLP: "-0.5", SES: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question:
            "Tu aimes découvrir de nouvelles cultures ou langues étrangères ?",
        effet: [
            { A: { LLCE: "1", HGGSP: "0.5" } },
            { B: { LLCE: "0.5", HGGSP: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", HGGSP: "-0.25" } },
            { E: { LLCE: "-0.5", HGGSP: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes résoudre des casse-têtes et énigmes ?",
        effet: [
            { A: { Maths: "1", NSI: "0.5" } },
            { B: { Maths: "0.5", NSI: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", NSI: "-0.25" } },
            { E: { Maths: "-0.5", NSI: "-0.25" } },
        ],
    },
    {
        Question:
            "Tu aimes travailler en groupe pour discuter de sujets complexes ?",
        effet: [
            { A: { SES: "0.75", HGGSP: "0.5" } },
            { B: { SES: "0.5", HGGSP: "0.25" } },
            { C: {} },
            { D: { SES: "-0.25", HGGSP: "-0.25" } },
            { E: { SES: "-0.5", HGGSP: "-0.25" } },
        ],
    },
    {
        Question: "Tu prends plaisir à créer quelque chose de tes mains ?",
        effet: [
            { A: { Arts: "1", SI: "0.5" } },
            { B: { Arts: "0.5", SI: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", SI: "-0.25" } },
            { E: { Arts: "-0.5", SI: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes faire des expériences scientifiques ?",
        effet: [
            { A: { Physique: "0.75", SVT: "1" } },
            { B: { Physique: "0.5", SVT: "0.5" } },
            { C: {} },
            { D: { Physique: "-0.25", SVT: "-0.25" } },
            { E: { Physique: "-0.5", SVT: "-0.5" } },
        ],
    },
    {
        Question: "Tu es intéressé par l’histoire et la géopolitique ?",
        effet: [
            { A: { HGGSP: "1", SES: "0.5" } },
            { B: { HGGSP: "0.5", SES: "0.25" } },
            { C: {} },
            { D: { HGGSP: "-0.25", SES: "-0.25" } },
            { E: { HGGSP: "-0.5", SES: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes analyser des données ou statistiques ?",
        effet: [
            { A: { Maths: "1", SES: "0.25" } },
            { B: { Maths: "0.5", SES: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", SES: "-0.25" } },
            { E: { Maths: "-0.5", SES: "-0.25" } },
        ],
    },
    {
        Question: "Tu es curieux de la philosophie et des grandes idées ?",
        effet: [
            { A: { HLP: "1", LLCE: "0.5" } },
            { B: { HLP: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { HLP: "-0.25", LLCE: "-0.25" } },
            { E: { HLP: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes la lecture et l’écriture créative ?",
        effet: [
            { A: { LLCE: "1", Arts: "0.5" } },
            { B: { LLCE: "0.5", Arts: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", Arts: "-0.25" } },
            { E: { LLCE: "-0.5", Arts: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes comprendre les systèmes naturels et écologiques ?",
        effet: [
            { A: { SVT: "1", Physique: "0.5" } },
            { B: { SVT: "0.5", Physique: "0.25" } },
            { C: {} },
            { D: { SVT: "-0.25", Physique: "-0.25" } },
            { E: { SVT: "-0.5", Physique: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes concevoir des projets techniques ?",
        effet: [
            { A: { SI: "1", Maths: "0.5" } },
            { B: { SI: "0.5", Maths: "0.25" } },
            { C: {} },
            { D: { SI: "-0.25", Maths: "-0.25" } },
            { E: { SI: "-0.5", Maths: "-0.25" } },
        ],
    },
    {
        Question: "Tu es intéressé par les arts visuels ou la musique ?",
        effet: [
            { A: { Arts: "1", LLCA: "0.5" } },
            { B: { Arts: "0.5", LLCA: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCA: "-0.25" } },
            { E: { Arts: "-0.5", LLCA: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes comprendre les mécanismes physiques ?",
        effet: [
            { A: { Physique: "1", SI: "0.5" } },
            { B: { Physique: "0.5", SI: "0.25" } },
            { C: {} },
            { D: { Physique: "-0.25", SI: "-0.25" } },
            { E: { Physique: "-0.5", SI: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes expliquer tes idées aux autres ?",
        effet: [
            { A: { HLP: "0.75", SES: "0.5" } },
            { B: { HLP: "0.5", SES: "0.25" } },
            { C: {} },
            { D: { HLP: "-0.25", SES: "-0.25" } },
            { E: { HLP: "-0.5", SES: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes apprendre de nouvelles langues étrangères ?",
        effet: [
            { A: { LLCE: "1", LLCA: "0.5" } },
            { B: { LLCE: "0.5", LLCA: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", LLCA: "-0.25" } },
            { E: { LLCE: "-0.5", LLCA: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes faire des recherches scientifiques ou historiques ?",
        effet: [
            { A: { HGGSP: "0.75", SVT: "1" } },
            { B: { HGGSP: "0.5", SVT: "0.5" } },
            { C: {} },
            { D: { HGGSP: "-0.25", SVT: "-0.25" } },
            { E: { HGGSP: "-0.5", SVT: "-0.5" } },
        ],
    },
    {
        Question: "Tu es intéressé par l’art et la créativité ?",
        effet: [
            { A: { Arts: "1", LLCE: "0.5" } },
            { B: { Arts: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCE: "-0.25" } },
            { E: { Arts: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes comprendre les relations humaines ?",
        effet: [
            { A: { SES: "1", HLP: "0.5" } },
            { B: { SES: "0.5", HLP: "0.25" } },
            { C: {} },
            { D: { SES: "-0.25", HLP: "-0.25" } },
            { E: { SES: "-0.5", HLP: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes faire des projets concrets et techniques ?",
        effet: [
            { A: { SI: "1", Maths: "0.5" } },
            { B: { SI: "0.5", Maths: "0.25" } },
            { C: {} },
            { D: { SI: "-0.25", Maths: "-0.25" } },
            { E: { SI: "-0.5", Maths: "-0.25" } },
        ],
    },
    {
        Question: "Tu es intéressé par l’histoire des civilisations et cultures ?",
        effet: [
            { A: { HGGSP: "1", LLCA: "0.5" } },
            { B: { HGGSP: "0.5", LLCA: "0.25" } },
            { C: {} },
            { D: { HGGSP: "-0.25", LLCA: "-0.25" } },
            { E: { HGGSP: "-0.5", LLCA: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes la logique et les schémas ?",
        effet: [
            { A: { Maths: "1", NSI: "0.5" } },
            { B: { Maths: "0.5", NSI: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", NSI: "-0.25" } },
            { E: { Maths: "-0.5", NSI: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes la biologie et la compréhension du vivant ?",
        effet: [
            { A: { SVT: "1", Physique: "0.5" } },
            { B: { SVT: "0.5", Physique: "0.25" } },
            { C: {} },
            { D: { SVT: "-0.25", Physique: "-0.25" } },
            { E: { SVT: "-0.5", Physique: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes réfléchir à des problèmes éthiques et sociaux ?",
        effet: [
            { A: { HLP: "1", SES: "0.5" } },
            { B: { HLP: "0.5", SES: "0.25" } },
            { C: {} },
            { D: { HLP: "-0.25", SES: "-0.25" } },
            { E: { HLP: "-0.5", SES: "-0.25" } },
        ],
    },
    {
        Question: "Tu es intéressé par la linguistique ou l’histoire des langues ?",
        effet: [
            { A: { LLCE: "1", LLCA: "0.5" } },
            { B: { LLCE: "0.5", LLCA: "0.25" } },
            { C: {} },
            { D: { LLCE: "-0.25", LLCA: "-0.25" } },
            { E: { LLCE: "-0.5", LLCA: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes la physique et les expériences ?",
        effet: [
            { A: { Physique: "1", SI: "0.5" } },
            { B: { Physique: "0.5", SI: "0.25" } },
            { C: {} },
            { D: { Physique: "-0.25", SI: "-0.25" } },
            { E: { Physique: "-0.5", SI: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes créer des œuvres artistiques ?",
        effet: [
            { A: { Arts: "1", LLCE: "0.5" } },
            { B: { Arts: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCE: "-0.25" } },
            { E: { Arts: "-0.5", LLCE: "-0.25" } },
        ],
    },
    {
        Question: "Tu es intéressé par la programmation avancée ?",
        effet: [
            { A: { NSI: "1", Maths: "0.5" } },
            { B: { NSI: "0.5", Maths: "0.25" } },
            { C: {} },
            { D: { NSI: "-0.25", Maths: "-0.25" } },
            { E: { NSI: "-0.5", Maths: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes étudier les cultures et civilisations anciennes ?",
        effet: [
            { A: { HGGSP: "1", LLCA: "0.5" } },
            { B: { HGGSP: "0.5", LLCA: "0.25" } },
            { C: {} },
            { D: { HGGSP: "-0.25", LLCA: "-0.25" } },
            { E: { HGGSP: "-0.5", LLCA: "-0.25" } },
        ],
    },
    {
        Question: "Tu aimes résoudre des problèmes complexes en équipe ?",
        effet: [
            { A: { Maths: "0.75", SI: "0.5" } },
            { B: { Maths: "0.5", SI: "0.25" } },
            { C: {} },
            { D: { Maths: "-0.25", SI: "-0.25" } },
            { E: { Maths: "-0.5", SI: "-0.25" } },
        ],
    },
    {
        Question: "Tu es intéressé par la musique, le théâtre ou le dessin ?",
        effet: [
            { A: { Arts: "1", LLCE: "0.5" } },
            { B: { Arts: "0.5", LLCE: "0.25" } },
            { C: {} },
            { D: { Arts: "-0.25", LLCE: "-0.25" } },
            { E: { Arts: "-0.5", LLCE: "-0.25" } },
        ],
    },
];

let maxScore = {};
for (let s in scores) maxScore[s] = 0;

for (let i = 0; i < questions.length; i++) {
    let q = questions[i];
    let bestEff = {};
    for (let j = 0; j < q.effet.length; j++) {
        let o = q.effet[j];
        let key = Object.keys(o)[0];
        for (let s in o[key]) {
            let v = parseFloat(o[key][s]);
            if (!bestEff[s] || v > bestEff[s]) bestEff[s] = v;
        }
    }
    for (let s in bestEff) maxScore[s] += bestEff[s];
    for (let s in scores) {
        scores[s] = maxScore[s] * 0.25;
    }
}

startBtn.onclick = function () {
    document.getElementById("Start").style.display = "none";
    qDiv.style.display = "block";
    showQ();
};

function showQ() {
    t.textContent = questions[idx].Question;
    nQ.textContent = "Question " + (idx + 1) + "/" + questions.length;
}

function applyEff(rep) {
    let eff = questions[idx].effet.find((o) => o[rep])[rep];
    for (let s in eff) {
        scores[s] += parseFloat(eff[s]);
    }
}

function nextQ() {
    idx++;
    if (idx >= questions.length) {
        finish();
    } else {
        showQ();
    }
}

function finish() {
    qDiv.style.display = "none";
    finDiv.style.display = "block";
    resDiv.innerHTML = "";
    let results = [];
    for (let s in scores) {
        let p = 25 + (scores[s] / maxScore[s]) * 75;
        if (p > 100) p = 100;
        results.push({ subject: s, percent: p });
    }
    results.sort((a, b) => b.percent - a.percent);
    results.forEach((r, index) => {
        if (index < 3) {
            resDiv.innerHTML +=
                "<p class='prn'><strong>" +
                r.subject +
                "</strong> : " +
                r.percent.toFixed(1) +
                "%</p>";
        } else {
            resDiv.innerHTML +=
                "<p><strong>" +
                r.subject +
                "</strong> : " +
                r.percent.toFixed(1) +
                "%</p>";
        }
    });
}

btnA.onclick = () => {
    applyEff("A");
    nextQ();
};
btnB.onclick = () => {
    applyEff("B");
    nextQ();
};
btnC.onclick = () => {
    applyEff("C");
    nextQ();
};
btnD.onclick = () => {
    applyEff("D");
    nextQ();
};
btnE.onclick = () => {
    applyEff("E");
    nextQ();
};
