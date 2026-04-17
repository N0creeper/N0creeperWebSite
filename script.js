const projects = [
    {
        "title": "Quizz Spécialités",
        "desc": "Le meilleur moyen de choisir vos spécialités.",
        "img": "Images/Spe.png",
        "link": "Spe/index.html",
        "color": "#c6f1c6",
        "tags": ["Site", "Nouveau"]
    },
    {
        "title": "Le Jeu du Bouton",
        "desc": "Un jeu très simple et pas du tout rageant.",
        "img": "Images/Button.png",
        "link": "Buttun/index.html",
        "color": "#bbffff",
        "tags": ["Site", "Jeu"]
    },
    {
        "title": "Stalinatrice",
        "desc": "Une calculatrice soviétique.",
        "img": "Images/Stalinatrice.png",
        "link": "Stalinatrice/index.html",
        "color": "#cc0000",
        "tags": ["Site"]
    },
    {
        "title": "Trouvez le Drapeau",
        "desc": "Un jeu sans aucun piège.",
        "img": "Images/Flag.webp",
        "link": "Flag/index.html",
        "color": "#44ff44",
        "tags": ["Site", "Jeu"]
    },
    {
        "title": "Jeu",
        "desc": "Un jour possiblement",
        "img": "Images/Jeu.png",
        "link": "Jeu/index.html",
        "color": "#3838a0",
        "tags": ["Abandonné", "Jeu", "Site"]
    },
    {
        "title": "Mon compte Scratch",
        "desc": "Mes projets Scratch.",
        "img": "Images/Scratch.png",
        "link": "https://scratch.mit.edu/users/N0creeper/",
        "color": "#f7a637",
        "tags": []
    },
    {
        "title": "Mon compte Numworks",
        "desc": "Mes programmes Python.",
        "img": "Images/Numworks.png",
        "link": "https://my.numworks.com/python/n0creeper",
        "color": "#ffb734",
        "tags": []
    },
    {
        "title": "Mon GitHub",
        "desc": "Mes autres projets (dont les projets python pas sur Numworks)",
        "img": "Images/GitHub.png",
        "link": "https://github.com/N0creeper",
        "color": "#8888ff",
        "tags": []
    }
];
const changelog = [
    {
        version: "v1.0.3",
        date: "14/02/2026",
        text: "Ajout de l'icone du site" 
    },
    {
        version: "v1.0.2",
        date: "14/02/2026",
        text: "Ajout de Changelog" 
    },
    {
        version: "v1.0.1",
        date: "14/02/2026",
        text: "Améliorations Graphiques des differentss sites"
    },
    {
        version: "v1.0.0",
        date: "07/04/2026",
        text: "Refonte totale du hub + regroupement de tous mes projets"
    }
];
const filtersContainer = document.getElementById("filters");
const cardsContainer = document.getElementById("cards-container");

let allTags = new Set();

projects.forEach(project => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = project.link;
    card.style.setProperty("--color", project.color);
    card.dataset.tags = project.tags.join(" ");
    project.tags.forEach(t => allTags.add(t));

    card.innerHTML = `
        <img src="${project.img}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>

        <div class="tag-list">
            ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
    `;

    cardsContainer.appendChild(card);
});

filtersContainer.innerHTML = `
    <button class="filter-btn active" data-filter="all">Tout</button>
`;

allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = tag;
    btn.textContent = tag;
    filtersContainer.appendChild(btn);
});

function initFilters() {
    const filterButtons = document.querySelectorAll("#filters .filter-btn");
    const cards = document.querySelectorAll(".card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const tags = card.dataset.tags ? card.dataset.tags.split(" ") : [];
                const show = (filter === "all" || tags.includes(filter));

                if (show) {
                    card.style.display = "block";
                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => card.style.display = "none", 200);
                }
            });
        });
    });
}

initFilters();
document.querySelector('#filters .filter-btn[data-filter="all"]').click();

const modal = document.getElementById("changelog-modal");
const changelogBtn = document.getElementById("changelog-btn");
const closeChangelog = document.getElementById("close-changelog");
const changelogList = document.getElementById("changelog-list");

changelogList.innerHTML = changelog
    .map(entry => `
        <div class="log-entry">
            <div class="log-header">
                <span class="log-version">${entry.version}</span>
                <span class="log-date">${entry.date}</span>
            </div>
            <p class="log-text">${entry.text}</p>
        </div>
    `)
    .join("");

changelogBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeChangelog.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
