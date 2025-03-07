import { initializeNavigation } from "./navigation.js";
import { initializeDropdown } from "./dropdown.js";
import { loadData } from "./dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeDropdown();
    loadData();
});

