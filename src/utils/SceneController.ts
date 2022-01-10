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

class SceneController {
  sceneInfos: ISceneInfo[];

  constructor(...scenes: IScene[]) {
    this.sceneInfos = scenes.map((scene: IScene) => ({
      type: scene.type,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: scene.container,
      }
    }));
    this.setLayout();
  }

  private setLayout = () => {
    this.sceneInfos.forEach((sceneInfo: ISceneInfo) => {
      sceneInfo.scrollHeight = sceneInfo.heightNum * window.innerHeight;
      sceneInfo.objs.container.style.height = `${sceneInfo.scrollHeight}px`;
    })
  }

  addResizeLayoutHandler = () => {
    window.addEventListener('resize', this.setLayout);
    return {
      dispose: () => {
        window.removeEventListener('resize', this.setLayout);
      }
    }
  }
}

export default SceneController;
