/**
 * String partial `"modules/strive-fantasy-module"`. 
 * 
 * @type {String}
 * @constant
 */
const basePath = "modules/strive-fantasy-module";

/**
 * String partial `"modules/strive-fantasy-module/presentation"`. 
 * 
 * @type {String}
 * @constant
 */
const basePathPresentation = `${basePath}/presentation`;

/**
 * Contains the relative paths to **all** templates contained in this module. 
 * 
 * @constant
 */
export const TEMPLATES = {
  ACTOR_HEALTH: `${basePathPresentation}/sheet/actor/part/health/actor-health.hbs`,
  ACTOR_MAGIC_OVERHEAT: `${basePathPresentation}/sheet/actor/part/magic/arcane-overheat.hbs`,
}

/**
 * Returns the pre-loaded Handlebars templates, for fast access when rendering. 
 * 
 * @return {Any}
 * 
 * @async
 */
export async function preloadHandlebarsTemplates() {
  const templateArr = [];
  for (const propertyName in TEMPLATES) {
    templateArr.push(TEMPLATES[propertyName]);
  }
  return await new game.strive.classDef.FoundryWrapper().loadTemplates(templateArr);
};

/**
 * Overrides templates of the system. 
 */
export function overrideTemplates() {
  game.strive.const.TEMPLATES.ACTOR_HEALTH = TEMPLATES.ACTOR_HEALTH;
}
