document.getElementById("form").onclick = () => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSf8_Wxq0biJyaVVKS7fgsIkzBEMJj33K48yMupZYYKfpGXLNQ/viewform?usp=dialog";
};

const elements = {
    bois: document.getElementById("bois"),
    pierre: document.getElementById("pierre"),
    fer: document.getElementById("fer"),
    lingotfer: document.getElementById("lingotfer"),
    charbon: document.getElementById("charbon"),
    nbrbois: document.getElementById("nmbrbois"),
    nbrpierre: document.getElementById("nmbrpierre"),
    nbrfer: document.getElementById("nmbrfer"),
    planche: document.getElementById("planche"),
    pierrelisse: document.getElementById("pierrelisse"),
    xpactuel: document.getElementById("xpactuel"),
    xpdemandé: document.getElementById("xpdemandé"),
    niveau: document.getElementById("niveau"),
    xpsec: document.getElementById("xpsec"),
    xpmulti: document.getElementById("xpmulti"),
    xpexpo: document.getElementById("xpexpo"),
    points: document.getElementById("points"),
    xpTotalSec: document.getElementById("xpTotalSec"),
    multixpbois: document.getElementById("multixpbois"),
    multixppierre: document.getElementById("multixppierre"),
    multixpclick: document.getElementById("multixpclick"),
    ble: document.getElementById("ble"),
    pain: document.getElementById("pain"),
};

officialversion = "v0.0.5";
document.getElementById("version").innerText = officialversion;

let state = {
    version: officialversion,
    bois: 0,
    pierre: 0,
    fer: 0,
    lingotfer: 0,
    charbon: 0,
    charbonMax: 5,
    boisparsec: 0,
    pierreparseconde: 0,
    autoFer: 0,
    multibois: 1,
    multipierre: 1,
    multiclickbois: 1,
    multiclickpierre: 1,
    multiclickfer: 1,
    planche: 0,
    pierrelisse: 0,
    projetsAchetes: {},
    xp: 0,
    xpCap: 20,
    niveau: 0,
    xpsec: 0,
    xpmulti: 1,
    xpexpo: 1,
    points: 0,
    multiboisbonus: 1,
    multipierrebonus: 1,
    multiferbonus: 1,
    multiclickbonus: 1,
    xpTotSec: 0,
    ble: 0,
    tpsble: 60000,
    blelootbonus: 0,
    tpscharbon: 10000,
    multiprixcraft: 1,
    boisCap: 100,
    pierreCap: 100,
    ferCap: 100,
    pain: 0,
};

