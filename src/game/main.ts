import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { DragAndDrop } from './scenes/DragAndDrop';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  // width: 1024,
  // height: 768,
  scale: {
    // Fit to window
    mode: Phaser.Scale.FIT,
    // Center vertically and horizontally
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, MainMenu, Game, GameOver, DragAndDrop],
};

export default function startGame(parent: HTMLElement | string) {
  return new Phaser.Game({ ...config, parent });
}
