import * as PIXI from 'pixi.js';
import Particle, { IPosition } from "./Particle";
import Text from "./Text";

class Visual {
  text: Text;
  texture: PIXI.Texture;
  particles: Particle[];
  container: PIXI.ParticleContainer | null = null;
  dots: IPosition[] = [];

  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from("/assets/images/particle.png");
    this.particles = [];
  };

  show(stageWidth: number, stageHeight: number, stage: PIXI.Container, str: string) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.dots = this.text.setText(str, 1, stageWidth, stageHeight);

    this.container = new PIXI.ParticleContainer(this.dots.length, {
      vertices: false,
      position: true,
      rotation: false,
      scale: false,
      uvs: false,
      tint: true,
    });
  
    stage.addChild(this.container);

    this.particles = [];
    const maxPos = {
      x: stageWidth,
      y: stageHeight,
    };
    this.dots.forEach((dot) => {
      if (!this.container) return;
      const item = new Particle(dot, this.texture, maxPos);
      this.container.addChild(item.sprite);
      this.particles.push(item);
    });
  };

  spread(value: number) {
    this.particles.forEach((particle) => {
      particle.draw(value);
    });
  };
};

export default Visual;
