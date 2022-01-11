type SceneType = 'sticky' | 'normal';

interface IScene {
  type: SceneType;
  container: HTMLElement;
}

interface ISceneInfoObj {
  container: HTMLElement;
}

interface ISceneInfo {
  type: SceneType;
  heightNum: number;
  scrollHeight: number;
  obj : ISceneInfoObj;
}
export const ACTIVE_SCENE_CLASS_NAME = 'scene_active'
class SceneUtil {
  static sceneInfo: ISceneInfo[];
  private static activeSceneContainer: HTMLElement;
  
  constructor(data: IScene[]) {
    SceneUtil.sceneInfo = data.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      obj:{
        container : scene.container
      }
    }));
    SceneUtil.activeSceneContainer = SceneUtil.sceneInfo[0].obj.container;
    SceneUtil.activeSceneContainer.classList.add(ACTIVE_SCENE_CLASS_NAME);
    SceneUtil.setLayout();
  }
  
  static setLayout = () => {
    SceneUtil.sceneInfo.forEach((sceneInfo: ISceneInfo) => {
      sceneInfo.scrollHeight = sceneInfo.heightNum * window.innerHeight;
      sceneInfo.obj.container.style.height = `${sceneInfo.scrollHeight}px`;
    })
  }
  
  private static getCurrentSceneIndex = () => {
    const { pageYOffset } = window;
    const sceneLength = SceneUtil.sceneInfo.length;
    let scrollHeight = 0;
    for (let index = 0; index < sceneLength; index++) {
      if (pageYOffset < scrollHeight) {
        return index - 1;
      }
      scrollHeight += SceneUtil.sceneInfo[index].scrollHeight;
    }
    return sceneLength - 1;
  }
  
  private static scrollLoop = () => {
    const currentSceneIndex = SceneUtil.getCurrentSceneIndex();
    const nextActiveSceneContainer = SceneUtil.sceneInfo[currentSceneIndex].obj.container;
    if (SceneUtil.activeSceneContainer === nextActiveSceneContainer) return;
    console.log(SceneUtil.activeSceneContainer);
    SceneUtil.activeSceneContainer.classList.remove(ACTIVE_SCENE_CLASS_NAME);
    SceneUtil.activeSceneContainer = SceneUtil.sceneInfo[currentSceneIndex].obj.container;
    SceneUtil.activeSceneContainer.classList.add(ACTIVE_SCENE_CLASS_NAME);
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