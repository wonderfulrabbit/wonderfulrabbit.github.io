import { changeCharacter } from "./character.js";

export function initializeDropdown() {
    const characterOptions = document.querySelectorAll('.character-select option');

    characterOptions.forEach(option => {
        option.addEventListener('click', () => {
            characterOptions.forEach(opt => opt.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}