const projets = [
    { id: "bois1", cost: { bois: 10 }, effect: () => state.boisparsec += 0.2, requires: [], unlocks: false },
    { id: "bois2", cost: { bois: 30 }, effect: () => state.boisparsec += 0.8, requires: ["bois1"], unlocks: false },
    { id: "clickbois1", cost: { bois: 50 }, effect: () => state.multiclickbois += 1, requires: ["bois2"], unlocks: false },
    { id: "bois3", cost: { bois: 80 }, effect: () => state.boisparsec += 1.5, requires: ["bois2"], unlocks: false },
    { id: "pioche1", cost: { bois: 80 }, effect: () => { document.querySelectorAll(".classpierre").forEach(el => el.style.display = "block"); }, requires: ["bois2"], unlocks: true },
    { id: "pierre1", cost: { bois: 100, pierre: 20 }, effect: () => state.pierreparseconde += 1, requires: ["pioche1"], unlocks: false },
    { id: "bois4", cost: { bois: 100, pierre: 20 }, effect: () => state.boisparsec += 1.5, requires: ["pioche1"], unlocks: false },
    { id: "pierre2", cost: { bois: 150, pierre: 75 }, effect: () => state.pierreparseconde += 2, requires: ["pierre1"], unlocks: false },
    { id: "Double Bois/Pierre", cost: { bois: 200, pierre: 150 }, effect: () => { state.multibois *= 2; state.multipierre *= 2; }, requires: ["pierre2"], unlocks: false },
    { id: "craft1", cost: { bois: 300, pierre: 200 }, effect: () => { document.querySelectorAll(".classcraft").forEach(el => el.style.display = "block"); }, requires: ["pierre1"], unlocks: true },
    { id: "clicpierre1", cost: { planche: 1, pierrelisse: 1 }, effect: () => state.multiclickpierre += 1, requires: ["craft1"], unlocks: false },
    { id: "enchantement1", cost: { planche: 5, pierrelisse: 5 }, effect: () => { document.querySelectorAll(".classenchant").forEach(el => el.style.display = "block"); }, requires: ["craft1"], unlocks: true },
    { id: "pioche2", cost: { planche: 25, pierrelisse: 25 }, effect: () => { document.querySelectorAll(".classfer").forEach(el => el.style.display = "block"); state.charbon = 0 }, requires: ["enchantement1"], unlocks: true },
    { id: "fer1", cost: { fer: 2 }, effect: () => state.autoFer += 0.1, requires: ["pioche2"], unlocks: false },
    { id: "outil", cost: { lingotfer: 3, planche: 25 }, effect: () => { document.querySelectorAll(".classble").forEach(el => el.style.display = "block"); }, requires: ["pioche2"], unlocks: true },
    { id: "multiprixcraft", cost: { lingotfer: 5, planche: 25, pierrelisse: 50 }, effect: () => { state.multiprixcraft = 0.75; updateCrafts(); }, requires: ["fer1"], unlocks: false },
    { id: "fer2", cost: { lingotfer: 7, planche: 50, pierrelisse: 30 }, effect: () => state.autoFer += 0.2, requires: ["fer1"], unlocks: false },
    {
        id: "tpscharbon1", cost: { lingotfer: 10, planche: 70, pierrelisse: 45 }, effect: () => {
            state.tpscharbon = 5000;
            clearInterval(charbonInterval);
            charbonInterval = setInterval(() => {
                state.charbon = Math.min(state.charbonMax, state.charbon + 1);
            }, state.tpscharbon);
        }, requires: ["multiprixcraft"], unlocks: false
    },
    { id: "tps1", cost: { ble: 1 }, effect: () => { updateTpsBle() }, requires: [], unlocks: false },
    { id: "plantble2", cost: { ble: 3 }, effect: () => { document.querySelectorAll("#ble2").forEach(el => el.style.display = "block"); }, requires: [], unlocks: false },
    { id: "doubleloot", cost: { ble: 5 }, effect: () => { state.blelootbonus = 0.25 }, requires: ["tps1"], unlocks: false },
    { id: "stockcharbon", cost: { ble: 5 }, effect: () => state.charbonMax += 5, requires: ["plantble2"], unlocks: false },
];

const crafts = [
    { id: "craftplanche1", baseCost: { bois: 100 }, getCost: () => ({ bois: 100 * state.multiprixcraft }), effect: () => state.planche += 1 },
    { id: "craftplanche2", baseCost: { bois: 500 }, getCost: () => ({ bois: 500 * state.multiprixcraft }), effect: () => state.planche += 5 },
    { id: "craftplanche3", baseCost: { bois: 1000 }, getCost: () => ({ bois: 1000 * state.multiprixcraft }), effect: () => state.planche += 10 },
    { id: "craftpierrelisse1", baseCost: { pierre: 100 }, getCost: () => ({ pierre: 100 * state.multiprixcraft }), effect: () => state.pierrelisse += 1 },
    { id: "craftpierrelisse2", baseCost: { pierre: 500 }, getCost: () => ({ pierre: 500 * state.multiprixcraft }), effect: () => state.pierrelisse += 5 },
    { id: "craftpierrelisse3", baseCost: { pierre: 1000 }, getCost: () => ({ pierre: 1000 * state.multiprixcraft }), effect: () => state.pierrelisse += 10 }
];


const upgrades = {
    axpsec: { cost: { planche: 1 }, rawCost: 1, effect: () => state.xpsec += 0.1, increaseCost: () => { upgrades.axpsec.rawCost *= 1.6; upgrades.axpsec.cost.planche = Math.ceil(upgrades.axpsec.rawCost); } },
    axpmulti: { cost: { pierrelisse: 10 }, rawCost: 10, effect: () => state.xpmulti += 0.1, increaseCost: () => { upgrades.axpmulti.rawCost *= 1.6; upgrades.axpmulti.cost.pierrelisse = Math.ceil(upgrades.axpmulti.rawCost); } },
    axpexpo: { cost: { lingotfer: 20 }, rawCost: 20, effect: () => state.xpexpo += 0.01, increaseCost: () => { upgrades.axpexpo.rawCost *= 1.6; upgrades.axpexpo.cost.lingotfer = Math.ceil(upgrades.axpexpo.rawCost); } }
};

