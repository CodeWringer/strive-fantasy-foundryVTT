/**
 * Represents an Arcane Overheat Threshold. 
 * 
 * @property {String} name Internal name. 
 * @property {String} localizableName Localization key. 
 */
export class ArcaneOverHeatThreshold {
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

export const ArcaneOverHeatThresholds = {
  COLD: new ArcaneOverHeatThreshold({
    name: "cold",
    localizableName: "strive-fantasy.character.magic.overheat.cold",
  }),
  SMOLDERING: new ArcaneOverHeatThreshold({
    name: "smoldering",
    localizableName: "strive-fantasy.character.magic.overheat.smoldering",
  }),
  BROILING: new ArcaneOverHeatThreshold({
    name: "broiling",
    localizableName: "strive-fantasy.character.magic.overheat.broiling",
  }),
  CONSUMING: new ArcaneOverHeatThreshold({
    name: "consuming",
    localizableName: "strive-fantasy.character.magic.overheat.consuming",
  }),
};
