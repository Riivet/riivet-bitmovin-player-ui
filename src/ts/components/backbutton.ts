import { PlayerAPI } from 'bitmovin-player';
import { i18n } from '../localization/i18n';
import { UIInstanceManager } from '../uimanager';
import { Button, ButtonConfig } from './button';
import { PlayerUtils } from '../playerutils';
import LiveStreamDetectorEventArgs = PlayerUtils.LiveStreamDetectorEventArgs;

declare const window: any;

export class BackButton extends Button<ButtonConfig> {
  constructor(config: ButtonConfig = {}) {
    super(config);
    this.config = this.mergeConfig(
      config,
      {
        cssClass: 'ui-back-chevron-button',
        text: i18n.getLocalizer('back'),
        ariaLabel: i18n.getLocalizer('back'),
      },
      this.config,
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    const liveStreamDetector = new PlayerUtils.LiveStreamDetector(
      player,
      uimanager,
    );

    this.onClick.subscribe(() => {
      if (window.bitmovin.customMessageHandler) {
        let result = window.bitmovin.customMessageHandler.sendSynchronous('closePlayer');
        console.log('Return value from native:', result);
        window.bitmovin.customMessageHandler.sendAsynchronous('closePlayerAsync');
      }
    });
  }
}
