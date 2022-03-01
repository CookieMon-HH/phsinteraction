import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

const Frame = styled.nav`
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd;
	z-index: 11;
  &.sticky {
    position: fixed;
    top: 0;
    backdrop-filter: saturate(180%) blur(15px);
  }
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', onStickyHandler);
    return () => {
      window.removeEventListener('scroll', onStickyHandler);
    }
  }, []);

  const onStickyHandler = () => {
    const { pageYOffset } = window;
    if (!ref.current) return;
    if(pageYOffset < 44) {
      ref.current.classList.remove('sticky');
    } else {
      ref.current.classList.add('sticky');
    }
  };

  return (
    <Frame ref={ref}>
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
