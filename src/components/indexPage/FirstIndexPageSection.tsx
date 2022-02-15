import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinStickyMessage, MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator, { IAnimaitonInOutProps } from "../../utils/AnimationCalculator";
import { SCENE_ACTIVE_CLASS_NAME } from "../../utils/SceneController";
import { FirstIndexPageSectionAnimation } from "./const/SectionAnimations";

const SticyElemMainMessageDiv = styled.div`
  ${MixinIndexPageMainMessageStyle};
  ${MixinStickyMessage};
  top: 35vh;
  opacity: 0;
`;

const CanvasFrame = styled.div`
  ${MixinStickyMessage};
  top: 0;
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    transform: translate3d(-50%, -50%, 0px) scale(0.730556);
    top: 50%;
    left: 50%;
  }
`;

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
  h1 {
    position: relative;
    top: -10vh;
    z-index: 5;
    font-size: 4rem;
    text-align: center;

    ${MixinMedia1024(`
      font-size: 9vw;    
    `)};
  }
  &.${SCENE_ACTIVE_CLASS_NAME} {
    ${SticyElemMainMessageDiv},
    ${CanvasFrame} {
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!onScene) return;
    const addCanvasAnimation = getAddCanvasAnimationFunction();
    onScene.current = (_: number, ratio: number) => {
      addMessageAnimations(ratio);
      addCanvasAnimation(ratio);
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

  const getAddCanvasAnimationFunction = () => {
    const imageCount = 300;
    const images: HTMLImageElement[] = [];
		for (let i = 0; i < imageCount; i++) {
			const imgElem = new Image();
			imgElem.src = `/assets/images/001/IMG_${6726 + i}.JPG`;
			images.push(imgElem);
		}
    return (ratio: number) => {
      if(!canvasRef.current) return;
      const { firstCanvasOpacityInOut } = FirstIndexPageSectionAnimation;
      const { opacityAnimationInOut, canvasPlay } = AnimationCalculator;
      opacityAnimationInOut(canvasRef.current, firstCanvasOpacityInOut, ratio);
      canvasPlay(canvasRef.current, images, ratio);
    };
  };

  return (
    <Frame ref={containerRef}>
      <h1>AirMug Pro</h1>
      <CanvasFrame>
        <canvas ref={canvasRef} width='1920' height='1080' />
      </CanvasFrame>
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
