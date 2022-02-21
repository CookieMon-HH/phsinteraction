import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator, { IAnimaitonProps } from "../../utils/AnimationCalculator";

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MidMessageP = styled.p`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 2rem;
  color: #888;
  strong {
    color: rgb(29, 29, 31);
  }

  ${MixinMedia1024(`
    font-size: 4vw;
  `)};
`;

const CanvasCaptionP = styled.p`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: #888;

  ${MixinMedia1024(`
    font-size: 2rem;
  `)};
`;

const CanvasImageBlend = styled.canvas`
  border: 3px solid red;

`;

const FourthIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  const firstCanvasBlendRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  
  useEffect(() => {
    if(!onScene) return;
    onScene.current = (yOffset: number, ratio: number) => {
      const scrollHeight = yOffset / ratio;
      addCanvasBlenAnimation(ratio, scrollHeight);
    };
    setFirstCanvasImage();
  }, [onScene]);

  const addCanvasBlenAnimation = (ratio: number, scrollHeight: number) => {
    const canvasBlend = firstCanvasBlendRef.current;
    if(!canvasBlend) return;
    const widthRatio = window.innerWidth / canvasBlend.width;
    const heightRatio = window.innerHeight / canvasBlend.height;
    let canvasScaleRatio;
    if(widthRatio <= heightRatio) {
      canvasScaleRatio = heightRatio;
    } else {
      canvasScaleRatio = widthRatio;
    }

    const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

    const whiteRectWidth = recalculatedInnerWidth * 0.15;
    const rect1X: IAnimaitonProps = { from: 0, to: 0, startRatio: 0, endRatio: 0 };
    const rect2X: IAnimaitonProps = { from: 0, to: 0, startRatio: 0, endRatio: 0 };
    
    const rectStartY = canvasBlend.offsetTop + (canvasBlend.height - canvasBlend.height * canvasScaleRatio) / 2;
    rect1X.startRatio = (window.innerHeight / 2) / scrollHeight;
    rect2X.startRatio = (window.innerHeight / 2) / scrollHeight;
    rect1X.endRatio = rectStartY / scrollHeight;
    rect2X.endRatio = rectStartY / scrollHeight;

    rect1X.from = (canvasBlend.width - recalculatedInnerWidth) / 2;
    rect1X.to = rect1X.from - whiteRectWidth;
    rect2X.from = rect1X.from + recalculatedInnerWidth - whiteRectWidth;
    rect2X.to = rect2X.from + whiteRectWidth;
    
    const context = canvasBlend.getContext('2d');
    canvasBlend.style.transform = `scale(${canvasScaleRatio})`;
    if(!context) return
    context.fillStyle = 'white';
    if(imageRef.current.complete) {
      context.drawImage(imageRef.current, 0, 0);
    }
    context?.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect1X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerWidth);
    context?.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect2X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerHeight);
  };

  const setFirstCanvasImage = () => {
    imageRef.current.src = `/assets/images/blend-image-1.jpg`;
    console.log('??!');
    imageRef.current.onload = () => {
      if(!firstCanvasBlendRef.current) return;
      firstCanvasBlendRef.current.getContext('2d')?.drawImage(imageRef.current, 0, 0);
    }
  };

  return (
    <Frame ref={containerRef}>
      <MidMessageP>
				<strong>Retina 머그</strong><br />
				아이디어를 광활하게 펼칠<br />
				아름답고 부드러운 음료 공간.
      </MidMessageP>
      <CanvasImageBlend ref={firstCanvasBlendRef} width='1920' height='1080'>

      </CanvasImageBlend>
      <CanvasCaptionP>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni iure dolore ipsa vitae ea natus accusamus suscipit rem et maiores odio, dignissimos repellendus velit voluptatem, eaque rerum ex voluptates!
      </CanvasCaptionP>
    </Frame>
  )
});

export default FourthIndexPageSection;
