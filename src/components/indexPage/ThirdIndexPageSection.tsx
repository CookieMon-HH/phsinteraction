import { FC } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
import { MixinStickyMessage, MixinIndexPageMainMessageStyle, MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";
import { SCENE_ACTIVE_CLASS_NAME } from "../../utils/SceneController";

const SticyElemMainMessageDiv = styled.div`
  ${MixinIndexPageMainMessageStyle};
  ${MixinStickyMessage};

  font-size: 3.5rem;

  ${MixinMedia1024(`
    font-size: 6vw;
  `)};
`;

const SticyElemDescriptionMessageDiv = styled.div`
  font-weight: bold;
  width: 50%;

  ${MixinStickyMessage};
  ${MixinMedia1024(`
    width: 20%;
  `)};
`;

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};

  &.${SCENE_ACTIVE_CLASS_NAME} {
    ${SticyElemMainMessageDiv},
    ${SticyElemDescriptionMessageDiv} {
      display: block;
    }
  }
`;

const PinDiv = styled.div`
  width: 1px;
  height: 100px;
  backgroud: rgb(29, 29, 31);
`;

const ThirdIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef } = props;
  return (
    <Frame ref={containerRef}>
      <SticyElemMainMessageDiv>
        <p>
          <small>편안한 촉감</small>  
          입과 하나 되다
        </p>
      </SticyElemMainMessageDiv>
      <SticyElemDescriptionMessageDiv>
        <p>
					편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
        </p>
      </SticyElemDescriptionMessageDiv>
      <SticyElemDescriptionMessageDiv>
					디자인 앤 퀄리티 오브 스웨덴,<br />메이드 인 차이나
      </SticyElemDescriptionMessageDiv>
      <PinDiv />
    </Frame>
  )
});

export default ThirdIndexPageSection;
