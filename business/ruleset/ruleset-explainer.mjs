import Ruleset from "./ruleset.mjs";

/**
 * Provides strings that explain derived values, based on the ruleset. 
 */
export default class RulesetExplainer {
  /**
   * Returns a human readable explanation of how the maximum Arcane Overheat value came to be. 
   * 
   * @param {GameSystemActor} document 
   * 
   * @returns {String}
   */
  getExplanationForMaxOverheat(document) {
    const thresholds = new Ruleset().getArcaneOverheatThresholds(document);
    const ATTRIBUTES = game.strive.const.ATTRIBUTES;
    const arcanaLevel = new game.strive.classDef.Ruleset().getEffectiveAttributeModifiedLevel(ATTRIBUTES.arcana, document);

    return game.strive.util.string.format2(game.i18n.localize("strive-fantasy.character.magic.overheat.maxExplanation"), {
      coldMax: thresholds.smoldering - 1,
      smolderingMin: thresholds.smoldering,
      smolderingMax: thresholds.broiling - 1,
      broilingMin: thresholds.broiling,
      broilingMax: thresholds.consuming - 1,
      consuming: thresholds.consuming,
      arcana: arcanaLevel,
    });
  }
}
