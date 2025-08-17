import TransientBaseCharacterActorExtender from "./business/document/actor/transient-base-character-actor-extender.mjs";
import TransientSkillExtender from "./business/document/item/transient-skill-extender.mjs";
import { AttributeExtender } from "./business/ruleset/attribute/attribute-extender.mjs";
import { TagsExtender } from "./business/tags/tags-extender.mjs";
import ActorHealthViewModelExtender from "./presentation/sheet/actor/part/health/actor-health-viewmodel-extender.mjs";
import { overrideTemplates, preloadHandlebarsTemplates } from "./presentation/templatePreloader.mjs";

/* -------------------------------------------- */
/*  Initialization                              */
/* -------------------------------------------- */

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
  game.strive.util.extender.addExtender(
    game.strive.classDef.document.TransientBaseCharacterActor, 
    new TransientBaseCharacterActorExtender()
  );
  game.strive.util.extender.addExtender(
    game.strive.classDef.document.TransientSkill, 
    new TransientSkillExtender()
  );
  game.strive.util.extender.addExtender(
    game.strive.classDef.viewModel.actor.ActorHealthViewModel, 
    new ActorHealthViewModelExtender()
  );
});
