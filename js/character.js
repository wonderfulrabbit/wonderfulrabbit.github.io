import { updateBasicInfo, updateStats, updateCombatStats, updateTooltips, updateDefenses, updateEntries } from "./uiUpdater.js";
import { characters, classes } from "./dataLoader.js";

export function updateCharacterSelect(characters) {
    const dropdown = document.getElementById("character-select");
    dropdown.innerHTML = "";

    characters.forEach(name => {
        const option = document.createElement("option");
        option.setAttribute("value", name);
        option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", () => {
        const selectedName = dropdown.value;
        changeCharacter(selectedName);
    });
}

export function changeCharacter(name) {
    const character = characters[name];
    let characterClass;
    Object.values(classes).forEach(classData => {
        if (classData.name === character.attributes.class) {
            characterClass = classData;
        }
    });
    
    updateBasicInfo(character);
    updateStats(character.stats);
    updateCombatStats(character.stats, characterClass, character.level);
    updateEntries("#section-passives", character.passives, character.name, character.stats);
    updateEntries("#section-actives", character.actives, character.name, character.stats);
    updateTooltips(character.stats, characterClass, character.level);
    updateDefenses(character.stats, characterClass, character.level);
}