function peutAcheter(cost) { return Object.keys(cost).every(res => state[res] >= cost[res]); }
function payer(cost) { Object.keys(cost).forEach(res => state[res] -= cost[res]); }

function clickable(btnId, fn, cooldown = 1500, onlyIfSuccess = false) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let blocked = false;
    const gauge = document.createElement("div");
    gauge.style.position = "absolute";
    gauge.style.top = "-8px";
    gauge.style.left = "50%";
    gauge.style.transform = "translateX(-50%)";
    gauge.style.height = "6px";
    gauge.style.width = "70%";
    gauge.style.background = "#444";
    gauge.style.borderRadius = "3px";
    gauge.style.overflow = "hidden";
    gauge.style.display = "none";
    const fill = document.createElement("div");
    fill.style.height = "100%";
    fill.style.width = "0%";
    fill.style.background = "#00ff88";
    gauge.appendChild(fill);
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    btn.parentNode.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);
    wrapper.appendChild(gauge);

    btn.onclick = () => {
        if (blocked) return;
        const success = fn();
        if (onlyIfSuccess && !success) return;
        blocked = true;
        gauge.style.display = "block";
        fill.style.transition = "none";
        fill.style.width = "0%";
        requestAnimationFrame(() => { fill.style.transition = `width ${cooldown}ms linear`; fill.style.width = "100%"; });
        setTimeout(() => { blocked = false; gauge.style.display = "none"; }, cooldown);
    };
}

clickable("M_bois", () => { state.bois += 1 * state.multiclickbois * state.multiclickbonus; update(); });
clickable("M_pierre", () => { state.pierre += 1 * state.multiclickpierre * state.multiclickbonus; update(); });
clickable("M_fer", () => { state.fer += 0.25 * state.multiclickfer; update(); return true; }, 3000, true);
clickable("fourfer", () => { if (state.fer >= 6 && state.charbon >= 3) { state.fer -= 6; state.charbon -= 3; setTimeout(() => { state.lingotfer += 1; update(); }, 3000); return true; } return false; }, 3000, true);
clickable("fourpain", () => { if (state.ble >= 4 && state.charbon >= 7) { state.ble -= 4; state.charbon -= 7; setTimeout(() => { state.pain += 1; update(); }, 3000); return true; } return false; }, 3000, true);

function clickableBle(btnId, cooldown = 60000) {
    const btn = document.getElementById(btnId);
    if (!btn || btn.dataset.initialized === "true") return;

    btn.dataset.initialized = "true";

    let growing = false;
    let ready = false;
    let img = null;

    const gauge = document.createElement("div");
    gauge.style.position = "absolute";
    gauge.style.top = "-8px";
    gauge.style.left = "50%";
    gauge.style.transform = "translateX(-50%)";
    gauge.style.height = "6px";
    gauge.style.width = "70%";
    gauge.style.background = "#444";
    gauge.style.borderRadius = "3px";
    gauge.style.overflow = "hidden";
    gauge.style.display = "none";

    const fill = document.createElement("div");
    fill.style.height = "100%";
    fill.style.width = "0%";
    fill.style.background = "#00ff00";
    gauge.appendChild(fill);

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    btn.parentNode.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);
    wrapper.appendChild(gauge);

    const startGrowth = () => {
        growing = true;
        ready = false;
        gauge.style.display = "block";
        fill.style.transition = "none";
        fill.style.width = "0%";

        if (img) btn.removeChild(img);
        img = document.createElement("img");
        img.style.width = "40px";
        img.style.height = "40px";
        img.src = "Textures/grainesblé.png";
        btn.appendChild(img);

        requestAnimationFrame(() => {
            fill.style.transition = `width ${cooldown}ms linear`;
            fill.style.width = "100%";
        });

        setTimeout(() => {
            growing = false;
            ready = true;
            img.src = "Textures/blé.png";
            gauge.style.display = "none";
        }, cooldown);
    };

    btn.onclick = () => {
        if (!growing && !ready) {
            startGrowth();
        } else if (ready) {
            state.ble += 1 + Math.floor(Math.random() * (1 + state.blelootbonus));
            update();
            ready = false;
            if (img) {
                btn.removeChild(img);
                img = null;
            }
        }
    };
}

