import { initializeNavigation } from "./navigation.js";
import { loadData } from "./dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    loadData();
});

