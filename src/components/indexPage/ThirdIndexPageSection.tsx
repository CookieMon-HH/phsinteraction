import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinStickyMessage, MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator, { IAnimaitonInOutProps } from "../../utils/AnimationCalculator";
import { SCENE_ACTIVE_CLASS_NAME } from "../../utils/SceneController";
import { ThirdIndexPageSectionAnimation } from "./const/SectionAnimations";

const SticyElemMainMessageDiv = styled.div`
  ${MixinIndexPageMainMessageStyle};
  ${MixinStickyMessage};

  font-size: 3.5rem;
  top: 35vh;

  ${MixinMedia1024(`
    font-size: 6vw;
  `)};
`;

const SticyElemDescriptionMessageDiv = styled.div`
  font-weight: bold;
  width: 50%;

  &.b {
    top: 10%;
    left: 40%;
  }

  &.c {
    top: 15%;
    left: 45%;
  }

  ${MixinStickyMessage};
  ${MixinMedia1024(`
    width: 20%;
    &.b {
      top: 20%;
      left: 53%;
    }

    &.c {
      left: 55%;
    }
  `)};
`;

const CanvasFrame = styled.div`
  ${MixinStickyMessage};
  top: 0;
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};

  &.${SCENE_ACTIVE_CLASS_NAME} {
    ${SticyElemMainMessageDiv},
    ${SticyElemDescriptionMessageDiv},
    ${CanvasFrame} {
      display: block;
    }
  }
`;

const _Pin = styled.div`
  width: 1px;
  height: 100px;
  background: rgb(29, 29, 31);
`;

const ThirdIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, canvasRef, onScene } = props;
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const secondMessageRef = useRef<HTMLDivElement>(null);
  const thirdMessageRef = useRef<HTMLDivElement>(null);

  const firstPinRef = useRef<HTMLDivElement>(null);
  const secondPinRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(!onScene) return;
    const addCanvasAnimation = getAddCanvasAnimationFunction();
    onScene.current = (_: number, ratio: number) => {
      addMessageAnimations(ratio);
      addPinAnimations(ratio);
      addCanvasAnimation(ratio);
    };
  }, [onScene]);

  const addMessageAnimations = (ratio: number) => {
    if(!firstMessageRef.current ||
      !secondMessageRef.current ||
      !thirdMessageRef.current) return;
    const { thirdMessageAOpacityInOut, thirdMessageATranslateYInOut,
            thirdMessageBOpacityInOut, thirdMessageBTranslateYInOut,
            thirdMessageCOpacityInOut, thirdMessageCTranslateYInOut } = ThirdIndexPageSectionAnimation;
    const { opacityAnimationInOut, translateYAnimationInOut } = AnimationCalculator;
    const aniArr: [HTMLDivElement, IAnimaitonInOutProps, IAnimaitonInOutProps][] = [
      [firstMessageRef.current, thirdMessageAOpacityInOut, thirdMessageATranslateYInOut],
      [secondMessageRef.current, thirdMessageBOpacityInOut, thirdMessageBTranslateYInOut],
      [thirdMessageRef.current, thirdMessageCOpacityInOut, thirdMessageCTranslateYInOut],
    ];
    for(const ani of aniArr) {
      const [current, opacity, translate] = ani;
      opacityAnimationInOut(current, opacity, ratio);
      translateYAnimationInOut(current, translate, ratio);
    };
  };

  const addPinAnimations = (ratio: number) => {
    if(!firstPinRef.current ||
      !secondPinRef.current) return;
    const { thirdPinBOpacityInOut, thirdPinBScaleYInOut,
            thirdPinCOpacityInOut, thirdPinCScaleYInOut } = ThirdIndexPageSectionAnimation;
    const { opacityAnimationInOut, scaleYAnimationInOut } = AnimationCalculator;
    const aniArr: [HTMLDivElement, IAnimaitonInOutProps, IAnimaitonInOutProps][] = [
      [firstPinRef.current, thirdPinBOpacityInOut, thirdPinBScaleYInOut],
      [secondPinRef.current, thirdPinCOpacityInOut, thirdPinCScaleYInOut],
    ];
    for(const ani of aniArr) {
      const [current, opacity, scaleY] = ani;
      opacityAnimationInOut(current, opacity, ratio);
      scaleYAnimationInOut(current, scaleY, ratio);
    };
  };

  const getAddCanvasAnimationFunction = () => {
    const imageCount = 960;
    const images: HTMLImageElement[] = [];
		for (let i = 0; i < imageCount; i++) {
			const imgElem = new Image();
			imgElem.src = `/assets/images/002/IMG_${7027 + i}.JPG`;
			images.push(imgElem);
		}
    return (ratio: number) => {
      if(!canvasRef?.current) return;
      const { thirdCanvasOpacityInOut } = ThirdIndexPageSectionAnimation;
      const { opacityAnimationInOut, canvasPlay } = AnimationCalculator;
      opacityAnimationInOut(canvasRef.current, thirdCanvasOpacityInOut, ratio);
      canvasPlay(canvasRef.current, images, ratio);
    };
  };

  return (
    <Frame ref={containerRef}>
      <CanvasFrame>
        <canvas ref={canvasRef} width='1920' height='1080' />
      </CanvasFrame>
      <SticyElemMainMessageDiv ref={firstMessageRef}>
        <p>
          <small>편안한 촉감</small>  
          입과 하나 되다
        </p>
      </SticyElemMainMessageDiv>
      <SticyElemDescriptionMessageDiv className='b' ref={secondMessageRef}>
        <p>
					편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
        </p>
        <_Pin ref={firstPinRef} />
      </SticyElemDescriptionMessageDiv>
      <SticyElemDescriptionMessageDiv className='c' ref={thirdMessageRef}>
        디자인 앤 퀄리티 오브 스웨덴,<br />메이드 인 차이나
        <_Pin ref={secondPinRef} />
      </SticyElemDescriptionMessageDiv>
    </Frame>
  )
});

export default ThirdIndexPageSection;
