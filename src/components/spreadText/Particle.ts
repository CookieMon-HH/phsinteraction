import * as PIXI from 'pixi.js';

export interface IPosition {
  x: number;
  y: number;
}

class Particle {
  sprite: PIXI.Sprite;
  savedX: number;
  savedY: number;
  spreadX: number;
  spreadY: number;
  x: number;
  y: number;
  rgb: number;

  constructor(pos: IPosition, texture: PIXI.Texture, maxPos: IPosition) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.06);

    this.savedX = pos.x;
    this.savedY = pos.y;
    
    const randomX = Math.floor((Math.random() - Math.random()) * (maxPos.x));
    const randomY = Math.floor((Math.random() - Math.random()) * (maxPos.y));
    this.spreadX = this.savedX + randomX;
    this.spreadY = this.savedY + randomY;
    
    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.rgb = 0xf3316e;
  }

  collide() {
    this.rgb = 0x451966;
  }

  draw(value: number) {
    this.x = this.spreadX + ((this.savedX - this.spreadX) * (1 - value));
    this.y = this.spreadY + ((this.savedY - this.spreadY) * (1 - value));

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.tint = this.rgb;
  }
};

export default Particle;
