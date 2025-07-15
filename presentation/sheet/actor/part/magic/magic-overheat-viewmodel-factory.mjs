import { MagicOverHeatThresholds } from "../../../../../business/document/const/magic-overheat-thresholds.mjs";
import Ruleset from "../../../../../business/ruleset/ruleset.mjs";

export default class MagicOverheatViewModelFactory {
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
    
    viewModel.overheatSmolderingPercentage = (viewModel.overheatSmoldering / viewModel.overheatConsuming) * 100.0;
    viewModel.overheatBroilingPercentage = (viewModel.overheatBroiling / viewModel.overheatConsuming) * 100.0;

    const getThresholdFor = (value) => {
      if (value < viewModel.overheatSmoldering)
        return MagicOverHeatThresholds.COLD;
      else if (value < viewModel.overheatBroiling)
        return MagicOverHeatThresholds.SMOLDERING;
      else if (value < viewModel.overheatConsuming)
        return MagicOverHeatThresholds.BROILING;
      else
        return MagicOverHeatThresholds.CONSUMING;
    };

    const currentHeat = getThresholdFor(document.magic.overheat.current());
    viewModel.isActiveCold = currentHeat.name === MagicOverHeatThresholds.COLD.name;
    viewModel.isActiveSmoldering = currentHeat.name === MagicOverHeatThresholds.SMOLDERING.name;
    viewModel.isActiveBroiling = currentHeat.name === MagicOverHeatThresholds.BROILING.name;
    viewModel.isActiveConsuming = currentHeat.name === MagicOverHeatThresholds.CONSUMING.name;

    const ATTRIBUTES = game.strive.const.ATTRIBUTES; 
    const ruleset = new game.strive.classDef.Ruleset(); 
    const arcanaLevel = ruleset.getEffectiveAttributeModifiedLevel(ATTRIBUTES.arcana, document);
    viewModel.showRangeSlider = (arcanaLevel > 0);

    viewModel.vmOverheatReminder = new game.strive.classDef.viewModel.ViewModel({
      id: "vmOverheatReminder",
      parent: viewModel,
      localizedToolTip: viewModel.showReminders ? game.i18n.localize("strive-fantasy.character.magic.overheat.reminder") : undefined,
    });
    viewModel.vmOverheat = new game.strive.classDef.viewModel.InputNumberSpinnerViewModel({
      id: "vmOverheat",
      parent: viewModel,
      value: document.magic.overheat.current(),
      min: 0,
      isEditable: true,
      localizedToolTip: game.i18n.localize("strive-fantasy.character.magic.overheat.label"),
      onChange: (_, newValue) => {
        document.magic.overheat.current(newValue);
      },
    });

    if (viewModel.showRangeSlider) {
      viewModel.vmOverheatSlider = new game.strive.classDef.viewModel.InputSliderViewModel({
        id: "vmOverheatSlider",
        parent: viewModel,
        min: 0,
        max: viewModel.overheatConsuming,
        value: document.magic.overheat.current(),
        isEditable: true,
        localizedToolTip: game.strive.util.string.format2(
          game.i18n.localize("strive-fantasy.character.magic.overheat.withPlaceholders"),
          {
            current: document.magic.overheat.current(),
            threshold: game.i18n.localize(getThresholdFor(document.magic.overheat.current()).localizableName),
          }
        ),
        onChange: (_, newValue) => {
          document.magic.overheat.current(newValue);
        },
        onInput: (event, viewModel) => {
          const newValue = event.currentTarget.value;
          viewModel.localizedToolTip = game.strive.util.string.format2(
            game.i18n.localize("strive-fantasy.character.magic.overheat.withPlaceholders"),
            {
              current: newValue,
              threshold: game.i18n.localize(getThresholdFor(newValue).localizableName),
            }
          )
        },
      });
      viewModel.vmThresholdCold = new game.strive.classDef.viewModel.ViewModel({
        id: "vmThresholdCold",
        parent: viewModel,
        localizedToolTip: viewModel.showReminders ? game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.coldWithRangeReminder"),
          `0-${viewModel.overheatSmoldering - 1}`
        ): game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.coldWithRange"),
          `0-${viewModel.overheatSmoldering - 1}`
        ),
      });
      viewModel.vmThresholdSmoldering = new game.strive.classDef.viewModel.ViewModel({
        id: "vmThresholdSmoldering",
        parent: viewModel,
        localizedToolTip: viewModel.showReminders ? game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.smolderingWithRangeReminder"),
          `${viewModel.overheatSmoldering}-${viewModel.overheatBroiling - 1}`
        ) : game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.smolderingWithRange"),
          `${viewModel.overheatSmoldering}-${viewModel.overheatBroiling - 1}`
        ),
      });
      viewModel.vmThresholdBroiling = new game.strive.classDef.viewModel.ViewModel({
        id: "vmThresholdBroiling",
        parent: viewModel,
        localizedToolTip: viewModel.showReminders ? game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.broilingWithRangeReminder"),
          `${viewModel.overheatBroiling}-${viewModel.overheatConsuming - 1}`
        ) : game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.broilingWithRange"),
          `${viewModel.overheatBroiling}-${viewModel.overheatConsuming - 1}`
        ),
      });
      viewModel.vmThresholdConsuming = new game.strive.classDef.viewModel.ViewModel({
        id: "vmThresholdConsuming",
        parent: viewModel,
        localizedToolTip: viewModel.showReminders ? game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.consumingWithRangeReminder"),
          `${viewModel.overheatConsuming}+`
        ) : game.strive.util.string.format(
          game.i18n.localize("strive-fantasy.character.magic.overheat.consumingWithRange"),
          `${viewModel.overheatConsuming}+`
        ),
      });
    }

    return viewModel;
  }
}
