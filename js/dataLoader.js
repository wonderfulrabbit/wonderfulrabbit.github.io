import { updateCharacterDropdown, changeCharacter } from "./character.js";
import 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js';

export let yaml = {};

export async function loadData() {
    const response = await fetch("../data/data.yaml");
    const yamlText = await response.text();
    yaml = jsyaml.load(yamlText);

    const characterList = Object.keys(yaml.data.character);
    updateCharacterDropdown(characterList);
    changeCharacter(characterList[0]);
}