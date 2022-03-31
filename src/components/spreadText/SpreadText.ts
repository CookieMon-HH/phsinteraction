import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js';
import Visual from './Visual';

class SpreadText {
  renderer?: PIXI.Renderer;
  stage?: PIXI.Container;
  visual?: Visual;
  stageWidth: number = 0;
  stageHeight: number = 0;
  text: string;

  constructor(text: string, container: HTMLElement) {
    this.text = text;
    this.setWebgl(container);

    WebFont.load({
      google: {
        families: ['Hind:700']
      },
      fontactive: () => {
        this.visual = new Visual();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
      }
    })
  };

  setWebgl(container: HTMLElement) {
    this.renderer = new PIXI.Renderer({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: false,
      resolution: 1,
      autoDensity: true,
      powerPreference: 'high-performance',
      backgroundColor: 0xffffff,
    });
    container.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
  };

  resize() {
    if(!this.stage) return;
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    
    this.renderer?.resize(this.stageWidth, this.stageHeight);
    this.visual?.show(this.stageWidth, this.stageHeight, this.stage, this.text);
  }

  spread(value: number) {
    if(!this.visual || !this.stage || !this.renderer) {
      window.onload = () => {
        this.spread(value);
      }
      return;
    }
    this.visual?.spread(value);
    this.renderer?.render(this.stage);
  }
};

export default SpreadText;
