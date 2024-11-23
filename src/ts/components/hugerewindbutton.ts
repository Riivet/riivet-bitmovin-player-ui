import { Button, ButtonConfig } from './button';
import { PlayerAPI } from 'bitmovin-player';
import { i18n } from '../localization/i18n';
import { UIInstanceManager } from '../uimanager';
import { PlayerUtils } from '../playerutils';
import LiveStreamDetectorEventArgs = PlayerUtils.LiveStreamDetectorEventArgs;

declare const window: any;

export class HugeRewindButton extends Button<ButtonConfig> {
  constructor(config: ButtonConfig = {}) {
    super(config);
    this.config = this.mergeConfig(
      config,
      {
        cssClass: 'ui-rewind-button',
        text: i18n.getLocalizer('rewind'),
        ariaLabel: i18n.getLocalizer('rewind'),
      },
      this.config,
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    // TODO: Show button if DVR is enabled
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
          window.bitmovin.customMessageHandler.sendSynchronous('rewindContent');
        console.log('Return value from native:', result);
        window.bitmovin.customMessageHandler.sendAsynchronous(
          'rewindContentAsync',
        );
      }
    });
  }
}
