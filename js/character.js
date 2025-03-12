import { updateBasicInfo, updateStats, updateCombatStats, updateTooltips, updateDefenses, updateEntries } from "./uiUpdater.js";
import { characters, classes, abilities } from "./dataLoader.js";

export function updateCharacterSelect(charactersList) {
    const dropdown = document.getElementById("character-select");
    dropdown.innerHTML = "";

    charactersList.forEach(name => {
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
    let characterClass, characterAbility;

    Object.entries(classes).forEach(([_, value]) => {
        if (value.name === character.attributes.class) {
            characterClass = value;
        }
    });

    Object.entries(abilities).forEach(([abilityGroup, value]) => {
        if (abilityGroup === name) {
            characterAbility = value;
        }
    });

    updateBasicInfo(character);
    updateStats(character.stats);
    updateCombatStats(character.stats, characterClass, character.level);
    updateEntries("#section-passives", characterAbility.passives, character.name, character.stats);
    updateEntries("#section-actives", characterAbility.actives, character.name, character.stats);
    updateTooltips(character.stats, characterClass, character.level);
    updateDefenses(character.stats, characterClass, character.level);
}