function updateTpsBle() {
    state.tpsble /= 2;
    const btn1 = document.getElementById("ble1");
    const btn2 = document.getElementById("ble2");
    if (btn1 && btn1.updateCooldown) btn1.updateCooldown(state.tpsble);
    if (btn2 && btn2.updateCooldown) btn2.updateCooldown(state.tpsble);
}

clickableBle("ble1", state.tpsble);
clickableBle("ble2", state.tpsble);

const competenceButtons = [
    { id: "axpsec", effect: () => { if (peutAcheter(upgrades.axpsec.cost)) { payer(upgrades.axpsec.cost); upgrades.axpsec.effect(); upgrades.axpsec.increaseCost(); update(); } } },
    { id: "axpmulti", effect: () => { if (peutAcheter(upgrades.axpmulti.cost)) { payer(upgrades.axpmulti.cost); upgrades.axpmulti.effect(); upgrades.axpmulti.increaseCost(); update(); } } },
    { id: "axpexpo", effect: () => { if (peutAcheter(upgrades.axpexpo.cost)) { payer(upgrades.axpexpo.cost); upgrades.axpexpo.effect(); upgrades.axpexpo.increaseCost(); update(); } } }
];

competenceButtons.forEach(b => {
    const btn = document.getElementById(b.id);
    if (!btn) return;
    btn.onclick = () => {
        if (["gainbois", "gainpierre", "clickgeneral"].includes(b.id)) {
            if (state.points >= 1) { state.points -= 1; b.effect(); update(); }
        } else { b.effect(); }
    };
});

const treeGrid = Array.from({ length: 3 }, () => Array(5).fill(null));

const connections = [
    { from: "gainbois", to: "pioche" },
    { from: "gainpierre", to: "pioche" },
    { from: "pioche", to: "gainfer" },
];

const competences = [
    {
        id: "gainbois",
        effect: () => state.multiboisbonus += 0.5,
        price: 1,
        bought: 0,
        unlocks: [],
        position: [0, 0],
        unlocked: true,
        visibility: true,
        caps: [{ maxLevel: 3, requires: [] }, { maxLevel: Infinity, requires: [{ id: "pioche", minLevel: 2 }] }]
    },
    {
        id: "gainpierre",
        effect: () => state.multipierrebonus += 0.5,
        price: 1,
        bought: 0,
        unlocks: [],
        position: [0, 1],
        unlocked: true,
        visibility: true,
        caps: [{ maxLevel: 3, requires: [] }, { maxLevel: Infinity, requires: [{ id: "pioche", minLevel: 2 }] }]
    },
    {
        id: "pioche",
        effect: () => state.multiclickbonus += 1,
        price: 5,
        bought: 0,
        unlocks: [],
        position: [0, 2],
        unlocked: false,
        requirement: [{ id: "gainbois", count: 1 }, { id: "gainpierre", count: 1, }],
        visibility: true,
    },
    {
        id: "gainfer",
        effect: () => state.multiferbonus += 0.5,
        price: 5,
        bought: 0,
        unlocks: [],
        position: [0, 3],
        unlocked: false,
        requirement: [{ id: "gainbois", count: 2 }, { id: "gainpierre", count: 2 }, { id: "pioche", count: 2 }],
        visibility: false,
    },
];

const treeDiv = document.getElementById("Tree");

function drawLinks() {
    const svg = document.getElementById("treeLinks");
    svg.innerHTML = "";

    connections.forEach(conn => {
        const fromBtn = document.getElementById(conn.from);
        const toBtn = document.getElementById(conn.to);

        if (fromBtn && toBtn) {
            const fromRect = fromBtn.getBoundingClientRect();
            const toRect = toBtn.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();

            const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - svgRect.top;
            const x2 = toRect.left + toRect.width / 2 - svgRect.left;
            const y2 = toRect.top + toRect.height / 2 - svgRect.top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", "#222222");
            line.setAttribute("stroke-width", "5");

            svg.appendChild(line);
        }
    });
}

