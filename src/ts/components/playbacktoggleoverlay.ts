import { Container, ContainerConfig } from './container';

import { HugePlaybackToggleButton } from './hugeplaybacktogglebutton';
import { HugeRewindButton } from './hugerewindbutton';
import { HugeFastforwardButton } from './hugefastforwardbutton';

/**
 * @category Configs
 */
export interface PlaybackToggleOverlayConfig extends ContainerConfig {
  /**
   * Specify whether the player should be set to enter fullscreen by clicking on the playback toggle button
   * when initiating the initial playback.
   * Default is false.
   */
  enterFullscreenOnInitialPlayback?: boolean;
}

/**
 * Overlays the player and displays error messages.
 *
 * @category Components
 */
export class PlaybackToggleOverlay extends Container<PlaybackToggleOverlayConfig> {
  private playbackToggleButton: HugePlaybackToggleButton;
  private rewindButton: HugeRewindButton;
  private fastforwardButton: HugeFastforwardButton;

  constructor(config: PlaybackToggleOverlayConfig = {}) {
    super(config);

    this.playbackToggleButton = new HugePlaybackToggleButton({
      enterFullscreenOnInitialPlayback: Boolean(
        config.enterFullscreenOnInitialPlayback,
      ),
    });
    this.rewindButton = new HugeRewindButton();
    this.fastforwardButton = new HugeFastforwardButton();

    this.config = this.mergeConfig(
      config,
      {
        // cssClass: 'ui-playbacktoggle-overlay',
        cssClasses: ['ui-rewindplayfastforward-overlay'],
        components: [
          this.rewindButton,
          this.playbackToggleButton,
          this.fastforwardButton,
        ],
      },
      this.config,
    );
  }
}
