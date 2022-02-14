import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinStickyMessage, MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator, { IAnimaitonInOutProps, IAnimaitonProps } from "../../utils/AnimationCalculator";
import { SCENE_ACTIVE_CLASS_NAME } from "../../utils/SceneController";
import { FirstIndexPageSectionAnimation } from "./const/SectionAnimations";

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

const FirstIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const secondMessageRef = useRef<HTMLDivElement>(null);
  const thirdMessageRef = useRef<HTMLDivElement>(null);
  const forthMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!onScene) return;
    onScene.current = (_: number, ratio: number) => {
      addMessageAnimations(ratio);
    };
  }, [onScene]);

  const addMessageAnimations = (ratio: number) => {
    if(!firstMessageRef.current ||
      !secondMessageRef.current ||
      !thirdMessageRef.current ||
      !forthMessageRef.current) return;
    const { firstMessageAOpacityInOut, firstMessageATranslateYInOut,
            firstMessageBOpacityInOut, firstMessageBTranslateYInOut,
            firstMessageCOpacityInOut, firstMessageCTranslateYInOut,
            firstMessageDOpacityInOut, firstMessageDTranslateYInOut } = FirstIndexPageSectionAnimation;
    const { opacityAnimationInOut, translateYAnimationInOut } = AnimationCalculator;
    const aniArr: [HTMLDivElement, IAnimaitonInOutProps, IAnimaitonInOutProps][] = [
      [firstMessageRef.current, firstMessageAOpacityInOut, firstMessageATranslateYInOut],
      [secondMessageRef.current, firstMessageBOpacityInOut, firstMessageBTranslateYInOut],
      [thirdMessageRef.current, firstMessageCOpacityInOut, firstMessageCTranslateYInOut],
      [forthMessageRef.current, firstMessageDOpacityInOut, firstMessageDTranslateYInOut],
    ];
    for(const ani of aniArr) {
      const [current, opacity, translate] = ani;
      opacityAnimationInOut(current, opacity, ratio);
      translateYAnimationInOut(current, translate, ratio);
    };
  };

  return (
    <Frame ref={containerRef}>
      <h1>AirMug Pro</h1>
      <SticyElemMainMessageDiv ref={firstMessageRef}>
        <p>온전히 빠져들게 하는<br />최고급 세라믹</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv ref={secondMessageRef}>
        <p>주변 맛을 느끼게 해주는<br />주변 맛 허용 모드</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv ref={thirdMessageRef}>
        <p>온종일 편안한<br />맞춤형 손잡이</p>
      </SticyElemMainMessageDiv>
      <SticyElemMainMessageDiv ref={forthMessageRef}>
        <p>새롭게 입가를<br />찾아온 매혹</p>
      </SticyElemMainMessageDiv>
    </Frame>
  )
});

export default FirstIndexPageSection;
