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
  private static currentActiveScene: HTMLElement;
  
  constructor(data: IScene[]) {
    SceneUtil.sceneInfo = data.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      obj:{
        container : scene.container
      }
    }));
    SceneUtil.currentActiveScene = SceneUtil.sceneInfo[0].obj.container;
    SceneUtil.currentActiveScene.classList.add(ACTIVE_SCENE_CLASS_NAME);
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
    let prevScrollHeight = 0;
    for (let index = 0; index < sceneLength; index++) {
      if (pageYOffset < prevScrollHeight) {
        return index - 1;
      }
      prevScrollHeight += SceneUtil.sceneInfo[index].scrollHeight;
    }
    return sceneLength - 1;
  }
  
  private static scrollLoop = () => {
    const currentSceneIndex = SceneUtil.getCurrentSceneIndex();
    if(currentSceneIndex < 0) return;
    const nextScene = SceneUtil.sceneInfo[currentSceneIndex].obj.container;
    if (SceneUtil.currentActiveScene === nextScene) return;
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