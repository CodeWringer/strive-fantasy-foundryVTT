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

    const arcanaLevel = ruleset.getEffectiveAttributeModifiedLevel(ATTRIBUTES.arcana, actor);
    const components = [];

    if (arcanaLevel > 0) {
      components.push(
        new game.strive.classDef.SumComponent("base", "strive-fantasy.general.base", 4),
      );
    }

    components.push(
      new game.strive.classDef.SumComponent(ATTRIBUTES.arcana.name, ATTRIBUTES.arcana.localizableName, arcanaLevel),
    );
    
    const Sum = new game.strive.classDef.Sum(components);
    
    const skills = actor.items.filter(it => it.type === ITEM_TYPES.SKILL);
    for (const skill of skills) {
      const transientSkill = skill.getTransientObject();
      if (transientSkill.isMagicSchool() !== true) continue;

      const skillLevel = skill.getTransientObject().level;
      components.push(new game.strive.classDef.SumComponent(transientSkill.name, transientSkill.localizableName, skillLevel));
    }

    return {
      total: parseInt(Math.ceil(Sum.total * 2)),
      components: components,
    };
  }
}
