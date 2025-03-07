import { changeCharacter } from "./character.js";

export function initializeDropdown() {
    const dropdown = document.getElementById("characterdropdown");

    dropdown.addEventListener("click", function (event) {
        const clickedElement = event.target;
        if (clickedElement.tagName === "A") {
            const characterName = clickedElement.getAttribute("data-target");
            changeCharacter(characterName);
            dropdown.closest("details").removeAttribute("open");
        }
    });
}