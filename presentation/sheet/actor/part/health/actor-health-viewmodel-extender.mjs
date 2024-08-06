import { TEMPLATES } from "../../../../templatePreloader.mjs";
import MagicStaminaViewModelFactory from "../magic/magic-stamina-viewmodel-factory.mjs";

export default class ActorHealthViewModelExtender {
  extend(viewModel) {
    viewModel.magicStaminaTemplate = TEMPLATES.ACTOR_MAGIC_STAMINA;
    viewModel.vmMagicStamina = new MagicStaminaViewModelFactory().create(viewModel, viewModel.document);
  }
}
