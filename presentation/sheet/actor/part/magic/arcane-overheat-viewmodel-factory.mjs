import { ArcaneOverHeatThresholds } from "../../../../../business/document/const/arcane-overheat-thresholds.mjs";
import RulesetExplainer from "../../../../../business/ruleset/ruleset-explainer.mjs";

export default class ArcaneOverheatViewModelFactory {
  create(parent, document) {
    const viewModel = new game.strive.classDef.viewModel.ViewModel({
      id: "vmMagic",
      parent: parent,
    });
    parent.vmMagic = viewModel;

    viewModel.overheatCurrent = document.magic.overheat.current();
    viewModel.overheatCold = document.magic.overheat.cold();
    viewModel.overheatSmoldering = document.magic.overheat.smoldering();
    viewModel.overheatBroiling = document.magic.overheat.broiling();
    viewModel.overheatConsuming = document.magic.overheat.consuming();
    viewModel.rawOverheatConsuming = document.magic.overheat.rawConsuming();
    
    // Used in rendering of the slider. 
    viewModel.overheatSmolderingPercentage = (viewModel.overheatSmoldering / viewModel.overheatConsuming) * 100.0;
    viewModel.overheatBroilingPercentage = (viewModel.overheatBroiling / viewModel.overheatConsuming) * 100.0;
    viewModel.hasSlag = document.magic.slag.current() > 0;
    viewModel.slagPercentage = Math.min(100.0, (document.magic.slag.current() / viewModel.overheatConsuming) * 100.0);
    viewModel.showRangeSlider = document.magic.slag.current() < document.magic.overheat.consuming();
    viewModel.sliderPercentage = ((document.magic.overheat.consuming() - document.magic.slag.current()) / viewModel.overheatConsuming) * 100.0;

    const getThresholdFor = (value) => {
      if (value < viewModel.overheatSmoldering)
        return ArcaneOverHeatThresholds.COLD;
      else if (value < viewModel.overheatBroiling)
        return ArcaneOverHeatThresholds.SMOLDERING;
      else if (value < viewModel.overheatConsuming)
        return ArcaneOverHeatThresholds.BROILING;
      else
        return ArcaneOverHeatThresholds.CONSUMING;
    };

    const currentHeat = getThresholdFor(document.magic.overheat.currentWithSlag());
    viewModel.isActiveCold = currentHeat.name === ArcaneOverHeatThresholds.COLD.name;
    viewModel.isActiveSmoldering = currentHeat.name === ArcaneOverHeatThresholds.SMOLDERING.name;
    viewModel.isActiveBroiling = currentHeat.name === ArcaneOverHeatThresholds.BROILING.name;
    viewModel.isActiveConsuming = currentHeat.name === ArcaneOverHeatThresholds.CONSUMING.name;

    viewModel.vmSlagReminder = new game.strive.classDef.viewModel.ViewModel({
      id: "vmSlagReminder",
      parent: viewModel,
      localizedToolTip: viewModel.showReminders ? 
        `${game.i18n.localize("strive-fantasy.character.magic.slag.label")}<br>${game.i18n.localize("strive-fantasy.character.magic.slag.reminder")}` : 
        game.i18n.localize("strive-fantasy.character.magic.slag.label"),
    });
    viewModel.vmSlag = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      id: "vmSlag",
      parent: viewModel,
      value: document.magic.slag.current(),
      min: 0,
      isEditable: viewModel.isEditable,
      localizedToolTip: game.i18n.localize("strive-fantasy.character.magic.slag.label"),
      onChange: (_, newValue) => {
        document.magic.slag.current(newValue);
      },
    });

    viewModel.vmOverheatReminder = new game.strive.classDef.viewModel.ViewModel({
      id: "vmOverheatReminder",
      parent: viewModel,
      localizedToolTip: viewModel.showReminders ? 
        `${game.i18n.localize("strive-fantasy.character.magic.overheat.label")}<br>${game.i18n.localize("strive-fantasy.character.magic.overheat.reminder")}` : 
        game.i18n.localize("strive-fantasy.character.magic.overheat.label"),
    });
    viewModel.vmOverheat = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      id: "vmOverheat",
      parent: viewModel,
      value: document.magic.overheat.currentWithSlag(),
      min: document.magic.slag.current(),
      isEditable: viewModel.isEditable,
      localizedToolTip: game.strive.util.string.format2(
        game.i18n.localize("strive-fantasy.character.magic.overheat.withPlaceholders"),
        {
          slag: document.magic.slag.current(),
          current: document.magic.overheat.current(),
        }
      ),
      onChange: (_, newValue) => {
        document.magic.overheat.current(newValue - document.magic.slag.current());
      },
    });
    viewModel.vmAdjustOverheat = new game.strive.classDef.viewModel.ButtonViewModel({
      id: "vmAdjustOverheat",
      parent: viewModel,
      localizedToolTip: game.i18n.localize("strive-fantasy.character.magic.overheat.adjust"),
      content: '<i class="fas fa-edit"></i>',
      onClick: async () => {
        const inputNumber = "inputNumber";
        const dialog = await new game.strive.classDef.dialog.DynamicInputDialog({
          easyDismissal: true,
          focused: inputNumber,
          inputDefinitions: [
            new game.strive.classDef.dialog.DynamicInputDefinition({
              name: inputNumber,
              localizedLabel: game.i18n.localize("strive-fantasy.character.magic.overheat.adjustInputLabel"),
              template: game.strive.classDef.viewModel.InputNumberSpinnerViewModel.TEMPLATE,
              viewModelFactory: (id, parent) => new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
                id: id,
                parent: parent,
              }),
              required: true,
              validationFunc: (value) => { return parseInt(value) !== NaN; },
            }),
          ],
        }).renderAndAwait(true);

        if (dialog.confirmed !== true) return;

        const number = parseInt(dialog[inputNumber]);
        const newValue = document.magic.overheat.current() + number;
        const clampedValue = Math.max(0, newValue);
        document.magic.overheat.current(clampedValue);
      },
    });
    const maxOverheatToolTip = game.strive.util.string.format2(game.i18n.localize("strive-fantasy.character.magic.overheat.maxWithModifier"), {
      maximum: document.magic.overheat.consuming(),
      operand: document.magic.overheat.modifier() >= 0 ? "+" : "-",
      modifier: Math.abs(document.magic.overheat.modifier()),
      finalValue: document.magic.overheat.consuming(),
    });
    const maxOverheatExplanation = new RulesetExplainer().getExplanationForMaxOverheat(document);
    viewModel.vmMaxOverheat = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      id: "vmMaxOverheat",
      parent: viewModel,
      localizedToolTip: viewModel.showReminders ? `${maxOverheatToolTip}<br><br>${maxOverheatExplanation}` : maxOverheatToolTip,
      value: document.magic.overheat.consuming(),
      onChange: (_, newValue) => {
        document.magic.overheat.modifier(newValue - document.magic.overheat.rawConsuming());
      },
    });
    viewModel.maxOverheatModifierString = `(${document.magic.overheat.modifier() >= 0 ? "+" : "-"}${Math.abs(document.magic.overheat.modifier())})`;

    // Range

    if (viewModel.hasSlag) {
      viewModel.vmOverheatSliderSlag = new game.strive.classDef.viewModel.ViewModel({
        id: "vmOverheatSliderSlag",
        parent: viewModel,
        localizedToolTip: game.strive.util.string.format2(game.i18n.localize("strive-fantasy.character.magic.slag.withPlaceholders"), {
          slag: document.magic.slag.current(),
        }),
      });
    }
    if (viewModel.showRangeSlider) {
      viewModel.vmOverheatSlider = new game.strive.classDef.viewModel.InputSliderViewModel({
        id: "vmOverheatSlider",
        parent: viewModel,
        min: document.magic.slag.current(),
        max: viewModel.overheatConsuming,
        value: document.magic.overheat.currentWithSlag(),
        isEditable: viewModel.isEditable,
        localizedToolTip: game.strive.util.string.format2(
          game.i18n.localize("strive-fantasy.character.magic.overheat.rangeWithPlaceholders"),
          {
            current: document.magic.overheat.currentWithSlag(),
            threshold: game.i18n.localize(getThresholdFor(document.magic.overheat.currentWithSlag()).localizableName),
          }
        ),
        onChange: (_, newValue) => {
          document.magic.overheat.current(newValue - document.magic.slag.current());
        },
        onInput: (event, viewModel) => {
          const newValue = event.currentTarget.value;
          viewModel.localizedToolTip = game.strive.util.string.format2(
            game.i18n.localize("strive-fantasy.character.magic.overheat.rangeWithPlaceholders"),
            {
              current: newValue,
              threshold: game.i18n.localize(getThresholdFor(newValue).localizableName),
            }
          );
        },
      });
    }
    viewModel.vmThresholdCold = new game.strive.classDef.viewModel.ViewModel({
      id: "vmThresholdCold",
      parent: viewModel,
      localizedToolTip: this._getToolTipOfThresholdCold(viewModel),
    });
    viewModel.vmThresholdSmoldering = new game.strive.classDef.viewModel.ViewModel({
      id: "vmThresholdSmoldering",
      parent: viewModel,
      localizedToolTip: this._getToolTipOfThresholdSmoldering(viewModel),
    });
    viewModel.vmThresholdBroiling = new game.strive.classDef.viewModel.ViewModel({
      id: "vmThresholdBroiling",
      parent: viewModel,
      localizedToolTip: this._getToolTipOfThresholdBroiling(viewModel),
    });
    viewModel.vmThresholdConsuming = new game.strive.classDef.viewModel.ViewModel({
      id: "vmThresholdConsuming",
      parent: viewModel,
      localizedToolTip: this._getToolTipOfThresholdConsuming(viewModel),
    });

    return viewModel;
  }

  /**
   * @param {ViewModel} viewModel 
   * 
   * @returns {String}
   * 
   * @private
   */
  _getToolTipOfThresholdCold(viewModel) {
    const header = game.i18n.localize("strive-fantasy.character.magic.overheat.cold");
    const range = `0 <-> ${viewModel.overheatSmoldering - 1}`;

    if (!viewModel.showReminders) {
      return `${header} (${range})`;
    } else {
      const headerLine = `<b>${header}</b> (${range}):`;
      const line1 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.coldReminder.1")}</li>`;

      return `${headerLine}<br><ul>${line1}</ul>`;
    }
  }

  /**
   * @param {ViewModel} viewModel 
   * 
   * @returns {String}
   * 
   * @private
   */
  _getToolTipOfThresholdSmoldering(viewModel) {
    const header = game.i18n.localize("strive-fantasy.character.magic.overheat.smoldering");
    const range = `${viewModel.overheatSmoldering} <-> ${viewModel.overheatBroiling - 1}`;

    if (!viewModel.showReminders) {
      return `${header} (${range})`;
    } else {
      const headerLine = `<b>${header}</b> (${range}):`;
      const line1 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.smolderingReminder.1")}</li>`;
      const line2 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.smolderingReminder.2")}</li>`;

      return `${headerLine}<br><ul>${[line1, line2].join("")}</ul>`;
    }
  }

  /**
   * @param {ViewModel} viewModel 
   * 
   * @returns {String}
   * 
   * @private
   */
  _getToolTipOfThresholdBroiling(viewModel) {
    const header = game.i18n.localize("strive-fantasy.character.magic.overheat.broiling");
    const range = `${viewModel.overheatBroiling} <-> ${viewModel.overheatConsuming - 1}`;

    if (!viewModel.showReminders) {
      return `${header} (${range})`;
    } else {
      const headerLine = `<b>${header}</b> (${range}):`;
      const line1 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.broilingReminder.1")}</li>`;
      const line2 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.broilingReminder.2")}</li>`;

      return `${headerLine}<br><ul>${[line1, line2].join("")}</ul>`;
    }
  }

  /**
   * @param {ViewModel} viewModel 
   * 
   * @returns {String}
   * 
   * @private
   */
  _getToolTipOfThresholdConsuming(viewModel) {
    const header = game.i18n.localize("strive-fantasy.character.magic.overheat.consuming");
    const range = `${viewModel.overheatConsuming}+`;

    if (!viewModel.showReminders) {
      return `${header} (${range})`;
    } else {
      const headerLine = `<b>${header}</b> (${range}):`;
      const line1 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.consumingReminder.1")}</li>`;
      const line2 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.consumingReminder.2")}</li>`;
      const line3 = `<li>${game.i18n.localize("strive-fantasy.character.magic.overheat.consumingReminder.3")}</li>`;

      return `${headerLine}<br><ul>${[line1, line2, line3].join("")}</ul>`;
    }
  }
}
