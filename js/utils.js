export function middle(a, b, c) {
    return [a, b, c].sort((x, y) => x - y)[1];
}

export function elementMaker(e) {
    const article = document.createElement("article");
    article.innerHTML = [
        e.labels ? `<b>${e.labels.join(' 🔸 ')}</b>` : "",
        e.limited ? `<b>Limited:</b> ${e.limited}` : "",
        e.target ? `<b>Target:</b> ${e.target}` : "", 
        e.special ? `<b>Special:</b> ${e.special}` : "", 
        e.trigger ? `<b>Trigger:</b> ${e.trigger}` : "",
        e.attack ? `<b>Attack:</b> ${e.attack}` : "", 
        e.hit ? `<b>Hit:</b> ${e.hit}` : "", 
        e.effect ? `<b>Effect:</b> ${e.effect}` : ""
    ].filter(Boolean).join("<br>");

    return article;
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