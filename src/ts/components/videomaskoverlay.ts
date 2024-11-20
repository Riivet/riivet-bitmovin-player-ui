import { Container, ContainerConfig } from './container';
import { PlayerAPI } from 'bitmovin-player';
import { i18n } from '../localization/i18n';
import { UIInstanceManager } from '../uimanager';
import { PlayerUtils } from '../playerutils';
import LiveStreamDetectorEventArgs = PlayerUtils.LiveStreamDetectorEventArgs;

declare const window: any;

export class VideoMaskOverlay extends Container<ContainerConfig> {
  constructor(config: ContainerConfig = {}) {
    super(config);
    this.config = this.mergeConfig(
      config,
      {
        cssClass: 'ui-video-mask',
      },
      this.config,
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    uimanager.onControlsShow.subscribe(() => {
      this.show();
    });
    uimanager.onControlsHide.subscribe(() => {
      this.hide();
    });
  }
}
