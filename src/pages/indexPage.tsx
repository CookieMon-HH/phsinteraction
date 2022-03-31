import { useEffect } from "react";
import { useRef } from "react";
import { FC } from "react";
import styled from "styled-components";
import GlobalNavigation from "../components/common/GlobalNavigation";
import LocalNavigation from "../components/common/LocalNavigation";
import ZeroIndexPageSection from "../components/indexPage/ZeroIndexPageSection";
import FirstIndexPageSection from "../components/indexPage/FirstIndexPageSection";
import FourthIndexPageSection from "../components/indexPage/FourthIndexPageSection";
import IndexPageFooter from "../components/indexPage/IndexPageFooter";
import SecondIndexPageSection from "../components/indexPage/SecondIndexPageSection";
import ThirdIndexPageSection from "../components/indexPage/ThirdIndexPageSection";
import SceneController, { SceneFunction } from "../utils/SceneController";

const Frame = styled.div`
`;

const IndexPage: FC = () => {
  const zeroIndexPageContainerRef = useRef<HTMLElement>(null);
  const firstIndexPageContainerRef = useRef<HTMLElement>(null);
  const firstIndexPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const secondIndexPageContainerRef = useRef<HTMLElement>(null);
  const thirdIndexPageContainerRef = useRef<HTMLElement>(null);
  const thirdIndexPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const forthIndexPageContainerRef = useRef<HTMLElement>(null);
  
  const onZeroSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onFirstSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onSecondSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onThirdSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onForthSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();

  useEffect(() => {
    const isInValidAllContainRef =  !zeroIndexPageContainerRef.current ||
                                    !firstIndexPageContainerRef.current ||
                                    !secondIndexPageContainerRef.current ||
                                    !thirdIndexPageContainerRef.current ||
                                    !forthIndexPageContainerRef.current;

    const isInValidAllSceneHandlerRef =  !onZeroSceneHandler.current ||
                                          !onFirstSceneHandler.current ||
                                          !onSecondSceneHandler.current ||
                                          !onThirdSceneHandler.current ||
                                          !onForthSceneHandler.current;

    const isInValidAllCanvasRef = !firstIndexPageCanvasRef.current ||
                                  !thirdIndexPageCanvasRef.current;
    if (isInValidAllContainRef) return;
    if (isInValidAllSceneHandlerRef) return;
    if (isInValidAllCanvasRef) return;
    const sceneController = new SceneController({
      type: 'sticky',
      container: zeroIndexPageContainerRef.current,
      onScene: onZeroSceneHandler.current,
    },{
      type: 'sticky',
      container: firstIndexPageContainerRef.current,
      canvas: firstIndexPageCanvasRef.current,
      onScene: onFirstSceneHandler.current,
    }, {
      type: 'normal',
      scale: 1,
      container: secondIndexPageContainerRef.current,
      onScene: onSecondSceneHandler.current,
    }, {
      type: 'sticky',
      container: thirdIndexPageContainerRef.current,
      canvas: thirdIndexPageCanvasRef.current,
      onScene: onThirdSceneHandler.current,
    }, {
      type: 'sticky',
      container: forthIndexPageContainerRef.current,
      onScene: onForthSceneHandler.current,
    });
    const resizeEvent = sceneController.addResizeLayoutEvent();
    const scrollEvent = sceneController.addScrollLoopEvent();
    return (() => {
      resizeEvent.dispose();
      scrollEvent.dispose();
    })
  }, []);

  return (
    <Frame>
      <GlobalNavigation />
      <LocalNavigation />
      <ZeroIndexPageSection 
        containerRef={zeroIndexPageContainerRef}
        onScene={onZeroSceneHandler}
      />
      <FirstIndexPageSection
        containerRef={firstIndexPageContainerRef}
        canvasRef={firstIndexPageCanvasRef}
        onScene={onFirstSceneHandler}
      />
      <SecondIndexPageSection
        containerRef={secondIndexPageContainerRef}
        onScene={onSecondSceneHandler}
      />
      <ThirdIndexPageSection
        containerRef={thirdIndexPageContainerRef}
        canvasRef={thirdIndexPageCanvasRef}
        onScene={onThirdSceneHandler}
      />
      <FourthIndexPageSection
        containerRef={forthIndexPageContainerRef}
        onScene={onForthSceneHandler}
      />
      <IndexPageFooter />
    </Frame>
  );
};

export default IndexPage;