function getCurrentCap(c) {
    if (!c.caps) return Infinity;
    let allowed = c.caps[0].maxLevel;

    for (const cap of c.caps) {
        const ok = (cap.requires || []).every(req => {
            const comp = competences.find(x => x.id === req.id);
            return comp && comp.bought >= req.minLevel;
        });
        if (ok) allowed = cap.maxLevel;
        else break;
    }
    return allowed;
}
function unlockCompetences() {
    competences.forEach(c => {
        if (!c.requirement || c.requirement.length === 0) {
            c.visibility = true;
            c.unlocked = true;
        } else {
            c.visibility = c.requirement.every(req => {
                const comp = competences.find(x => x.id === req.id);
                return comp && comp.visibility;
            });

            c.unlocked = c.visibility && c.requirement.every(req => {
                const comp = competences.find(x => x.id === req.id);
                return comp && comp.bought >= req.count;
            });
        }
    });
}



function renderTree() {
    unlockCompetences();

    const existing = new Map();
    treeDiv.querySelectorAll('.treeCell').forEach(cell => {
        const id = cell.dataset.id || (cell.querySelector('button') && cell.querySelector('button').id);
        if (id) existing.set(id, cell);
    });

    competences.forEach(c => {
        let cell = existing.get(c.id);
        if (!cell) {
            cell = document.createElement('div');
            cell.className = 'treeCell';
            cell.dataset.id = c.id;
            cell.style.gridRowStart = c.position[0] + 1;
            cell.style.gridColumnStart = c.position[1] + 1;

            const btn = document.createElement('button');
            btn.id = c.id;
            btn.style.minWidth = '90px';
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                state.points -= c.price;
                c.effect();
                c.bought++;
                if (c.bought % 2 === 0) c.price++;
                unlockCompetences();
                update();
            });

            cell.appendChild(btn);
            treeDiv.appendChild(cell);
        } else {
            cell.style.gridRowStart = c.position[0] + 1;
            cell.style.gridColumnStart = c.position[1] + 1;
            existing.delete(c.id);
        }

        const btn = cell.querySelector('button');

        cell.style.display = c.visibility ? '' : 'none';
        if (!c.visibility) return;

        if (!c.unlocked) {
            let missingReqs = "";
            if (c.requirement) {
                missingReqs = c.requirement
                    .map(req => {
                        const comp = competences.find(x => x.id === req.id);
                        const current = comp ? comp.bought : 0;
                        return `${req.id} (${current}/${req.count})`;
                    })
                    .join(", ");
            }
            btn.innerText = `Verrouillé, besoin de ${missingReqs}`;
            btn.disabled = true;
            btn.style.background = "#444";
        } else {
            const maxAllowed = getCurrentCap(c);
            const reachedCap = c.bought >= maxAllowed;

            btn.innerText = `${c.id} ${c.bought} (${c.price})` + (reachedCap ? " (Cap atteint)" : "");
            btn.disabled = (state.points < c.price) || reachedCap;
            btn.style.background = btn.disabled ? "#666" : "#222";
        }
    });
    existing.forEach(cell => {
        cell.style.display = 'none';
    });

    requestAnimationFrame(drawLinks);
}




function updateTooltipsClick() {
    elements.nbrbois.innerText = `+${(state.multiclickbois * state.multiclickbonus).toFixed(1)} Bois`;
    elements.nbrpierre.innerText = `+${(state.multiclickpierre * state.multiclickbonus).toFixed(1)} Pierre`;
    elements.nbrfer && (elements.nbrfer.innerText = `+${(0.25 * state.multiclickfer * state.multiclickbonus).toFixed(2)} Fer`);
}

function updateProjets() {
    projets.forEach(p => {
        const el = document.getElementById(p.id);
        if (!el) return;
        const unlocked = p.requires.length === 0 || p.requires.every(req => state.projetsAchetes[req]);
        const visible = !state.projetsAchetes[p.id] && unlocked;
        el.style.display = visible ? "block" : "none";
        const btn = el.querySelector("button");
        if (!btn) return;
        btn.style.color = p.unlocks ? "#ff8888" : "#ffffff";
        if (visible) {
            btn.onclick = () => {
                if (!state.projetsAchetes[p.id] && peutAcheter(p.cost)) {
                    payer(p.cost);
                    p.effect();
                    state.projetsAchetes[p.id] = true;
                    update();
                }
            };
        }
    });
}


