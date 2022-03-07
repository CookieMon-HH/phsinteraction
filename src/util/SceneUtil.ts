type SceneType = 'sticky' | 'normal';

interface IScene {
  type: SceneType;
  container: HTMLElement;
  messageGroup?: IMessageGroup;
  canvas?: HTMLCanvasElement;
}

interface IMessage {
  message: HTMLDivElement;
  opacityIn: IOpacity;
  opacityOut: IOpacity;
  translateIn: ITranslate;
  translateOut: ITranslate;
}

interface IMessageGroup {
  messageA: IMessage;
  messageB: IMessage;
  messageC: IMessage;
  messageD: IMessage;
}

interface IOpacity {
  range: number[];
  startRatio: number;
  endRatio: number;
}

interface ITranslate extends IOpacity {
};

interface ICanvasImgSeq extends IOpacity {
};

interface IRect {
  rect1x: IOpacity;
  rect2x: IOpacity;
  startY: number;
  endY: number;
};

interface ISceneInfoObj {
  container: HTMLElement;
  messageGroup?: IMessageGroup;
  canvas?: HTMLCanvasElement;
  canvasSequence?: ICanvasImgSeq;
  rect?: IRect;
}

interface ISceneInfo {
  type: SceneType;
  heightNum: number;
  scrollHeight: number;
  obj: ISceneInfoObj;
}

export const ACTIVE_SCENE_CLASS_NAME = 'scene_active'

class SceneUtil {
  static sceneInfo: ISceneInfo[];
  static prevScrollHeight = 0;
  private static currentActiveScene: HTMLElement;
  static firstSceneImages: HTMLImageElement[] = [];
  static thirdSceneImages: HTMLImageElement[] = [];
  static fourthSceneImages: HTMLImageElement[] = [];
  
