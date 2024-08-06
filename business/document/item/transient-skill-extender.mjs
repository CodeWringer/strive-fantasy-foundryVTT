export default class TransientSkillExtender {
  /**
   * @param {TransientSkill} obj 
   */
  extend(obj) {
    obj.isMagicSchool = function(value) {
      if (game.strive.util.validation.isDefined(value)) { // set
        const tags = ((obj.document.system.tags ?? obj.document.system.properties) ?? []).concat([]); 
        const index = tags.indexOf(game.strive.const.SKILL_TAGS.MAGIC_SCHOOL.id);

        if (value === true && index < 0) {
          tags.push(game.strive.const.SKILL_TAGS.MAGIC_SCHOOL.id);
          obj.updateByPath("system.tags", tags);
        } else if (value !== true && index > -1) {
          tags.splice(index, 1);
          obj.updateByPath("system.tags", tags);
        }
      } else { // get
        return game.strive.util.array.arrayContains(((obj.document.system.tags ?? obj.document.system.properties) ?? []), game.strive.const.SKILL_TAGS.MAGIC_SCHOOL.id);
      }
    }
  }
}
