const filterButtons = document.querySelectorAll('.filter-btn');
const container = document.getElementById('cards-container');

fetch("projects.json")
    .then(res => res.json())
    .then(projects => {
        projects.forEach(project => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = project.link;
            card.dataset.category = project.categories.join(" ");
            card.style.setProperty("--color", project.color);

            card.innerHTML = `
                <img src="${project.img}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
            `;

            container.appendChild(card);
        });
        initFilters();
        document.querySelector('.filter-btn[data-filter="all"]').click();
    });

function initFilters() {
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const categories = card.dataset.category.split(" ");
                const show = (filter === "all" || categories.includes(filter));

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
