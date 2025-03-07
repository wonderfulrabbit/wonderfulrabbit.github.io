export function initializeNavigation() {
    const buttons = document.querySelectorAll(".nav-button");
    const sections = document.querySelectorAll(".content-section");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            sections.forEach(section => section.classList.remove("active"));
            document.getElementById(target).classList.add("active");

            buttons.forEach(btn => btn.setAttribute("aria-current", "false"));
            this.setAttribute("aria-current", "true");
        });
    });
}
