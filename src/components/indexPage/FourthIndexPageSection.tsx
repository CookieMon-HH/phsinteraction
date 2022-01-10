import { FC } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
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

const FourthIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef } = props;
  return (
    <Frame ref={containerRef}>
      <MidMessageP>
				<strong>Retina 머그</strong><br />
				아이디어를 광활하게 펼칠<br />
				아름답고 부드러운 음료 공간.
      </MidMessageP>
      <CanvasCaptionP>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni iure dolore ipsa vitae ea natus accusamus suscipit rem et maiores odio, dignissimos repellendus velit voluptatem, eaque rerum ex voluptates!
      </CanvasCaptionP>
    </Frame>
  )
});

export default FourthIndexPageSection;
