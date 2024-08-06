/**
 * Adds the arcana attribute. 
 */
export class AttributeExtender {
  /**
   * Adds the arcana attribute. 
   */
  extend() {
    game.strive.const.ATTRIBUTES.arcana = new game.strive.classDef.Attribute({
      name: "arcana",
      localizableName: "strive-fantasy.character.attribute.arcana.label",
      localizableAbbreviation: "strive-fantasy.character.attribute.arcana.abbreviation"
    });
  }
}
