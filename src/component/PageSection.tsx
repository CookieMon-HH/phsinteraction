import {FC} from "react";
import styled from "styled-components";
import fonts from "../const/Font";

const Frame = styled.section`
  adding-top: 50vh;
  ${fonts.REGULAR}
  h1 {
    font-size: 4rem;
    text-align: center;
    
    @media (min-width: 1024px) {
      font-size: 9vw;
    }
  }
`;

const ElementMainMessageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  height: 3em;
  font-size: 2.5rem;
  p {
    ${fonts.BOLD}
    text-align: center;
    line-height: 1.2;
  }

  small {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;

    small {
      font-size: 1.5vw;
    }
  };
  
  &.another {
    font-size: 3.5rem;

    @media (min-width: 1024px) {
      font-size: 6vw;
    };
  }
`;

const DescriptionP = styled.p`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: #888;

  strong {
    float: left;
    margin-right: 0.2em;
    font-size: 3rem;
    color: rgb(29, 29, 31);
  }
  
   @media (min-width: 1024px) {
        padding: 0;
        font-size: 2rem;
    strong {
      font-size: 6rem;
    }
  };
  
`;

const SticyElemDescriptionMessageDiv = styled.div`
  ${fonts.BOLD}
  width: 50%;

  @media (min-width: 1024px) {
    width: 20%;
  };
`;

const PinDiv = styled.div`
  width: 1px;
  height: 100px;
  backgroud: rgb(29, 29, 31);
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

  @media (min-width: 1024px) {
    font-size: 4vw;
  };
`;

const CanvasCaptionP = styled.p`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: #888;

   @media (min-width: 1024px) {
    font-size: 2rem;
  };
`;

const PageSection: FC = (() => {
  return (
    <Frame>
      <h1>AirMug Pro</h1>
      <ElementMainMessageDiv>
        <p>온전히 빠져들게 하는<br/>최고급 세라믹</p>
      </ElementMainMessageDiv>
      <ElementMainMessageDiv>
        <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
      </ElementMainMessageDiv>
      <ElementMainMessageDiv>
        <p>온종일 편안한<br/>맞춤형 손잡이</p>
      </ElementMainMessageDiv>
      <ElementMainMessageDiv>
        <p>새롭게 입가를<br/>찾아온 매혹</p>
      </ElementMainMessageDiv>
      <DescriptionP>
        <strong>보통 스크롤 영역</strong>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit optio impedit qui quam, error quidem quis vero!
        Sit eaque doloremque sunt cum? Impedit id sequi cupiditate at accusamus architecto eveniet.
      </DescriptionP>
      <ElementMainMessageDiv className={'another'}>
        <p>
          <small>편안한 촉감</small>
          입과 하나 되다
        </p>
      </ElementMainMessageDiv>
      <SticyElemDescriptionMessageDiv>
        <p>
          편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은
          어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
        </p>
      </SticyElemDescriptionMessageDiv>
      <SticyElemDescriptionMessageDiv>
        디자인 앤 퀄리티 오브 스웨덴,<br/>메이드 인 차이나
      </SticyElemDescriptionMessageDiv>
      <PinDiv/>
      <MidMessageP>
        <strong>Retina 머그</strong><br/>
        아이디어를 광활하게 펼칠<br/>
        아름답고 부드러운 음료 공간.
      </MidMessageP>
      <CanvasCaptionP>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni iure dolore ipsa vitae ea natus accusamus
        suscipit rem et maiores odio, dignissimos repellendus velit voluptatem, eaque rerum ex voluptates!
      </CanvasCaptionP>
    </Frame>
  )
});


export default PageSection;