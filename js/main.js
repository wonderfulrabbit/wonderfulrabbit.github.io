const dropdown = document.getElementById("characterdropdown");
const buttons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".content-section");

var yaml = {};

buttons.forEach( button => {
	button.addEventListener("click", function () {
		const target = this.getAttribute("data-target");
		sections.forEach( section => section.classList.remove("active"));
		document.getElementById(target).classList.add("active");
		
		buttons.forEach(btn => btn.setAttribute("aria-current", "false"));
		this.setAttribute("aria-current", "true");
	});
});

dropdown.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === "A") {
        const charactername = clickedElement.getAttribute("data-target");
		changeCharacter(charactername);
		dropdown.closest("details").removeAttribute("open");
    }
});

async function loadData() {
	const response = await fetch("../data/data.yaml"); 
	const yamlText = await response.text();
	yaml = jsyaml.load(yamlText);
	
	const characterlist = Object.keys(yaml.data.character);
	updateCharacterDropdown(characterlist);
	
	changeCharacter(characterlist[0]);
}

function updateCharacterDropdown(characters) {
	dropdown.innerHTML = "";
	characters.forEach(name => {
        const li = document.createElement("li");
        const a = document.createElement("a");
		a.href = "#";
        a.setAttribute("data-target", name);
        a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        li.appendChild(a);
        dropdown.appendChild(li);
    });
}

function changeCharacter(name){
	const character = yaml.data.character[name];
	const classData = yaml.data.class[character.attributes.class];
	const title = document.querySelector('#nametitle');
	
	title.innerHTML = name.toUpperCase();
	updateBasicInfo(character);
	updateStats(character.stats);
	updateDefences(character.stats, classData, character.level);
	updateEntries("#abilities", character.abilities, character.name, character.stats);
	updateEntries("#attacks", character.attacks, character.name, character.stats);
	updateTooltips(character.stats, classData, character.level);
}

function updateBasicInfo(character) {
    document.querySelector('#name').innerHTML = character.name;
    document.querySelector('#level').innerHTML = character.level;
    document.querySelector('#level-text').innerHTML = getLevelTitle(character.level);
    document.querySelector('#culture').innerHTML = character.attributes.culture;
    document.querySelector('#class').innerHTML = character.attributes.class;
    document.querySelector('#alignment').innerHTML = character.attributes.alignment;
}

function getLevelTitle(level) {
    if (level < 4) return "Adventurer";
    if (level < 8) return "Conqueror";
    return "King";
}

function updateStats(stats) {
    Object.entries(stats).forEach(([statId, statData]) => updateStatField(statId, statData));
}

function updateStatField(statId, statData) {
    document.querySelector(`#${statId}`).innerHTML = statData.value;
    
    const element = document.querySelector(`#${statId}-text`);
    if (element) {
        element.innerHTML = statData.adj;
        element.setAttribute("data-tooltip", statData.desc);
    }
}

function updateDefences(stats, classData, level) {
	document.querySelector('#hp').innerHTML = (classData.hp + stats.con.value) * (2 + level);
}

function updateTooltips(stats, classData, level) {
	document.querySelector(`mark#hpclass`).setAttribute("data-tooltip", classData.hp);
	
	["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
        document.querySelectorAll(`mark.${stat}`).forEach(mark => {
            mark.setAttribute("data-tooltip", stats[stat].value);
        });
    });
	
	document.querySelectorAll("mark.lvl").forEach(mark => {
        mark.setAttribute("data-tooltip", level);
    });

	const recMax = document.querySelector("mark#recmax");
    recMax.innerHTML = 8;
    recMax.setAttribute("data-tooltip", "base");

	const recDice = document.querySelector("mark#recdice");
    recDice.innerHTML = "d" + classData.dice;
    recDice.setAttribute("data-tooltip", "class");
	
	const saves = {
        fort: ["str", "dex", "con"],
        ref: ["dex", "con", "wis"],
        will: ["int", "wis", "cha"]
    };

    Object.entries(saves).forEach(([id, statsArr]) => {
        const baseValue = classData[id] || 0;
        const statValues = statsArr.map(stat => stats[stat]?.value || 0);
        const total = baseValue + middle(...statValues);

        document.querySelector(`#${id}`).innerHTML = total;
        document.querySelector(`mark#${id}base`).setAttribute("data-tooltip", baseValue);
    });
}

