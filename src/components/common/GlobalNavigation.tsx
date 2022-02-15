import React, { FC } from "react";
import styled from "styled-components";

const Frame = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height : 44px;
  padding: 0 1rem;
	z-index: 10;
`;

const LinksFrameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
`;

const LinkA = styled.a`
  font-size: 0.8rem;
`;

const GlobalNavigation: FC = () => {
  return (
    <Frame>
      <LinksFrameDiv>
        <LinkA href="#">Rooms</LinkA>
        <LinkA href="#">Ideas</LinkA>
        <LinkA href="#">Stores</LinkA>
        <LinkA href="#">Contact</LinkA>
      </LinksFrameDiv>
    </Frame>
  );
};

export default GlobalNavigation;