function updateCrafts() {
    const groups = {};
    crafts.forEach(c => {
        const name = c.id.replace(/[0-9]/g, "").replace("craft", "");
        if (!groups[name]) groups[name] = [];
        groups[name].push(c);
    });
    Object.entries(groups).forEach(([name, list]) => {
        let cheapest = list[0];
        let minCost = Infinity;
        list.forEach(c => {
            const cost = Object.values(c.getCost())[0];
            if (cost < minCost) {
                minCost = cost;
                cheapest = c;
            }
        });

        const res = Object.keys(cheapest.getCost())[0];
        const prixP = document.getElementById("prixcraft" + name);
        if (prixP) {
            prixP.innerText = `${minCost} ${res} -> 1 ${name}`;
        }
    });
    crafts.forEach(c => {
        const div = document.getElementById(c.id);
        if (!div) return;
        const btn = div.querySelector("button");
        if (!btn) return;
        const cost = c.getCost();
        btn.onclick = () => {
            if (peutAcheter(cost)) {
                payer(cost);
                c.effect();
                update();
            }
        };
    });
}


function updateUpgrades() {
    Object.keys(upgrades).forEach(id => {
        const up = upgrades[id];
        const tooltip = document.querySelector(`#${id} + .tooltiptext`);
        if (tooltip) tooltip.innerText = Object.entries(up.cost).map(([r, v]) => `${Math.ceil(v)} ${r}`).join(" + ");
    });
}

function update() {
    updateTooltipsClick();
    const boisSec = (state.boisparsec * state.multibois * state.multiboisbonus).toFixed(2);
    const pierreSec = (state.pierreparseconde * state.multipierre * state.multipierrebonus).toFixed(2);
    const ferSec = (state.autoFer * state.multiferbonus).toFixed(1);
    const boisSecEl = document.getElementById("boisSec");
    const pierreSecEl = document.getElementById("pierreSec");
    const ferSecEl = document.getElementById("ferSec");
    if (boisSecEl) boisSecEl.innerText = `(${boisSec}/s)`;
    if (pierreSecEl) pierreSecEl.innerText = `(${pierreSec}/s)`;
    if (ferSecEl) ferSecEl.innerText = `(${ferSec}/s)`;
    state.boisCap = Math.max(100, boisSec * 500);
    state.pierreCap = Math.max(100, pierreSec * 500);
    state.ferCap = Math.max(10, ferSec * 100);
    state.bois = Math.min(state.bois, state.boisCap);
    state.pierre = Math.min(state.pierre, state.pierreCap);
    state.fer = Math.min(state.fer, state.ferCap);
    elements.bois.innerText = `${state.bois.toFixed(1)} / ${state.boisCap}`;
    elements.pierre.innerText = `${state.pierre.toFixed(1)} / ${state.pierreCap}`;
    elements.planche.innerText = state.planche.toFixed(1);
    elements.pierrelisse.innerText = state.pierrelisse.toFixed(1);
    elements.fer.innerText = `${state.fer.toFixed(2)} / ${state.ferCap}`;
    elements.lingotfer.innerText = (state.lingotfer);
    elements.charbon.innerText = `${Math.floor(state.charbon)} / ${state.charbonMax}`;
    elements.xpactuel.innerText = state.xp.toFixed(1);
    elements.xpdemandé.innerText = state.xpCap;
    elements.niveau.innerText = state.niveau;
    elements.xpsec.innerText = state.xpsec.toFixed(2);
    elements.xpmulti.innerText = state.xpmulti.toFixed(2);
    elements.xpexpo.innerText = state.xpexpo.toFixed(2);
    elements.points.innerText = state.points;
    state.xpTotSec = (state.xpsec * state.xpmulti) * state.xpexpo;
    elements.xpTotalSec.innerText = state.xpTotSec.toFixed(2);
    elements.ble.innerText = state.ble;
    elements.pain.innerText = state.pain;

    unlockCompetences();
    updateTooltipsClick();
    updateProjets();
    updateCrafts();
    updateUpgrades();
    renderTree();
}

