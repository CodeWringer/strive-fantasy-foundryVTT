import RulesetExplainer from "../../../../../business/ruleset/ruleset-explainer.mjs";

export default class MagicStaminaViewModelFactory {
  create(parent, document) {
    const viewModel = new game.strive.classDef.viewModel.ViewModel({
      id: "vmMagic",
      parent: parent,
    });
    parent.vmMagic = viewModel;

    viewModel.modifiedMaxMagicStamina = function () {
      return document.magic.modifiedMaxMagicStamina();
    };
    viewModel.maxMagicStamina = function () {
      return document.magic.maxMagicStamina().total;
    }

    viewModel.vmMaxMagicStamina = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      parent: viewModel,
      id: "vmMaxMagicStamina",
      value: document.magic.maxMagicStamina().total,
      isEditable: false,
      localizedToolTip: new RulesetExplainer().getExplanationForMaxMagicStamina(document),
    });
    viewModel.vmMaxMagicStaminaModifier = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      parent: viewModel,
      id: "vmMaxMagicStaminaModifier",
      value: document.magic.maxMagicStaminaModifier(),
      onChange: (_, newValue) => {
        document.magic.maxMagicStaminaModifier(newValue);
      },
    });
    viewModel.vmMagicStamina = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      parent: viewModel,
      id: "vmMagicStamina",
      value: document.magic.magicStamina(),
      onChange: (_, newValue) => {
        document.magic.magicStamina(newValue);
      },
      min: 0,
    });
    viewModel.vmModifiedMaxMagicStamina = new game.strive.classDef.viewModel.ReadOnlyValueViewModel({
      id: "vmModifiedMaxMagicStamina",
      parent: viewModel,
      value: viewModel.modifiedMaxMagicStamina,
    });

    return viewModel;
  }
}
