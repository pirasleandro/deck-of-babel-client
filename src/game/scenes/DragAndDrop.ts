import type { Position } from 'src/types/util';
import { GameObjects } from 'phaser';

export class DragAndDrop extends Phaser.Scene {
  piles: Pile[] = [];
  readonly pilePadding = 20;

  readonly imgWidth = 140;
  readonly imgHeight = 190;
  readonly imgScale = 0.5;

  get defWidth(): number {
    return this.imgWidth * this.imgScale;
  }
  get defHeight(): number {
    return this.imgHeight * this.imgScale;
  }

  constructor() {
    super('DragAndDrop');
  }

  preload() {
    this.load.atlas('cards', 'src/game/assets/cards.png', 'src/game/assets/cards.json');
  }

  create() {
    //  Create a stack of random cards

    const frames = this.textures.get('cards').getFrameNames();

    const x = 20;
    let y = 20;

    for (let i = 0; i < 64; i++) {
      const image = this.add
        .image(x, y, 'cards', Phaser.Math.RND.pick(frames))
        .setOrigin(0, 0)
        .setScale(this.imgScale, this.imgScale)
        .setInteractive();

      this.input.setDraggable(image);

      y += 6;
    }

    //  Drop zones
    this.piles = [
      { x: 300, y: 20 },
      { x: 470, y: 20 },
    ].map((pos, idx) => {
      const zone = this.add
        .zone(
          pos.x,
          pos.y,
          this.defWidth + this.pilePadding * 2,
          this.defHeight + this.pilePadding * 2,
        )
        .setRectangleDropZone(
          this.defWidth + this.pilePadding * 2,
          this.defHeight + this.pilePadding * 2,
        )
        .setOrigin(0, 0)
        .setName(`zone-${idx}`);

      const rect = this.add
        .rectangle(zone.x, zone.y, zone.width, zone.height)
        .setName(`rect-${idx}`)
        .setStrokeStyle(2, 0x00ffff)
        .setOrigin(0, 0);

      // const graphics = this.add.graphics();
      // graphics.clear();
      // graphics.lineStyle(2, 0x00ffff);
      // graphics.strokeRect(zone.x, zone.y, zone.width, zone.height);
      // graphics.setName(`graphics-${idx}`);

      return {
        pos,
        zone,
        rect,
        // graphics,
        cards: [],
      };
    });

    this.input.on(
      'dragstart',
      (pointer: unknown, gameObject: GameObjects.Image) => {
        this.children.bringToTop(gameObject);
        gameObject.alpha = 0.5;
      },
      this,
    );

    this.input.on(
      'drag',
      (pointer: unknown, gameObject: GameObjects.Image, dragX: number, dragY: number) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      },
    );

    this.input.on(
      'dragenter',
      (pointer: unknown, gameObject: GameObjects.Image, zone: GameObjects.Zone) => {
        const rect = this.getPile(zone)?.rect;
        rect?.setStrokeStyle(2, 0x00ffff);
        /* const graphics = this.getPile(zone)?.graphics;
        graphics?.clear();
        graphics?.lineStyle(2, 0x00ffff);
        graphics?.strokeRect(zone.x, zone.y, zone.width, zone.height); */
      },
    );

    this.input.on(
      'dragleave',
      (pointer: unknown, gameObject: GameObjects.Image, zone: GameObjects.Zone) => {
        const rect = this.getPile(zone)?.rect;
        rect?.setStrokeStyle(2, 0xffff00);
        /* const graphics = this.getPile(zone)?.graphics;
        graphics?.clear();
        graphics?.lineStyle(2, 0xffff00);
        graphics?.strokeRect(zone.x, zone.y, zone.width, zone.height); */
      },
    );

    this.input.on(
      'drop',
      (pointer: unknown, gameObject: GameObjects.Image, zone: GameObjects.Zone) => {
        const previousPile = this.getPileOfCard(gameObject);
        if (previousPile) {
          previousPile.cards.splice(previousPile.cards.indexOf(gameObject), 1);
          this.refreshPile(previousPile);
        }

        const pile = this.getPile(zone);
        if (pile) this.addCard(pile, gameObject);

        // gameObject.input.enabled = false;
      },
    );

    this.input.on(
      'dragend',
      (pointer: unknown, gameObject: GameObjects.Image, dropped: boolean) => {
        if (gameObject instanceof GameObjects.Image) gameObject.alpha = 1;

        if (!dropped && gameObject.input) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
        }

        const pile = this.getPileOfCard(gameObject);
        if (!pile) return;

        pile.rect.setStrokeStyle(2, 0xffff00);
        pile.rect.setSize(pile.zone.width, pile.zone.height);

        /* const zone = pile.zone;
        const graphics = pile.graphics;

        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x, zone.y, zone.width, zone.height); */
      },
    );
  }

  getPile(zone: GameObjects.Zone): Pile | undefined {
    if (!zone) return;
    return this.piles.find((pile) => pile.zone.name === zone.name);
  }

  getPileOfCard(card: GameObjects.Image): Pile | undefined {
    if (!card) return;
    return this.piles.find((pile) => pile.cards.includes(card));
  }

  addCard(pile: Pile, card: GameObjects.Image) {
    if (!pile || !card) return;
    pile.cards.push(card);
    card.x = pile.zone.x;
    this.refreshPile(pile, pile.cards.length - 1);
  }

  removeCard(pile: Pile, card: GameObjects.Image) {
    if (!pile || !card) return;
    const idx = pile.cards.indexOf(card);
    pile.cards.splice(idx, 1);
    this.refreshPile(pile, idx);
  }

  refreshPile(pile: Pile, startIndex = 0) {
    const gap = 40;

    if (!pile) return;
    pile.cards.slice(startIndex).forEach((card: GameObjects.Image) => {
      const idx = pile.cards.indexOf(card);
      card.x = pile.zone.x + this.pilePadding;
      card.y = pile.zone.y + this.pilePadding + gap * idx;
      this.children.bringToTop(card);
    });
    const { zone, /* graphics, */ rect } = pile;
    zone.height = this.defHeight + this.pilePadding * 2 + gap * (pile.cards.length - 1);
    if (zone.input) zone.input.hitArea.height = zone.height;

    rect.setSize(zone.width, zone.height);

    // zone.input.hitArea.y = zone.y;
    // console.log(zone.input.hitArea);
    /* graphics.clear();
    graphics.strokeRect(zone.x, zone.y, zone.width, zone.height); */
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
  }
}

type Pile = {
  pos: Position;
  cards: GameObjects.Image[];
  zone: GameObjects.Zone;
  rect: GameObjects.Rectangle;
  // graphics: GameObjects.Graphics;
};
