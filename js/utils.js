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
        e.effect ? `<b>Effect:</b> ${e.effect}` : "",
        e.extra ? `<b>Extra:</b> ${e.extra}` : ""
    ].filter(Boolean).join("<br>");
}

export function weaponMaker(e) {
    return [
        `<b>Target:</b> ${e.target}`, 
        `<b>Attack:</b> ${e.stat} vs ${e.defense}`, 
        `<b>Hit:</b> LEVEL x ${e.weapondice} + ${e.stat} damage`, 
        e.miss ? `<b>Miss:</b> ${e.miss}` : "",
        e.extra ? `<b>Extra:</b> ${e.extra}` : ""
    ].filter(Boolean).join("<br>");
}