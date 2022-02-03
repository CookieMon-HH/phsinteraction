import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinStickyMessage, MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator, { IAnimaitonInOutProps, IAnimaitonProps } from "../../utils/AnimationCalculator";
import { SCENE_ACTIVE_CLASS_NAME } from "../../utils/SceneController";

const SticyElemMainMessageDiv = styled.div`
  ${MixinIndexPageMainMessageStyle};
  ${MixinStickyMessage};
  top: 35vh;
  opacity: 0;
`;

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
  h1 {
    font-size: 4rem;
    text-align: center;

    ${MixinMedia1024(`
      font-size: 9vw;    
    `)};
  }
  &.${SCENE_ACTIVE_CLASS_NAME} {
    ${SticyElemMainMessageDiv} {
      display: block;
    }
  }
`;

const firstMessageOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.1, endRatio: 0.2 };
const firstMessageOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.25, endRatio: 0.3 };
const firstMessageOpacityInOut: IAnimaitonInOutProps = { in: firstMessageOpacityIn, out: firstMessageOpacityOut, turningRatio: 0.225 };

const firstMessageTranslateYIn: IAnimaitonProps = { from: 20, to: 1, startRatio: 0.1, endRatio: 0.2 };
const firstMessageTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.25, endRatio: 0.3 };
const firstMessageTranslateYInOut: IAnimaitonInOutProps = { in: firstMessageTranslateYIn, out: firstMessageTranslateYOut, turningRatio: 0.225 };

const FirstIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  const firstMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(!onScene) return;
    onScene.current = (yOffset: number, ratio: number) => {
      firstMessageAnimation(ratio);
    };
  }, [onScene]);

  const firstMessageAnimation = (ratio: number) => {
    if(!firstMessageRef.current) return;
    const { opacityAnimationInOut, translateYAnimationInOut } = AnimationCalculator;
    opacityAnimationInOut(firstMessageRef.current, firstMessageOpacityInOut, ratio);
    translateYAnimationInOut(firstMessageRef.current, firstMessageTranslateYInOut, ratio);
  };

  return (
    <Frame ref={containerRef}>
      <h1>AirMug Pro</h1>
      <SticyElemMainMessageDiv ref={firstMessageRef}>
        <p>온전히 빠져들게 하는<br />최고급 세라믹</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv>
        <p>주변 맛을 느끼게 해주는<br />주변 맛 허용 모드</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv>
        <p>온종일 편안한<br />맞춤형 손잡이</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv>
        <p>새롭게 입가를<br />찾아온 매혹</p>
      </SticyElemMainMessageDiv>
    </Frame>
  )
});

export default FirstIndexPageSection;
