import { FC } from "react";
import styled from "styled-components";
import GlobalNavigation from "../components/GlobalNavigation";
import LocalNavigation from "../components/LocalNavigation";

const Frame = styled.div`
`;

const IndexPage: FC = () => {
  return (
    <Frame>
      <GlobalNavigation />
      <LocalNavigation />
    </Frame>
  );
};

export default IndexPage;
