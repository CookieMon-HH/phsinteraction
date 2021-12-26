import { FC } from "react";
import styled from "styled-components";
import GlobalNavigation from "../components/common/GlobalNavigation";
import LocalNavigation from "../components/common/LocalNavigation";
import FirstIndexPageSection from "../components/indexPage/FirstIndexPageSection";
import FourthIndexPageSection from "../components/indexPage/FourthIndexPageSection";
import IndexPageFooter from "../components/indexPage/IndexPageFooter";
import SecondIndexPageSection from "../components/indexPage/SecondIndexPageSection";
import ThirdIndexPageSection from "../components/indexPage/ThirdIndexPageSection";

const Frame = styled.div`
`;

const IndexPage: FC = () => {
  return (
    <Frame>
      <GlobalNavigation />
      <LocalNavigation />
      <FirstIndexPageSection />
      <SecondIndexPageSection />
      <ThirdIndexPageSection />
      <FourthIndexPageSection />
      <IndexPageFooter />
    </Frame>
  );
};

export default IndexPage;
