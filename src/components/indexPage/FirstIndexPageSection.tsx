import { FC } from "react";
import styled from "styled-components";
import { MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
  h1 {
    font-size: 4rem;
    text-align: center;

    ${MixinMedia1024(`
      font-size: 9vw;    
    `)};
  }

  
`;

const SticyElemMainMessageDiv = styled.div`
  ${MixinIndexPageMainMessageStyle};
`;

const FirstIndexPageSection: FC = (() => {
  return (
    <Frame>
      <h1>AirMug Pro</h1>
      <SticyElemMainMessageDiv>
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
