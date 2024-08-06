export class TagsExtender {
  extend() {
    game.strive.const.SKILL_TAGS.MAGIC_SCHOOL = new game.strive.classDef.Tag({
      id: "MAGIC_SCHOOL",
      localizableName: "strive-fantasy.character.skill.properties.magicSchool"
    });
  }
}
