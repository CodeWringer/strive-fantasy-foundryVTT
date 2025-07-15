import { TEMPLATES } from "../../../../templatePreloader.mjs";
import MagicOverheatViewModelFactory from "../magic/magic-overheat-viewmodel-factory.mjs";

export default class ActorHealthViewModelExtender {
  extend(viewModel) {
    viewModel.magicOverheatTemplate = TEMPLATES.ACTOR_MAGIC_OVERHEAT;
    viewModel.vmMagicOverheat = new MagicOverheatViewModelFactory().create(viewModel, viewModel.document);
  }
}
