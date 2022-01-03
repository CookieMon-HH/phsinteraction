import {FC} from "react";
import styled from "styled-components";
import GlobalNav from "../src/component/GlobalNav";
import LocalNav from "../src/component/LocalNav";
import IndexFooter from "../src/component/IndexFooter";
import PageSection from "../src/component/PageSection";

const Frame = styled.div`

`;

const StartPage: FC  = () =>{
  return (
    <Frame>
      <GlobalNav/>
      <LocalNav/>
      <PageSection/>
      <IndexFooter/>
    </Frame>
  )
}

export default StartPage
