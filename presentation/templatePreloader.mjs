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

export const TEMPLATES = {
  ACTOR_HEALTH: `${basePathPresentation}/sheet/actor/part/health/actor-health.hbs`,
  ACTOR_MAGIC_STAMINA: `${basePathPresentation}/sheet/actor/part/magic/magic-stamina.hbs`,
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
  return await loadTemplates(templateArr);
};

export function overrideTemplates() {
  game.strive.const.TEMPLATES.ACTOR_HEALTH = TEMPLATES.ACTOR_HEALTH;
}
