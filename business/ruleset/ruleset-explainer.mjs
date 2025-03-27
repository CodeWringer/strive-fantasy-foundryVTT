import Ruleset from "./ruleset.mjs";

/**
 * Provides strings that explain derived values, based on the ruleset. 
 */
export default class RulesetExplainer {
  /**
   * @type {Ruleset}
   * @readonly
   * @private
   */
  _ruleset = new Ruleset();

  /**
   * @param {TransientBaseCharacterActor} actor 
   * 
   * @returns {String}
   */
  getExplanationForMaxMagicStamina(actor) {
    const maxMagicStamina = this._ruleset.getCharacterMaximumMagicStamina(actor);
    const composition = maxMagicStamina.components
      .map(component => {
        const name = game.i18n.localize(component.localizableName);
        const htmlEscapedComponent = game.strive.util.string.escapeHtml(name);
        return `${htmlEscapedComponent} (${component.value})`;
      }).join(" + ");

    return `(${composition}) * 2 = ${maxMagicStamina.total}`;
  }
}
