import { IPosition } from "./Particle";

class Text {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';

    this.ctx = this.canvas.getContext('2d');
  }

  setText(str: string, density: number, stageWidth: number, stageHeight: number): IPosition[] {
    if(!this.ctx) return [];
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 96;
    const fontName = 'Hind';

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.textBaseline = 'middle';
    const fontPos = this.ctx.measureText(myText);
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
      fontPos.actualBoundingBoxDescent +
      ((stageHeight - fontSize) / 2)
    )

    return this.dotPos(density, stageWidth, stageHeight);
  };

  dotPos(density: number, stageWidth: number, stageHeight: number): IPosition[] {
    if(!this.ctx) return [];
    const imageData = this.ctx.getImageData(
      0, 0,
      stageWidth, stageHeight
    ).data;

    const particles: IPosition[] = [];
    let width = 0;
    let pixel;
    
    for(let height = 0; height < stageHeight; height += density) {
      width = 0;

      for(width; width < stageWidth; width += density) {
        pixel = imageData[((width + (height * stageWidth)) * 4) + 3];
        if(pixel !== 0 &&
          width >= 0 &&
          width <= stageWidth && 
          height >= 0 &&
          height <= stageHeight) {
            particles.push({
              x: width,
              y: height,
            })
          }
      }
    }
    return particles;
  };
};

export default Text;
