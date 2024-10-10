import { PlayerAPI } from "bitmovin-player";
import { i18n } from "../localization/i18n";
import { UIInstanceManager } from "../uimanager";
import { Button, ButtonConfig } from "./button";
import { PlayerUtils } from "../playerutils";
import LiveStreamDetectorEventArgs = PlayerUtils.LiveStreamDetectorEventArgs;

export class BackButton extends Button<ButtonConfig> {
  constructor(config: ButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(
      config,
      {
        cssClass: "ui-replaybutton",
        text: i18n.getLocalizer("back"),
        ariaLabel: i18n.getLocalizer("back"),
      },
      this.config
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    if (player.isLive()) {
      this.hide();
    }

    const liveStreamDetector = new PlayerUtils.LiveStreamDetector(
      player,
      uimanager
    );
    liveStreamDetector.onLiveChanged.subscribe(
      (sender, args: LiveStreamDetectorEventArgs) => {
        if (args.live) {
          this.hide();
        } else {
          this.show();
        }
      }
    );

    this.onClick.subscribe(() => {
      player.destroy();
    });
  }
}
