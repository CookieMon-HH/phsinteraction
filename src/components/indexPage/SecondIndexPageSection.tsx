import { FC, useEffect } from "react";
import styled from "styled-components";
import IStickySection from "../../interfaces/IStickySection";
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

const SecondIndexPageSection: FC<IStickySection> = ((props) => {
  const { containerRef, onScene } = props;
  
  useEffect(() => {
    if(!onScene) return;
    onScene.current = (yOffset: number) => {};
  }, [onScene]);

  return (
    <Frame ref={containerRef}>
      <DescriptionP>
        <strong>보통 스크롤 영역</strong>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dignissimos, voluptatum voluptates laborum eveniet iure? Commodi repellat quidem natus culpa tempore. Illo eveniet iure magni? Esse, inventore minus unde vitae similique reiciendis odit et rerum maiores ipsa voluptas dolore possimus dignissimos adipisci consequatur porro debitis, magni cupiditate placeat iusto tenetur quaerat optio. Illo corrupti facilis architecto delectus libero earum nulla incidunt aspernatur reprehenderit cupiditate non esse perspiciatis aperiam, dolor blanditiis dolore tempore, veniam accusamus harum eum quidem rem placeat illum dicta! Mollitia dolorem at eligendi autem. Molestiae explicabo facilis possimus ea debitis necessitatibus odio sit nesciunt voluptas labore corporis eius alias aperiam velit ad delectus facere, accusamus suscipit laborum sunt. Similique blanditiis eligendi dolor necessitatibus qui, nulla incidunt consequatur iste distinctio eum, debitis quae, enim cupiditate eos! Non illum magnam quaerat inventore ipsum ipsa, dolore similique qui eius dignissimos enim ex doloribus explicabo corrupti, illo totam veritatis quia odio maiores alias. Id repudiandae dolorum laudantium quod porro deserunt aliquid itaque. Sequi assumenda explicabo, labore ut porro fugit iste deleniti accusamus sapiente molestias beatae minus maiores in veniam omnis eligendi ducimus! Temporibus, blanditiis. Unde vitae quia, eos fugiat enim totam laborum voluptatem sequi iusto laboriosam corporis repellendus nesciunt labore saepe itaque.
      </DescriptionP>
    </Frame>
  )
});

export default SecondIndexPageSection;
