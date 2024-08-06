/**
 * Provides fantasy ruleset-specifics. 
 */
export default class Ruleset {
  /**
   * Returns an object containing the maximum magic stamina, as well as the details of how it came to be. 
   * 
   * Not returning a `Sum` is intentional, because the total must deviate from the components' actual sum! 
   * 
   * @param {Actor} actor 
   * 
   * @returns {Object} The maximum magic stamina of the given actor. 
   * 
   * @throws {Error} Thrown, if the given actor is not of type `"pc"` or `"npc"`. 
   */
  getCharacterMaximumMagicStamina(actor) {
    const ACTOR_TYPES = game.strive.const.ACTOR_TYPES; 
    const ITEM_TYPES = game.strive.const.ITEM_TYPES; 
    const ATTRIBUTES = game.strive.const.ATTRIBUTES; 
    const ruleset = new game.strive.classDef.Ruleset(); 

    const type = actor.type.toLowerCase();
    if (type !== ACTOR_TYPES.PC && type !== ACTOR_TYPES.NPC) throw new Error("Only PC and NPC type actors allowed");

    const arcanaLevel = ruleset.getEffectiveAttributeModifiedLevel(ATTRIBUTES.arcana, actor) * 2;
    let total = arcanaLevel;
    
    const components = [
      new game.strive.classDef.SumComponent(ATTRIBUTES.arcana.name, ATTRIBUTES.arcana.localizableName, arcanaLevel),
    ];

    const skills = actor.items.filter(it => it.type === ITEM_TYPES.SKILL);
    for (const skill of skills) {
      const transientSkill = skill.getTransientObject();
      if (transientSkill.isMagicSchool() !== true) continue;

      const skillLevel = ruleset.getEffectiveSkillModifiedLevel(skill, actor);
      components.push(new game.strive.classDef.SumComponent(transientSkill.name, transientSkill.localizableName, skillLevel));
      total += skillLevel;
    }

    return {
      total: total,
      components: components,
    };
  }
}