  constructor(data: IScene[]) {
    SceneUtil.sceneInfo = data.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      obj: {
        container: scene.container,
        messageGroup: scene.messageGroup,
        canvas: scene.canvas,
        canvasSequence: {
          range: [0, 1],
          startRatio: 0,
          endRatio: 1
        },
        rect: {
          rect1x: {
            range: [0, 0],
            startRatio: 0,
            endRatio: 0
          },
          rect2x: {
            range: [0, 0],
            startRatio: 0,
            endRatio: 0
          },
          startY: 0,
          endY: 0
        }
      }
    }));
    SceneUtil.currentActiveScene = SceneUtil.sceneInfo[0].obj.container;
    SceneUtil.currentActiveScene.classList.add(ACTIVE_SCENE_CLASS_NAME);
    SceneUtil.setLayout();
    SceneUtil.setCanvasImages();
  }
  
  static setLayout = () => {
    SceneUtil.sceneInfo.forEach((sceneInfo: ISceneInfo, index) => {
      sceneInfo.scrollHeight = sceneInfo.heightNum * window.innerHeight;
      sceneInfo.obj.container.style.height = `${sceneInfo.scrollHeight}px`;
      const heightRatio = window.innerHeight / 1080;
      if (sceneInfo.obj.canvas) {
        if (index === 3) return;
        sceneInfo.obj.canvas.style.transform = `translate3d(-50%,-50%, 0) scale(${heightRatio})`;
      }
    });
  }
  
  private static getCurrentSceneIndex = () => {
    const {pageYOffset} = window;
    const sceneLength = SceneUtil.sceneInfo.length;
    let prevScrollHeight = 0;
    for (let index = 0; index < sceneLength; index++) {
      if (pageYOffset < prevScrollHeight) {
        return index - 1;
      }
      prevScrollHeight += SceneUtil.sceneInfo[index].scrollHeight;
    }
    return sceneLength - 1;
  }
  
  private static calcValues = (values: IOpacity | ITranslate | ICanvasImgSeq, pageYOffset: number) => {
    const scrollHeight = SceneUtil.currentActiveScene.scrollHeight;
    const minValue = values.range[0];
    const maxValue = values.range[1];
    const partScrollStart = values.startRatio * scrollHeight;
    const partScrollEnd = values.endRatio * scrollHeight;
    const partScrollHeight = partScrollEnd - partScrollStart;
    
    if (pageYOffset > partScrollEnd) {
      return maxValue;
    } else if (pageYOffset < partScrollStart) {
      return minValue;
    } else {
      return (pageYOffset - partScrollStart) / partScrollHeight * (maxValue - minValue) + minValue;
    }
  }
  
  private static setCanvasImages() {
    for (let i = 0; i < 300; ++i) {
      const imgElem = new Image();
      imgElem.src = `/assets/images/001/IMG_${6726 + i}.JPG`;
      SceneUtil.firstSceneImages.push(imgElem);
    }
    
    for (let i = 0; i < 960; ++i) {
      const imgElem = new Image();
      imgElem.src = `/assets/images/002/IMG_${7027 + i}.JPG`;
      SceneUtil.thirdSceneImages.push(imgElem);
    }
    
    for (let i = 0; i < 2; ++i) {
      const imgElem = new Image();
      imgElem.src = `/assets/images/blend-image-${1 + i}.jpg`;
      SceneUtil.fourthSceneImages.push(imgElem);
    }
  }
  
  private static playAnimation = (currentSceneIndex: number) => {
    const {pageYOffset} = window;
    switch (currentSceneIndex) {
      case 0:
        const firstGroup = SceneUtil.sceneInfo[currentSceneIndex].obj.messageGroup;
        const firstCanvas = SceneUtil.sceneInfo[currentSceneIndex].obj.canvas;
        const firstCanvasSeq = SceneUtil.sceneInfo[currentSceneIndex].obj.canvasSequence;
        if (firstGroup === undefined || firstCanvas === undefined || firstCanvasSeq === undefined) return;
        const context = firstCanvas.getContext('2d');
        if (!context) return;
        const seq = Math.round(SceneUtil.calcValues(firstCanvasSeq, pageYOffset) * 300) | 0;
        context.drawImage(SceneUtil.firstSceneImages[seq], 0, 0);
        firstCanvas.style.opacity = SceneUtil.calcValues({
          range: [1, 0],
          startRatio: 0.9,
          endRatio: 1.0,
        }, pageYOffset).toString();
        const firstGroupRatio = pageYOffset / SceneUtil.currentActiveScene.scrollHeight;
        firstGroup.messageA.message.style.opacity = firstGroupRatio <= 0.22 ? SceneUtil.calcValues(firstGroup.messageA.opacityIn, pageYOffset).toString() : SceneUtil.calcValues(firstGroup.messageA.opacityOut, pageYOffset).toString();
        firstGroup.messageB.message.style.opacity = firstGroupRatio <= 0.42 ? SceneUtil.calcValues(firstGroup.messageB.opacityIn, pageYOffset).toString() : SceneUtil.calcValues(firstGroup.messageB.opacityOut, pageYOffset).toString();
        firstGroup.messageC.message.style.opacity = firstGroupRatio <= 0.62 ? SceneUtil.calcValues(firstGroup.messageC.opacityIn, pageYOffset).toString() : SceneUtil.calcValues(firstGroup.messageC.opacityOut, pageYOffset).toString();
        firstGroup.messageD.message.style.opacity = firstGroupRatio <= 0.82 ? SceneUtil.calcValues(firstGroup.messageD.opacityIn, pageYOffset).toString() : SceneUtil.calcValues(firstGroup.messageD.opacityOut, pageYOffset).toString();
        
        firstGroup.messageA.message.style.transform = firstGroupRatio <= 0.22 ? `translateY(${SceneUtil.calcValues(firstGroup.messageA.translateIn, pageYOffset)}%)` : `translateY(${SceneUtil.calcValues(firstGroup.messageA.translateOut, pageYOffset)}%)`;
        firstGroup.messageB.message.style.transform = firstGroupRatio <= 0.42 ? `translateY(${SceneUtil.calcValues(firstGroup.messageB.translateIn, pageYOffset)}%)` : `translateY(${SceneUtil.calcValues(firstGroup.messageB.translateOut, pageYOffset)}%)`;
        firstGroup.messageC.message.style.transform = firstGroupRatio <= 0.62 ? `translateY(${SceneUtil.calcValues(firstGroup.messageC.translateIn, pageYOffset)}%)` : `translateY(${SceneUtil.calcValues(firstGroup.messageC.translateOut, pageYOffset)}%)`;
        firstGroup.messageD.message.style.transform = firstGroupRatio <= 0.82 ? `translateY(${SceneUtil.calcValues(firstGroup.messageD.translateIn, pageYOffset)}%)` : `translateY(${SceneUtil.calcValues(firstGroup.messageD.translateOut, pageYOffset)}%)`;
        return;
      case 1:
        return;
      case 2:
        const thirdGroup = SceneUtil.sceneInfo[currentSceneIndex].obj.messageGroup;
        const thirdCanvas = SceneUtil.sceneInfo[currentSceneIndex].obj.canvas;
        const thirdCanvasSeq = SceneUtil.sceneInfo[currentSceneIndex].obj.canvasSequence;
        if (thirdGroup === undefined || thirdCanvas === undefined || thirdCanvasSeq === undefined) return;
        const context_3 = thirdCanvas.getContext('2d');
        if (!context_3) return;
        const prev = pageYOffset - 13960;
        const seq_3 = Math.round(SceneUtil.calcValues(thirdCanvasSeq, prev) * 960) | 0;
        context_3.drawImage(SceneUtil.thirdSceneImages[seq_3], 0, 0);
        
        const thirdGroupRatio = (prev) / SceneUtil.currentActiveScene.scrollHeight;
        thirdCanvas.style.opacity = thirdGroupRatio <= 0.5 ? SceneUtil.calcValues({
            range: [0, 1],
            startRatio: 0.0,
            endRatio: 0.1,
          }, prev).toString() :
          SceneUtil.calcValues({
            range: [1, 0],
            startRatio: 0.95,
            endRatio: 1.0,
          }, prev).toString();
        thirdGroup.messageA.message.style.opacity = thirdGroupRatio <= 0.32 ? SceneUtil.calcValues(thirdGroup.messageA.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageA.opacityOut, prev).toString();
        thirdGroup.messageB.message.style.opacity = thirdGroupRatio <= 0.62 ? SceneUtil.calcValues(thirdGroup.messageB.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageB.opacityOut, prev).toString();
        thirdGroup.messageC.message.style.opacity = thirdGroupRatio <= 0.92 ? SceneUtil.calcValues(thirdGroup.messageC.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageC.opacityOut, prev).toString();
        
        thirdGroup.messageA.message.style.transform = thirdGroupRatio <= 0.32 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageA.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageA.translateOut, prev)}%)`;
        thirdGroup.messageB.message.style.transform = thirdGroupRatio <= 0.62 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageB.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageB.translateOut, prev)}%)`;
        thirdGroup.messageC.message.style.transform = thirdGroupRatio <= 0.92 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageC.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageC.translateOut, prev)}%)`;
        return;
      case 3:
        const prev_3 = pageYOffset - 19660;
        const fourthCanvas = SceneUtil.sceneInfo[currentSceneIndex].obj.canvas;
        const fourthRect = SceneUtil.sceneInfo[currentSceneIndex].obj.rect;
        if (fourthCanvas === undefined || fourthRect === undefined) return;
        const widthRatio = window.innerWidth / fourthCanvas.width;
        const heightRatio = window.innerHeight / fourthCanvas.height;
        const canvasScaleRatio = widthRatio <= heightRatio ? heightRatio : widthRatio;
        
        const context_4 = fourthCanvas.getContext('2d');
        fourthCanvas.style.transform = `scale(${canvasScaleRatio})`;
        
        if (!context_4) return;
        context_4.drawImage(SceneUtil.fourthSceneImages[0], 0, 0);
        
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        
        if (!fourthRect.startY) {
          fourthRect.startY = fourthCanvas.getBoundingClientRect().top;
          fourthRect.rect1x.endRatio = fourthRect.startY / SceneUtil.sceneInfo[currentSceneIndex].scrollHeight;
          fourthRect.rect2x.endRatio = fourthRect.startY / SceneUtil.sceneInfo[currentSceneIndex].scrollHeight;
        }
        
        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        fourthRect.rect1x.range[0] = (fourthCanvas.width - recalculatedInnerWidth) / 2;
        fourthRect.rect1x.range[1] = fourthRect.rect1x.range[0] - whiteRectWidth;
        fourthRect.rect2x.range[0] = fourthRect.rect1x.range[0] + recalculatedInnerWidth - whiteRectWidth;
        fourthRect.rect2x.range[1] = fourthRect.rect2x.range[0] + whiteRectWidth;
        
        
        context_4.fillRect(SceneUtil.calcValues(fourthRect.rect1x, prev_3), 0, whiteRectWidth, fourthCanvas.height);
        context_4.fillRect(SceneUtil.calcValues(fourthRect.rect2x, prev_3), 0, whiteRectWidth, fourthCanvas.height);
        
        if (prev_3 < fourthRect.rect2x.endRatio) {
        
        } else {
          let blend: IOpacity = {
            range: [0, fourthCanvas.height],
            startRatio: fourthRect.rect1x.endRatio,
            endRatio: fourthRect.rect1x.endRatio + 0.2
          }
          const blendHeight = SceneUtil.calcValues(blend, prev_3);
          context_4.drawImage(SceneUtil.fourthSceneImages[1], 0, fourthCanvas.height - blendHeight, fourthCanvas.width, blendHeight, 0, fourthCanvas.height - blendHeight, fourthCanvas.width, blendHeight);
          fourthCanvas.style.top = `${fourthCanvas.getBoundingClientRect().top}px`
          
          if(prev_3 > blend.endRatio){
            let scale : IOpacity = {
              range: [canvasScaleRatio, document.body.offsetWidth / (1.5 * fourthCanvas.width)],
              startRatio : blend.endRatio,
              endRatio : blend.endRatio + 0.2
            }
            
            fourthCanvas.style.transform = `scale(${SceneUtil.calcValues(scale, prev_3)})`;
          }
        }
        
        return;
    }
  }
  
  private static scrollLoop = () => {
    const currentSceneIndex = SceneUtil.getCurrentSceneIndex();
    if (currentSceneIndex < 0) return;
    const nextScene = SceneUtil.sceneInfo[currentSceneIndex].obj.container;
    if (SceneUtil.currentActiveScene === nextScene) {
      SceneUtil.playAnimation(currentSceneIndex);
      return;
    }
    SceneUtil.currentActiveScene.classList.remove(ACTIVE_SCENE_CLASS_NAME);
    SceneUtil.currentActiveScene = SceneUtil.sceneInfo[currentSceneIndex].obj.container;
    SceneUtil.currentActiveScene.classList.add(ACTIVE_SCENE_CLASS_NAME);
    
  }
  
  addResizeLayoutEvent = () => {
    SceneUtil.setLayout();
    window.addEventListener('resize', SceneUtil.setLayout);
    return {
      dispose: () => {
        window.removeEventListener('resize', SceneUtil.setLayout);
      }
    }
  }
  
  addLoadEvent = () => {
    window.addEventListener('load', () => {
      SceneUtil.setLayout();
      const context = SceneUtil.sceneInfo[0].obj.canvas?.getContext('2d');
      if (!context) return;
      context.drawImage(SceneUtil.firstSceneImages[0], 0, 0);
    });
    return {
      dispose: () => {
        window.removeEventListener('load', SceneUtil.setLayout);
      }
    }
  }
  addScrollLoopEvent = () => {
    SceneUtil.scrollLoop();
    window.addEventListener('scroll', SceneUtil.scrollLoop);
    return {
      dispose: () => {
        window.removeEventListener('scroll', SceneUtil.scrollLoop);
      }
    }
  }
}

export default SceneUtil;