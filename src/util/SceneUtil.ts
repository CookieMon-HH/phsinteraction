type SceneType = 'sticky' | 'normal';

interface IScene {
  type: SceneType;
  container: HTMLElement;
  messageGroup?: IMessageGroup;
  canvas? : HTMLCanvasElement;
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

interface ICanvasImgSeq extends IOpacity {};

interface ISceneInfoObj {
  container: HTMLElement;
  messageGroup?: IMessageGroup;
  canvas?: HTMLCanvasElement;
  canvasSequence? : ICanvasImgSeq;
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
  
  constructor(data: IScene[]) {
    SceneUtil.sceneInfo = data.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      obj: {
        container: scene.container,
        messageGroup: scene.messageGroup,
        canvas : scene.canvas,
        canvasSequence : {
          range : [0, 1],
          startRatio : 0,
          endRatio : 1
        }
      }
    }));
    SceneUtil.currentActiveScene = SceneUtil.sceneInfo[0].obj.container;
    SceneUtil.currentActiveScene.classList.add(ACTIVE_SCENE_CLASS_NAME);
    SceneUtil.setLayout();
    SceneUtil.setCanvasImages();
  }
  
  static setLayout = () => {
    SceneUtil.sceneInfo.forEach((sceneInfo: ISceneInfo) => {
      sceneInfo.scrollHeight = sceneInfo.heightNum * window.innerHeight;
      sceneInfo.obj.container.style.height = `${sceneInfo.scrollHeight}px`;
    })
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
    for(let i = 0; i < 300; ++i) {
      const imgElem = new Image();
      imgElem.src = `/assets/images/001/IMG_${6726 + i}.JPG`;
      SceneUtil.firstSceneImages.push(imgElem);
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
        if(!context) return;
        const seq = Math.round(SceneUtil.calcValues(firstCanvasSeq, pageYOffset) * 300) | 0;
        context.drawImage(SceneUtil.firstSceneImages[seq], 0, 0);
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
        if (thirdGroup === undefined) return;
        const prev = pageYOffset - 13660;
        const thirdGroupRatio = (prev) / SceneUtil.currentActiveScene.scrollHeight;
        thirdGroup.messageA.message.style.opacity = thirdGroupRatio <= 0.32 ? SceneUtil.calcValues(thirdGroup.messageA.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageA.opacityOut, prev).toString();
        thirdGroup.messageB.message.style.opacity = thirdGroupRatio <= 0.62 ? SceneUtil.calcValues(thirdGroup.messageB.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageB.opacityOut, prev).toString();
        thirdGroup.messageC.message.style.opacity = thirdGroupRatio <= 0.92 ? SceneUtil.calcValues(thirdGroup.messageC.opacityIn, prev).toString() : SceneUtil.calcValues(thirdGroup.messageC.opacityOut, prev).toString();
        
        thirdGroup.messageA.message.style.transform = thirdGroupRatio <= 0.32 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageA.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageA.translateOut, prev)}%)`;
        thirdGroup.messageB.message.style.transform = thirdGroupRatio <= 0.62 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageB.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageB.translateOut, prev)}%)`;
        thirdGroup.messageC.message.style.transform = thirdGroupRatio <= 0.92 ? `translateY(${SceneUtil.calcValues(thirdGroup.messageC.translateIn, prev)}%)` : `translateY(${SceneUtil.calcValues(thirdGroup.messageC.translateOut, prev)}%)`;
        return;
      case 3:
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