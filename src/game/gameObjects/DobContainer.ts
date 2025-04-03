import type { Container, Visibility } from 'src/types/containers';
import type { Id } from 'src/types/util';

export class DobContainer extends Phaser.GameObjects.Container {
  id: Id<Container>;

  padding: number = 10;
  setPadding(padding: number): this {
    this.padding = padding;
    return this;
  }

  itemVisibility: Visibility = { type: 'hidden', players: new Set() };
  setItemVisibility(itemVisibility: Visibility): this {
    this.itemVisibility = itemVisibility;
    return this;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    id: Id<Container>,
    children?: Phaser.GameObjects.GameObject[],
  ) {
    super(scene, x, y, children);
    this.id = id;
    this.setInteractive();
  }
}
