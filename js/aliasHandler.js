export function aliasMaker(ability, user, stats) {
    const { command, name, labels = [], target = "", limited = "", special = "", trigger = "",
        attack = "", hit = "", miss = "", effect = "", damage = "" } = ability;

    const title = `## ${user} uses ${name}\\n`;
    const label = labels.length ? `**${labels.join(' 🔸 ')}**\\n\\n` : "";

    const limitedText = limited ? `**Limited:** ${limited}\\n` : "";
    const targetText = target ? `**Target:** ${target}\\n` : "";
    const specialText = special ? `**Special:** ${special}\\n` : "";
    const triggerText = trigger ? `**Trigger:** ${trigger}\\n` : "";
    const attackText = attack ? `**Attack:** ${attack}\\n` : "";
    const hitText = hit ? `**Hit:** ${hit}\\n` : "";
    const missText = hit ? `**Miss:** ${miss}\\n` : "";
    const effectText = effect ? `**Effect:** ${effect}\\n` : "";

    const atk = processAttack(attack, stats);
    const dmg = processDamage(damage, stats);

    return [
        `$alias ${command} embed`,
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
        `atkroll = ${atk.roll}`,
        `AttackRoll = ${atk.text}`,
        `dmgroll = ${dmg.roll}`,
        `DamageRoll = ${dmg.text}`,
        `Output = Title + Label + Limited + Target + Special + Trigger + Attack + Effect + AttackRoll + DamageRoll`,
        `</drac2>`,
        `-desc "{{Output}}"`
    ].join("\n");
}

export function processAttack(attack = "", stats = "") {
    if (!attack) return { roll: "0", text: `""` };

    const bonus = attack.split(" vs ")[0];
    return {
        roll: `vroll("d20 + ${statReplace(bonus, stats)}")`,
        text: `"\\n**Attack Roll:** d20 + ${bonus} = " + str(atkroll) + "\\n"`,
    };
}

export function processDamage(damage = "", stats = "") {
    if (!damage) return { roll: "0", text: `""` };

    return {
        roll: `vroll("${statReplace(damage, stats)}")`,
        text: `"**Damage Roll:** ${damage} = " + str(dmgroll) + "\\n"`,
    };
}

export function statReplace(roll = "", stats = "") {
    const statKeys = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
    return roll.replace(/\b(STR|DEX|CON|INT|WIS|CHA)\b/gi, match => {
        return stats[match.toLowerCase()].value;
    });
}