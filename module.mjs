/* -------------------------------------------- */
/*  Initialization                              */
/* -------------------------------------------- */

import { AttributeExtender } from "./business/ruleset/attribute/attributes.mjs";

Hooks.once('init', function() {
});

Hooks.once('ready', function() {
  new AttributeExtender().extend();
});
