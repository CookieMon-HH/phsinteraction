import { useEffect } from "react";
import { useRef } from "react";
import { FC } from "react";
import styled from "styled-components";
import GlobalNavigation from "../components/common/GlobalNavigation";
import LocalNavigation from "../components/common/LocalNavigation";
import FirstIndexPageSection from "../components/indexPage/FirstIndexPageSection";
import FourthIndexPageSection from "../components/indexPage/FourthIndexPageSection";
import IndexPageFooter from "../components/indexPage/IndexPageFooter";
import SecondIndexPageSection from "../components/indexPage/SecondIndexPageSection";
import ThirdIndexPageSection from "../components/indexPage/ThirdIndexPageSection";
import SceneController, { SceneFunction } from "../utils/SceneController";

const Frame = styled.div`
`;

const IndexPage: FC = () => {
  const firstIndexPageContainerRef = useRef<HTMLElement>(null);
  const secondIndexPageContainerRef = useRef<HTMLElement>(null);
  const thirdIndexPageContainerRef = useRef<HTMLElement>(null);
  const forthIndexPageContainerRef = useRef<HTMLElement>(null);
  
  const onFirstSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onSecondSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onThirdSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();
  const onForthSceneHandler: React.MutableRefObject<SceneFunction | undefined> = useRef<SceneFunction | undefined>();

  useEffect(() => {
    const isInValidAllContainRef =  !firstIndexPageContainerRef.current ||
                                    !secondIndexPageContainerRef.current ||
                                    !thirdIndexPageContainerRef.current ||
                                    !forthIndexPageContainerRef.current

    const isInValidAllSceneHandlerRef =  !onFirstSceneHandler.current ||
                                          !onSecondSceneHandler.current ||
                                          !onThirdSceneHandler.current ||
                                          !onForthSceneHandler.current
    if (isInValidAllContainRef) return;
    if (isInValidAllSceneHandlerRef) return;
    const sceneController = new SceneController({
      type: 'sticky',
      container: firstIndexPageContainerRef.current,
      onScene: onFirstSceneHandler.current,
    }, {
      type: 'normal',
      container: secondIndexPageContainerRef.current,
      onScene: onSecondSceneHandler.current,
    }, {
      type: 'sticky',
      container: thirdIndexPageContainerRef.current,
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
      <FirstIndexPageSection
        containerRef={firstIndexPageContainerRef}
        onScene={onFirstSceneHandler}
      />
      <SecondIndexPageSection
        containerRef={secondIndexPageContainerRef}
        onScene={onSecondSceneHandler}
      />
      <ThirdIndexPageSection
        containerRef={thirdIndexPageContainerRef}
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
