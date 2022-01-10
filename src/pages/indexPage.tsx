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
import SceneController from "../utils/SceneController";

const Frame = styled.div`
`;

const IndexPage: FC = () => {
  const firstIndexPageContainerRef = useRef<HTMLElement>(null);
  const secondIndexPageContainerRef = useRef<HTMLElement>(null);
  const thirdIndexPageContainerRef = useRef<HTMLElement>(null);
  const forthIndexPageContainerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const isInValidAllContainRef =  !firstIndexPageContainerRef.current ||
                                    !secondIndexPageContainerRef.current ||
                                    !thirdIndexPageContainerRef.current ||
                                    !forthIndexPageContainerRef.current
    if (isInValidAllContainRef) return;
    const sceneController = new SceneController({
      type: 'sticky',
      container: firstIndexPageContainerRef.current,
    }, {
      type: 'normal',
      container: secondIndexPageContainerRef.current,
    }, {
      type: 'sticky',
      container: thirdIndexPageContainerRef.current,
    }, {
      type: 'sticky',
      container: forthIndexPageContainerRef.current,
    });
    const resizeEvent = sceneController.addResizeLayoutHandler();
    return (() => {
      resizeEvent.dispose();
    })
  }, []);

  return (
    <Frame>
      <GlobalNavigation />
      <LocalNavigation />
      <FirstIndexPageSection containerRef={firstIndexPageContainerRef}/>
      <SecondIndexPageSection containerRef={secondIndexPageContainerRef} />
      <ThirdIndexPageSection containerRef={thirdIndexPageContainerRef}/>
      <FourthIndexPageSection containerRef={forthIndexPageContainerRef}/>
      <IndexPageFooter />
    </Frame>
  );
};

export default IndexPage;
