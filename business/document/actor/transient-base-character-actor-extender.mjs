import Ruleset from "../../ruleset/ruleset.mjs";

export default class TransientBaseCharacterActorExtender {
  /**
   * @param {TransientBaseCharacterActor} obj 
   */
  extend(obj) {
    obj.magic = {
      overheat: {
        cold() { return 0; },
        smoldering() {
          return new Ruleset().getMagicOverheatThresholds(obj.document).smoldering;
        },
        broiling() {
          return new Ruleset().getMagicOverheatThresholds(obj.document).broiling;
        },
        consuming() {
          return new Ruleset().getMagicOverheatThresholds(obj.document).consuming;
        },
        rawConsuming() {
          return new Ruleset().getMagicOverheatThresholds(obj.document).rawConsuming;
        },
        current(value) {
          if (game.strive.util.validation.isDefined(value)) { // set
            // Negative values aren't permitted. 
            obj.updateByPath("system.magic.overheat.current", Math.max(0, value));
          } else { // get
            return parseInt(((obj.document.system.magic ?? {}).overheat ?? {}).current ?? 0);
          }
        },
        modifier(value) {
          if (game.strive.util.validation.isDefined(value)) { // set
            obj.updateByPath("system.magic.overheat.modifier", value);
          } else { // get
            return parseInt(((obj.document.system.magic ?? {}).overheat ?? {}).modifier ?? 0);
          }
        },
      },
    };
  }
}
