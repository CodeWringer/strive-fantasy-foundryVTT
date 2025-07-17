/**
 * Represents a Magic Overheat Threshold. 
 * 
 * @property {String} name Internal name. 
 * @property {String} localizableName Localization key. 
 */
export class MagicOverHeatThreshold {
  /**
   * @param {Object} args 
   * @param {String} args.name Internal name. 
   * @param {String} args.localizableName Localization key. 
   */
  constructor(args = {}) {
    this.name = args.name;
    this.localizableName = args.localizableName;
  }
}

export const MagicOverHeatThresholds = {
  COLD: new MagicOverHeatThreshold({
    name: "cold",
    localizableName: "strive-fantasy.character.magic.overheat.cold",
  }),
  SMOLDERING: new MagicOverHeatThreshold({
    name: "smoldering",
    localizableName: "strive-fantasy.character.magic.overheat.smoldering",
  }),
  BROILING: new MagicOverHeatThreshold({
    name: "broiling",
    localizableName: "strive-fantasy.character.magic.overheat.broiling",
  }),
  CONSUMING: new MagicOverHeatThreshold({
    name: "consuming",
    localizableName: "strive-fantasy.character.magic.overheat.consuming",
  }),
};
