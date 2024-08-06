import Ruleset from "../../ruleset/ruleset.mjs";

export default class TransientBaseCharacterActorExtender {
  /**
   * @param {TransientBaseCharacterActor} obj 
   */
  extend(obj) {
    obj.magic = {
      maxMagicStamina() {
        return new Ruleset().getCharacterMaximumMagicStamina(obj.document)
      },
      maxMagicStaminaModifier(value) {
        if (game.strive.util.validation.isDefined(value)) { // set
          obj.updateByPath("system.magic.maxMagicStaminaModifier", value);
        } else { // get
          return parseInt((obj.document.system.magic ?? {}).maxMagicStaminaModifier ?? 0);
        }
      },
      modifiedMaxMagicStamina() {
        return obj.magic.maxMagicStamina().total + obj.magic.maxMagicStaminaModifier();
      },
      magicStamina(value) {
        if (game.strive.util.validation.isDefined(value)) { // set
          obj.updateByPath("system.magic.magicStamina", value);
        } else { // get
          return parseInt((obj.document.system.magic ?? {}).magicStamina ?? 0);
        }
      },
    };
  }
}
