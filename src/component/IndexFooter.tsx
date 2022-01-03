import { FC } from "react";
import styled from "styled-components";
import fonts from "../const/Font";

const Frame = styled.footer`
  display: flex;
  height: 7rem;
  align-items: center;
  justify-content: center;
  color: white;
  background: darkorange;
  ${fonts.REGULAR}
`;

const IndexPageFooter: FC = (() => {
  return (
    <Frame>
      2020, 1분 코딩
    </Frame>
  )
});

export default IndexPageFooter;