function middle(a, b, c) {
    return [a, b, c].sort((x, y) => x - y)[1];
}

function updateEntries(containerId, entries, user, stats) {
    const container = document.querySelector(containerId);
    container.innerHTML = "";

	if (!entries) return;

    Object.values(entries).forEach(entry => {
        container.appendChild(createEntryElement(entry, user, stats));
    });
}

function createEntryElement(entry, user, stats) {
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.setAttribute("role", "button");
    summary.classList.add("secondary");
    summary.textContent = `${entry.name} 💲 ${entry.command}`;

    const article = elementMaker(entry);
    const footer = createCopyButton(() => {
        const out = aliasMaker(entry, user, stats);
        navigator.clipboard.writeText(out);
    });

    article.appendChild(footer);
    details.append(summary, article);
    return details;
}

function createCopyButton(onClick) {
    const footer = document.createElement("footer");
    footer.setAttribute("role", "button");
    footer.classList.add("contrast");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-copy");

    footer.appendChild(icon);
    footer.addEventListener("click", onClick);
    return footer;
}

function aliasMaker(ability, user, stats) {
    const { command, name, labels = [], target = "", limited = "", special = "", 
		attack = "", hit = "", effect = "", damage = "" } = ability;

    const title = `## ${user} uses ${name}\\n`;
    const label = labels.length ? `**${labels.join(' 🔸 ')}**\\n\\n` : "";
    
	const limitedText = limited ? `**Limited:** ${limited}\\n` : "";
	const targetText = target ? `**Target:** ${target}\\n` : "";
	const specialText = special ? `**Special:** ${special}\\n` : "";
	const attackText = attack ? `**Attack:** ${attack}\\n` : "";
	const hitText = hit ? `**Hit:** ${hit}\\n` : "";
    const effectText = effect ? `**Effect:** ${effect}\\n` : "";
	
	const atk = processAttack(attack, stats);
	const dmg = processDamage(damage, stats);

	return  [
		`$alias ${command} embed`,
		`<drac2>`,
		`Title = "${title}"`,
		`Label = "${label}"`,
		`Limited = "${limitedText}"`,
		`Target = "${targetText}"`,
		`Special = "${specialText}"`,
		`Attack = "${attackText}"`,
		`Hit = "${hitText}"`,
		`Effect = "${effectText}"`,
		`atkroll = ${atk.roll}`,
		`AttackRoll = ${atk.text}`,
		`dmgroll = ${dmg.roll}`,
		`DamageRoll = ${dmg.text}`,
		`Output = Title + Label + Limited + Target + Special + Attack + Effect + AttackRoll + DamageRoll`,
		`</drac2>`,
		`-desc "{{Output}}"`
	].join("\n");
}

function processAttack(attack = "", stats = "") {
    if (!attack) return { roll: "0", text: `""` };

    const bonus = attack.split(" vs ")[0];
    return {
        roll: `vroll("d20 + ${statReplace(bonus, stats)}")`,
        text: `"\\n**Attack Roll:** d20 + ${bonus} = " + str(atkroll) + "\\n"`,
    };
}

function processDamage(damage = "", stats = "") {
    if (!damage) return { roll: "0", text: `""` };

    return {
        roll: `vroll("${statReplace(damage, stats)}")`,
        text: `"**Damage Roll:** ${damage} = " + str(dmgroll) + "\\n"`,
    };
}

function statReplace(roll = "", stats = "") {
	const statKeys = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
    return roll.replace(/\b(STR|DEX|CON|INT|WIS|CHA)\b/gi, match => {
        return stats[match.toLowerCase()].value;
    });
}	

function elementMaker(e) {
    const article = document.createElement("article");
    article.innerHTML = [
        e.labels ? `<b>${e.labels.join(' 🔸 ')}</b>` : "",
		e.limited ? `<b>Limited:</b> ${e.limited}` : "",
        e.target ? `<b>Target:</b> ${e.target}` : "", 
        e.special ? `<b>Special:</b> ${e.special}` : "", 
        e.attack ? `<b>Attack:</b> ${e.attack}` : "", 
        e.hit ? `<b>Hit:</b> ${e.hit}` : "", 
        e.effect ? `<b>Effect:</b> ${e.effect}` : ""
    ].filter(Boolean).join("<br>");

    return article;
}

document.addEventListener("DOMContentLoaded", loadData);