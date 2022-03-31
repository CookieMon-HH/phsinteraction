import React, { FC, useEffect } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinIndexPageSectionFrameStyle } from "../../styles/indexPage/IndexPageStyles";
import AnimationCalculator from "../../utils/AnimationCalculator";
import SpreadText from "../spreadText/SpreadText";
import { ZeroIndexPageSectionAnimation } from "./const/SectionAnimations";

const Frame = styled.section`
  canvas {
    position: sticky;
    top: 0;
  }
`;

const ZeroIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  const { opacityAnimationInOut } = AnimationCalculator;

  useEffect(() => {
    if(!onScene) return;
    if(!containerRef?.current) return;
    const spreadText = new SpreadText('AirMug Pro', containerRef.current);
    onScene.current = (_: number, ratio: number) => {
      opacityAnimation(ratio);
      let spread;
      if(ratio < 0.4) {
        spread = 0.4 - ratio;
      } else if (0.6 < ratio) {
        spread = ratio - 0.6;
      } else {
        spread = 0;
      }
      spreadText.spread(spread);
    };
  }, [onScene]);

  const opacityAnimation = (ratio: number) => {
    if(!containerRef?.current) return;
    const { zeroCanvasOpacityInOut } = ZeroIndexPageSectionAnimation;
    opacityAnimationInOut(containerRef.current, zeroCanvasOpacityInOut, ratio);
  }

  return (
    <Frame ref={containerRef}>
    </Frame>
  )
});

export default ZeroIndexPageSection;
