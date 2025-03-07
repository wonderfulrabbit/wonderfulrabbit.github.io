import { middle, elementMaker, createCopyButton } from "./utils.js";
import { aliasMaker } from "./aliasHandler.js";

export function updateBasicInfo(character) {
    document.querySelector('#name').innerHTML = character.name;
    document.querySelector('#level').innerHTML = character.level;
    document.querySelector('#level-text').innerHTML = getLevelTitle(character.level);
    document.querySelector('#culture').innerHTML = character.attributes.culture;
    document.querySelector('#class').innerHTML = character.attributes.class;
    document.querySelector('#alignment').innerHTML = character.attributes.alignment;
}

function getLevelTitle(level) {
    if (level < 4) return "Adventurer";
    if (level < 8) return "Conqueror";
    return "King";
}

export function updateStats(stats) {
    Object.entries(stats).forEach(([statId, statData]) => updateStatField(statId, statData));
}

function updateStatField(statId, statData) {
    document.querySelector(`#${statId}`).innerHTML = statData.value;

    const element = document.querySelector(`#${statId}-text`);
    if (element) {
        element.innerHTML = statData.adj;
        element.setAttribute("data-tooltip", statData.desc);
    }
}

export function updateHp(stats, classData, level) {
    document.querySelector('#hp').innerHTML = (classData.hp + stats.con.value) * (2 + level);
}

export function updateTooltips(stats, classData, level) {
    document.querySelector(`mark#hpclass`).setAttribute("data-tooltip", classData.hp);

    ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
        document.querySelectorAll(`mark.${stat}`).forEach(mark => {
            mark.setAttribute("data-tooltip", stats[stat].value);
        });
    });

    document.querySelectorAll("mark.lvl").forEach(mark => {
        mark.setAttribute("data-tooltip", level);
    });

    const recMax = document.querySelector("mark#recmax");
    recMax.innerHTML = 8;
    recMax.setAttribute("data-tooltip", "base");

    const recDice = document.querySelector("mark#recdice");
    recDice.innerHTML = "d" + classData.dice;
    recDice.setAttribute("data-tooltip", "class");
}

export function updateDefenses(stats, classData, level) {
    const saves = {
        fort: ["str", "dex", "con"],
        ref: ["dex", "con", "wis"],
        will: ["int", "wis", "cha"]
    };

    Object.entries(saves).forEach(([id, statsArr]) => {
        const baseValue = classData[id] || 0;
        const statValues = statsArr.map(stat => stats[stat]?.value || 0);
        const total = baseValue + middle(...statValues);

        document.querySelector(`#${id}`).innerHTML = total;
        document.querySelector(`mark#${id}base`).setAttribute("data-tooltip", baseValue);
    });
}

export function updateEntries(containerId, entries, user, stats) {
    const container = document.querySelector(containerId);
    container.innerHTML = "";

    if (!entries) return;

    Object.values(entries).forEach(entry => {
        container.appendChild(createEntryElement(entry, user, stats));
    });
}

function createEntryElement(entry, user, stats) {
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.setAttribute("role", "button");
    summary.classList.add("secondary");
    summary.textContent = `${entry.name} 💲 ${entry.command}`;

    const article = elementMaker(entry);
    const footer = createCopyButton(() => {
        const out = aliasMaker(entry, user, stats);
        navigator.clipboard.writeText(out);
    });

    article.appendChild(footer);
    details.append(summary, article);
    return details;
}