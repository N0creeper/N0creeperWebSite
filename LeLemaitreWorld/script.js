const Btnclick = document.getElementById("click");
const zonejauge = document.getElementById("remplissage");
const AffichageCoins = document.getElementById("money");

let remplissage_jauge = 100;
coins = 0;
coins_gain = {
    "divider": 1000,
    "power": 2,
}
function coins_click_modif(n) {
    let result = 0;
    result = (n ** coins_gain["power"]) / coins_gain["divider"];
    return result
}

zonejauge.style.width = remplissage_jauge + "%";
setInterval(() => {
    remplissage_jauge -= Math.round(Math.exp(0.01 * remplissage_jauge) + 1);
    if (remplissage_jauge < 0) {
        remplissage_jauge = 0;
    }
    zonejauge.style.width = remplissage_jauge + "%";
    coins += Math.round(coins_click_modif(remplissage_jauge));
    AffichageCoins.innerText = "Coins : " + coins;
}, 500);

document.getElementById("formule_coin_gain").innerText =
    `Gain = \\( \\frac{x^{y}}{z} \\). y = ${coins_gain.power}, z = ${coins_gain.divider}`;
MathJax.typeset();



Btnclick.addEventListener("click", () => {
    remplissage_jauge = Math.round(remplissage_jauge + 5 - 0.0005 * (remplissage_jauge ** 2));
    if (remplissage_jauge > 100) remplissage_jauge = 100;

    zonejauge.style.width = remplissage_jauge + "%";
});
