export function aliasMaker(ability, user, stats) {
    const { name, labels = [], target = "", limited = "", special = "", trigger = "",
        attack = "", hit = "", miss = "", effect = "", extra = "", damage = "" } = ability;

    const title = `## ${user} uses ${name}\\n`;
    const label = labels.length ? `**${labels.join(' 🔸 ')}**\\n\\n` : "";

    const limitedText = limited ? `**Limited:** ${limited.trim()}\\n` : "";
    const targetText = target ? `**Target:** ${target.trim()}\\n` : "";
    const specialText = special ? `**Special:** ${special.trim()}\\n` : "";
    const triggerText = trigger ? `**Trigger:** ${trigger.trim()}\\n` : "";
    const attackText = attack ? `**Attack:** ${attack.trim()}\\n` : "";
    const hitText = hit ? `**Hit:** ${hit.trim()}\\n` : "";
    const missText = miss ? `**Miss:** ${miss.trim()}\\n` : "";
    const effectText = effect ? `**Effect:** ${effect.trim()}\\n` : "";
    const extraText = extra ? `**Extra:** ${extra.trim()}\\n` : "";

    const atk = processAttack(attack, stats);
    const dmg = processDamage(damage, stats);

    return [
        `$tembed`,
        `<drac2>`,
        `Title = "${title}"`,
        `Label = "${label}"`,
        `Limited = "${limitedText}"`,
        `Target = "${targetText}"`,
        `Special = "${specialText}"`,
        `Trigger = "${triggerText}"`,
        `Attack = "${attackText}"`,
        `Hit = "${hitText}"`,
        `Miss = "${missText}"`,
        `Effect = "${effectText}"`,
        `Extra = "${extraText}"`,
        `atkroll = ${atk.roll}`,
        `AttackRoll = ${atk.text}`,
        `dmgroll = ${dmg.roll}`,
        `DamageRoll = ${dmg.text}`,
        `Output = Title + Label + Limited + Target + Special + Trigger + Attack + Hit + Miss + Effect + Extra + AttackRoll + DamageRoll`,
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

export function aliasWeapon(weapon, user, level, stats) {
    const { name, labels = [], target = "", stat = "", weapondice = "",
        miss = "", extra = ""} = weapon;

    const title = `## ${user} attacks with ${name}\\n`;
    const label = labels.length ? `**${labels.join(' 🔸 ')}**\\n\\n` : "";

    const targetText = target ? `**Target:** ${target.trim()}\\n` : "";
    const attackText = `**Attack:** d20 + ${stat}\\n`;
    const hitText = `**Hit:** ${level}${weapondice} + ${stat} damage. \\n`;
    const missText = miss ? `**Miss:** ${miss.trim()}\\n` : "";
    const extraText = extra ? `**Extra:** ${extra.trim()}\\n` : "";

    const atk = processWeaponAttack(`d20 + ${stat}`, stats);
    const dmg = processDamage(`${level}${weapondice} + ${stat}`, stats);

    return [
        `$tembed`,
        `<drac2>`,
        `Title = "${title}"`,
        `Label = "${label}"`,
        `Target = "${targetText}"`,
        `Attack = "${attackText}"`,
        `Hit = "${hitText}"`,
        `Miss = "${missText}"`,
        `Extra = "${extraText}"`,
        `atkroll = ${atk.roll}`,
        `AttackRoll = ${atk.text}`,
        `dmgroll = ${dmg.roll}`,
        `DamageRoll = ${dmg.text}`,
        `Output = Title + Label + Target + Attack + Hit + Miss + Extra + AttackRoll + DamageRoll`,
        `</drac2>`,
        `-desc "{{Output}}"`
    ].join("\n");
}

function processWeaponAttack(attack = "", stats = "") {
    return {
        roll: `vroll("${statReplace(attack, stats)}")`,
        text: `"\\n**Attack Roll:** ${attack} = " + str(atkroll) + "\\n"`,
    };
}