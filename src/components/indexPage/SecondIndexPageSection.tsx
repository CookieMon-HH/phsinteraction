import { FC } from "react";
import styled from "styled-components";
import { MixinIndexPageSectionFrameStyle, MixinMedia1024 } from "../../styles/indexPage/IndexPageStyles";

const Frame = styled.section`
  ${MixinIndexPageSectionFrameStyle};
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

  
  ${MixinMedia1024(`
		padding: 0;
		font-size: 2rem;
    strong {
      font-size: 6rem;
    }
  `)};
`;

const SecondIndexPageSection: FC = (() => {
  return (
    <Frame>
      <DescriptionP>
        <strong>보통 스크롤 영역</strong>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit optio impedit qui quam, error quidem quis vero! Sit eaque doloremque sunt cum? Impedit id sequi cupiditate at accusamus architecto eveniet.
      </DescriptionP>
    </Frame>
  )
});

export default SecondIndexPageSection;