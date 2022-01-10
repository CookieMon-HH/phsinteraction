type SceneType = 'sticky' | 'normal';

interface IScene {
  type: SceneType;
  container: HTMLElement;
}

interface ISceneObjs {
  container: HTMLElement;
}

interface ISceneInfo {
  type: SceneType;
  heightNum: number;
  scrollHeight: number;
  objs: ISceneObjs;
}

export const SCENE_ACTIVE_CLASS_NAME = 'active';

class SceneController {
  private activeSceneContainer: HTMLElement;
  private sceneInfos: ISceneInfo[];

  constructor(...scenes: IScene[]) {
    this.sceneInfos = scenes.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: scene.container,
      }
    }));
    this.activeSceneContainer = this.sceneInfos[0].objs.container;
    this.activeSceneContainer.classList.add(SCENE_ACTIVE_CLASS_NAME);
    this.setLayout();
  }

  private setLayout = () => {
    this.sceneInfos.forEach((sceneInfo: ISceneInfo) => {
      sceneInfo.scrollHeight = sceneInfo.heightNum * window.innerHeight;
      sceneInfo.objs.container.style.height = `${sceneInfo.scrollHeight}px`;
    })
  }

  private getCurrentSceneIndex = () => {
    const { pageYOffset } = window;
    const sceneInfosLength = this.sceneInfos.length;
    let _scrollHeight = 0;
    for (let index = 0; index < sceneInfosLength; index++) {
      if (pageYOffset < _scrollHeight) {
        return index - 1;
      }
      _scrollHeight += this.sceneInfos[index].scrollHeight;
    }
    return sceneInfosLength - 1;
  }

  private scrollLoop = () => {
    const currentSceneIndex = this.getCurrentSceneIndex();
    const nextActiveSceneContainer = this.sceneInfos[currentSceneIndex].objs.container;
    if (this.activeSceneContainer === nextActiveSceneContainer) return;
    this.activeSceneContainer.classList.remove(SCENE_ACTIVE_CLASS_NAME);
    this.activeSceneContainer = this.sceneInfos[currentSceneIndex].objs.container;
    this.activeSceneContainer.classList.add(SCENE_ACTIVE_CLASS_NAME);
  }

  addResizeLayoutEvent = () => {
    this.setLayout();
    window.addEventListener('resize', this.setLayout);
    return {
      dispose: () => {
        window.removeEventListener('resize', this.setLayout);
      }
    }
  }

  addScrollLoopEvent = () => {
    this.scrollLoop();
    window.addEventListener('scroll', this.scrollLoop);
    return {
      dispose: () => {
        window.removeEventListener('scroll', this.scrollLoop);
      }
    }
  }
}

export default SceneController;
