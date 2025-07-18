import { TEMPLATES } from "../../../../templatePreloader.mjs";
import ArcaneOverheatViewModelFactory from "../magic/arcane-overheat-viewmodel-factory.mjs";

export default class ActorHealthViewModelExtender {
  extend(viewModel) {
    viewModel.arcaneOverheatTemplate = TEMPLATES.ACTOR_MAGIC_OVERHEAT;
    viewModel.vmArcaneOverheat = new ArcaneOverheatViewModelFactory().create(viewModel, viewModel.document);
  }
}
