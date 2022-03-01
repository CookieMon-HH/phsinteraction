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
  &.sticky {
    position: fixed;
  }
`;

const FourthIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  const firstCanvasBlendRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const image2Ref = useRef<HTMLImageElement>(new Image());
  const captionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(!onScene) return;
    const canvasStickyHandler = getCanvasStickyHandler();
    onScene.current = (yOffset: number, ratio: number) => {
      const scrollHeight = yOffset / ratio;
      addBaseCanvasAnimation(ratio, scrollHeight);
      canvasStickyHandler(ratio, scrollHeight);
    };
    setFirstCanvasImage();
  }, [onScene]);

  const getCanvasScaleRatio = (canvas: HTMLCanvasElement) => {
    const widthRatio = window.innerWidth / canvas.width;
    const heightRatio = window.innerHeight / canvas.height;
    let canvasScaleRatio;
    if(widthRatio <= heightRatio) {
      canvasScaleRatio = heightRatio;
    } else {
      canvasScaleRatio = widthRatio;
    }
    return canvasScaleRatio;
  };

  const addBaseCanvasAnimation = (ratio: number, scrollHeight: number) => {
    const canvasBlend = firstCanvasBlendRef.current;
    if(!canvasBlend) return;
    const canvasScaleRatio = getCanvasScaleRatio(canvasBlend);

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
      context.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect1X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerWidth);
      context.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect2X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerHeight);
    } else {
      imageRef.current.onload = () => {
        context.drawImage(imageRef.current, 0, 0);
        context.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect1X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerWidth);
        context.fillRect(Math.floor(AnimationCalculator.getValuePerRatio(rect2X, ratio)), 0, Math.floor(whiteRectWidth), recalculatedInnerHeight);
      }
    }
  };

  const setFirstCanvasImage = () => {
    imageRef.current.src = `/assets/images/blend-image-1.jpg`;
    image2Ref.current.src = `/assets/images/blend-image-2.jpg`;
    const isLowerCanvas = (firstCanvasBlendRef.current?.getBoundingClientRect().top || 1) > 0;
    if(isLowerCanvas) {
      imageRef.current.onload = () => {
        addBaseCanvasAnimation(0, containerRef?.current?.clientHeight || 0);
      };
    };
  };

  const getCanvasStickyHandler = () => {
    const canvasBlend = firstCanvasBlendRef.current;
    if(!canvasBlend) return (ratio: number, scrollHeight: number) => {};
    const { width, height, offsetTop } = canvasBlend;
    const canvasScaleRatio = getCanvasScaleRatio(canvasBlend);
    const canvasScaleTop = (height - (height * canvasScaleRatio)) / 2;
    const canvasStartY = offsetTop + canvasScaleTop;
    
    return (ratio: number, scrollHeight: number) => {
      const canvasRatio = canvasStartY / scrollHeight;
      if(ratio < canvasRatio) {
        canvasBlend.classList.remove('sticky');
      } else {
        const context = canvasBlend.getContext('2d');
        const blenAniProps: IAnimaitonProps = {
          from: 0,
          to: height,
          startRatio: canvasStartY / scrollHeight,
          endRatio: (canvasStartY / scrollHeight) + 0.2,
        };
        const blendHeight = AnimationCalculator.getValuePerRatio(blenAniProps, ratio);
        context?.drawImage(image2Ref.current,
          0, height - blendHeight, width, blendHeight,
          0, height - blendHeight, width, blendHeight
        );
        canvasBlend.classList.add('sticky');
        canvasBlend.style.top = `-${canvasScaleTop}px`;

        const blenScaleAniProps: IAnimaitonProps = {
          from: canvasScaleRatio,
          to: document.body.offsetWidth / (1.5 * width),
          startRatio: blenAniProps.endRatio,
          endRatio: blenAniProps.endRatio + 0.2,
        };

        if(blenAniProps.endRatio < ratio) {
          canvasBlend.style.transform = `scale(${AnimationCalculator.getValuePerRatio(blenScaleAniProps, ratio)})`;
          canvasBlend.style.marginTop = `0`;
        }
        if (0 < blenScaleAniProps.endRatio && blenScaleAniProps.endRatio < ratio) {
          canvasBlend.classList.remove('sticky');
          canvasBlend.style.marginTop = `${scrollHeight * 0.4}px`;

          const captionOpacityAniProps: IAnimaitonProps = {
            from: 0,
            to: 1,
            startRatio: blenScaleAniProps.endRatio,
            endRatio: blenScaleAniProps.endRatio + 0.1,
          };
          const captionTransformAniProps: IAnimaitonProps = {
            from: 20,
            to: 0,
            startRatio: captionOpacityAniProps.startRatio,
            endRatio: captionOpacityAniProps.endRatio,
          };
          if(captionRef.current) {
            captionRef.current.style.opacity = `${AnimationCalculator.getValuePerRatio(captionOpacityAniProps, ratio)}`;
            captionRef.current.style.transform = `translate3d(0, ${AnimationCalculator.getValuePerRatio(captionTransformAniProps, ratio)}%, 0)`;
          }
        } else {
          if(captionRef.current) {
            captionRef.current.style.opacity = '0';
          }
        }
      }
    };
  };

  return (
    <Frame ref={containerRef}>
      <MidMessageP>
				<strong>Retina 머그</strong><br />
				아이디어를 광활하게 펼칠<br />
				아름답고 부드러운 음료 공간.
      </MidMessageP>
      <CanvasImageBlend ref={firstCanvasBlendRef} width='1920' height='1080' />
      <CanvasCaptionP ref={captionRef}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, tempora fugit esse ut ea temporibus iusto nostrum quo, accusamus neque amet nihil voluptatum sint laboriosam velit placeat, repellendus autem. Cum tenetur unde repellat vero odio, error repellendus harum, accusantium laudantium labore illo molestias fuga animi voluptatum iste. Earum doloribus maxime ullam ipsum atque reprehenderit eaque facere inventore rem, dolorem debitis temporibus necessitatibus sed iste eum modi qui ea, sit consequatur distinctio delectus! Saepe, esse? Quae eos ea accusantium corporis nam, voluptas omnis ullam amet nobis alias! Illum quo officia aspernatur! Ullam quibusdam, quasi expedita rerum neque perspiciatis recusandae numquam dolore.
      </CanvasCaptionP>
    </Frame>
  )
});

export default FourthIndexPageSection;
