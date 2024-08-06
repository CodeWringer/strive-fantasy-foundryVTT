/* -------------------------------------------- */
/*  Initialization                              */
/* -------------------------------------------- */

import TransientBaseCharacterActorExtender from "./business/document/actor/transient-base-character-actor-extender.mjs";
import TransientSkillExtender from "./business/document/item/transient-skill-extender.mjs";
import { AttributeExtender } from "./business/ruleset/attribute/attribute-extender.mjs";
import { TagsExtender } from "./business/tags/tags-extender.mjs";
import ActorHealthViewModelExtender from "./presentation/sheet/actor/part/health/actor-health-viewmodel-extender.mjs";
import { overrideTemplates, preloadHandlebarsTemplates } from "./presentation/templatePreloader.mjs";

/**
 * Registers an extender with the strive game system. 
 * 
 * @param {Class} c The class definition of the type to extend. 
 * @param {Object} extender An extender instance that will be used 
 * to extend instances of `c`. 
 */
function addExtender(c, extender) {
  const extenderList = game.strive.extenders.get(c) ?? [];
  game.strive.extenders.set(c, extenderList.concat([extender]));
}

Hooks.once('init', function() {
  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

Hooks.once('ready', function() {
  // Const extenders. 
  overrideTemplates();

  new AttributeExtender().extend();
  new TagsExtender().extend();

  // Class extenders.
  addExtender(
    game.strive.classDef.document.TransientBaseCharacterActor, 
    new TransientBaseCharacterActorExtender()
  );
  addExtender(
    game.strive.classDef.document.TransientSkill, 
    new TransientSkillExtender()
  );
  addExtender(
    game.strive.classDef.viewModel.actor.ActorHealthViewModel, 
    new ActorHealthViewModelExtender()
  );
});
