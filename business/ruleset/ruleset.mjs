/**
 * Provides fantasy ruleset-specifics. 
 */
export default class Ruleset {
  /**
   * Returns the Magic Overheat thresholds of the given actor. 
   * 
   * @param {GameSystemActor} actor 
   * 
   * @returns {Object} Properties:
   * * `smoldering: Number`
   * * `broiling: Number`
   * * `consuming: Number`
   */
  getMagicOverheatThresholds(actor) {
    const ACTOR_TYPES = game.strive.const.ACTOR_TYPES; 
    const ATTRIBUTES = game.strive.const.ATTRIBUTES; 
    const ruleset = new game.strive.classDef.Ruleset(); 

    const type = actor.type.toLowerCase();
    if (type !== ACTOR_TYPES.PC && type !== ACTOR_TYPES.NPC) throw new Error("Only PC and NPC type actors allowed");

    const arcanaLevel = ruleset.getEffectiveAttributeModifiedLevel(ATTRIBUTES.arcana, actor);
    return {
      smoldering: arcanaLevel + 1,
      broiling: (arcanaLevel * 2) + 1,
      consuming: (arcanaLevel * 3) + 1,
    };
  }
}
