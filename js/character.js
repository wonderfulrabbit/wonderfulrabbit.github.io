import { updateBasicInfo, updateStats, updateHp, updateTooltips, updateDefenses, updateEntries } from "./uiUpdater.js";
import { yaml } from "./dataLoader.js";

export function updateCharacterDropdown(characters) {
    const dropdown = document.getElementById("characterdropdown");
    dropdown.innerHTML = "";

    characters.forEach(name => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.setAttribute("data-target", name);
        a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        li.appendChild(a);
        dropdown.appendChild(li);
    });
}

export function changeCharacter(name) {
    const character = yaml.data.character[name];
    const classData = yaml.data.class[character.attributes.class];
    const title = document.querySelector('#nametitle');

    title.innerHTML = `${name.toUpperCase()} (${character.player})`;
    updateBasicInfo(character);
    updateStats(character.stats);
    updateHp(character.stats, classData, character.level);
    updateEntries("#abilities", character.abilities, character.name, character.stats);
    updateEntries("#attacks", character.attacks, character.name, character.stats);
    updateTooltips(character.stats, classData, character.level);
    updateDefenses(character.stats, classData, character.level);
}
