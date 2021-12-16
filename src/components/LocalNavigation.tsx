import React, { FC } from "react";
import styled from "styled-components";

const Frame = styled.nav`
  height: 52px;
  border-bottom: 1px solid #ddd;
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
  margin-left: 2em;
`;

const LinkALogo = styled(LinkA)`
  margin-left: 0;
  margin-right:auto;
  font-size: 1.4rem;
  font-weight: bold;
`;

const LocalNavigation: FC = () => {
  return (
    <Frame>
      <LinksFrameDiv>
        <LinkALogo href="#">AirMug Pro</LinkALogo>
        <LinkA href="#">개요</LinkA>
        <LinkA href="#">제품사양</LinkA>
        <LinkA href="#">구입하기</LinkA>
      </LinksFrameDiv>
    </Frame>
  );
};

export default LocalNavigation;
