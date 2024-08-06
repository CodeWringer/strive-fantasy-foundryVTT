import Ruleset from "../../../../../business/ruleset/ruleset.mjs";

export default class MagicStaminaViewModelFactory {
  create(parent, document) {
    const viewModel = new game.strive.classDef.viewModel.ViewModel({
      id: "vmMagic",
      parent: parent,
    });
    viewModel.vmMagic = viewModel;

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

    // const o = viewModel.activateListeners;
    // viewModel.activateListeners = async (html) => {
    //   await o(html);
    //   this._activateListeners(viewModel, html);
    // };

    return viewModel;
  }

  async _activateListeners(viewModel, html) {
    const composition = new Ruleset().getCharacterMaximumMagicStamina(viewModel.parent.document.document).components
      .map(component => {
        return `${game.i18n.localize(component.localizableName)} ${component.value}`;
      }).join(" + ");
    
      viewModel.maxMagicStaminaInfoBubble = new game.strive.classDef.InfoBubble({
      html: html,
      map: [
        {
          element: html.find(`#${viewModel.id}-max-magic-stamina-info`),
          text: composition
        },
      ],
      autoShowType: game.strive.classDef.InfoBubbleAutoShowingTypes.MOUSE_ENTER,
      autoHideType: game.strive.classDef.InfoBubbleAutoHidingTypes.MOUSE_LEAVE,
    });
  }
}
