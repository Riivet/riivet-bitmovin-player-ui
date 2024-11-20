import { Button, ButtonConfig } from './button';
import { PlayerAPI } from 'bitmovin-player';
import { i18n } from '../localization/i18n';
import { UIInstanceManager } from '../uimanager';
import { PlayerUtils } from '../playerutils';
import LiveStreamDetectorEventArgs = PlayerUtils.LiveStreamDetectorEventArgs;

declare const window: any;

export class HugeFastforwardButton extends Button<ButtonConfig> {
  constructor(config: ButtonConfig = {}) {
    super(config);
    this.config = this.mergeConfig(
      config,
      {
        cssClass: 'ui-fastforward-button',
        text: i18n.getLocalizer('fastforward'),
        ariaLabel: i18n.getLocalizer('fastforward'),
        role: 'button',
      },
      this.config,
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    if (player.isLive()) {
      this.hide();
    }

    const liveStreamDetector = new PlayerUtils.LiveStreamDetector(
      player,
      uimanager,
    );

    liveStreamDetector.onLiveChanged.subscribe(
      (sender, args: LiveStreamDetectorEventArgs) => {
        if (args.live) {
          this.hide();
        } else {
          this.show();
        }
      },
    );

    uimanager.onControlsShow.subscribe(() => {
      this.show();
    });
    uimanager.onControlsHide.subscribe(() => {
      this.hide();
    });

    this.onClick.subscribe(() => {
      if (window.bitmovin.customMessageHandler) {
        let result =
          window.bitmovin.customMessageHandler.sendSynchronous(
            'fastforwardContent',
          );
        console.log('Return value from native:', result);
        window.bitmovin.customMessageHandler.sendAsynchronous(
          'fastforwardContentAsync',
        );
      }
    });
  }
}