setInterval(() => {
    state.bois += state.boisparsec * state.multibois * state.multiboisbonus;
    state.pierre += state.pierreparseconde * state.multipierre * state.multipierrebonus;
    state.fer += state.autoFer * state.multiferbonus;
    state.xp += (state.xpsec * state.xpmulti) * state.xpexpo;
    if (state.xp >= state.xpCap) { state.xp -= state.xpCap; state.niveau++; state.points++; state.xpCap = Math.floor(state.xpCap * 1.4); }
    update();
}, 1000);

let charbonInterval = setInterval(() => {
    state.charbon = Math.min(state.charbonMax, state.charbon + 1);
}, state.tpscharbon);

const marcheModal = document.getElementById("marcheModal");
const openMarche = document.getElementById("gomarché");
const closeMarche = document.getElementById("closeMarche");

openMarche.onclick = () => {
    marcheModal.style.display = "block";
};
closeMarche.onclick = () => {
    marcheModal.style.display = "none";
};

const enchantmodal = document.getElementById("enchantModal");
const goenchant = document.getElementById("goenchant");
const closeenchant = document.getElementById("closeenchant");

goenchant.onclick = () => {
    enchantmodal.style.display = "block";
};
closeenchant.onclick = () => {
    enchantmodal.style.display = "none";
};

window.addEventListener("click", (e) => {
    if (e.target === marcheModal) {
        marcheModal.style.display = "none";
    }
});

window.addEventListener("click", (e) => {
    if (e.target === enchantmodal) {
        enchantmodal.style.display = "none";
    }
});

function saveGame() {
    const saveData = {
        state: state,
        blocsVisible: {},
        upgrades: {},
        competences: competences.map(c => ({
            id: c.id,
            bought: c.bought,
            price: c.price,
            unlocked: c.unlocked
        }))
    };

    document.querySelectorAll(
        ".plantblé, .grosbloc, .classpierre, .classfer, .classcraft, .classenchant, .classble, #ble1, #ble2"
    ).forEach(bloc => {
        if (bloc.id) {
            saveData.blocsVisible[bloc.id] = bloc.style.display || "";
        } else if (bloc.className) {
            saveData.blocsVisible[bloc.className] = bloc.style.display || "";
        }
    });

    Object.keys(upgrades).forEach(key => {
        saveData.upgrades[key] = {
            rawCost: upgrades[key].rawCost,
            cost: { ...upgrades[key].cost }
        };
    });

    localStorage.setItem("mySave", JSON.stringify(saveData));
}

function loadGame() {
    const saved = localStorage.getItem("mySave");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    if (parsed.state) {
        Object.keys(state).forEach(key => {
            if (parsed.state[key] !== undefined) {
                state[key] = parsed.state[key];
            }
        });
    }
    if (parsed.blocsVisible) {
        Object.entries(parsed.blocsVisible).forEach(([idOrClass, display]) => {
            const blocById = document.getElementById(idOrClass);
            if (blocById) {
                blocById.style.display = display;
            } else {
                document.querySelectorAll(`.${idOrClass}`).forEach(bloc => {
                    bloc.style.display = display;
                });
            }
        });
    }

    // Restaure les upgrades
    if (parsed.upgrades) {
        Object.keys(parsed.upgrades).forEach(key => {
            if (upgrades[key]) {
                upgrades[key].rawCost = parsed.upgrades[key].rawCost;
                upgrades[key].cost = { ...parsed.upgrades[key].cost };
            }
        });
    }

    // Restaure l'arbre de compétences
    if (parsed.competences) {
        parsed.competences.forEach(savedC => {
            const c = competences.find(x => x.id === savedC.id);
            if (c) {
                c.bought = savedC.bought;
                c.price = savedC.price;
                c.unlocked = savedC.unlocked;
            }
        });
    }
    drawLinks()
    renderTree(); // Important pour réafficher l’arbre avec les bons états
    update();
}



function resetGame() {
    localStorage.removeItem("mySave");
    location.reload();
}

document.getElementById("resetgame").onclick = resetGame;

loadGame();
renderTree();

if (state.version !== officialversion) {
    alert(`Une mise à jour a eu lieu ! Bienvenue dans la version ${officialversion}. Certaines données ont peut-être été réinitialisées. Nous ne sommes en aucun cas responsables de la perte de vos données de jeu.`);
    state.version = officialversion;
    update();
}

setInterval(saveGame, 1000);

