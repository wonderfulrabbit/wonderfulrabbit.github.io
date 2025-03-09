export function middle(a, b, c) {
    return [a, b, c].sort((x, y) => x - y)[1];
}

export function contentMaker(e) {
    return [
        e.limited ? `<b>Limited:</b> ${e.limited}` : "",
        e.target ? `<b>Target:</b> ${e.target}` : "", 
        e.special ? `<b>Special:</b> ${e.special}` : "", 
        e.trigger ? `<b>Trigger:</b> ${e.trigger}` : "",
        e.attack ? `<b>Attack:</b> ${e.attack}` : "", 
        e.hit ? `<b>Hit:</b> ${e.hit}` : "", 
        e.miss ? `<b>Miss:</b> ${e.miss}` : "", 
        e.effect ? `<b>Effect:</b> ${e.effect}` : ""
    ].filter(Boolean).join("<br>");
}

export function createCopyButton(onClick) {
    const footer = document.createElement("footer");
    footer.setAttribute("role", "button");
    footer.classList.add("contrast");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-copy");

    footer.appendChild(icon);
    footer.addEventListener("click", onClick);
    return footer;
}