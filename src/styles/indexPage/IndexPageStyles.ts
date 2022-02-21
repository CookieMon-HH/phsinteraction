const MixinMedia1024 = (cssText: string) => `
  @media (min-width: 1024px) {
    ${cssText};
  }
`;

const MixinIndexPageSectionFrameStyle = `
  position: relative;
  padding-top: 50vh;
`;

const MixinIndexPageMainMessageStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  height: 3em;
  font-size: 2.5rem;

  p {
    font-weight: bold;
    text-align: center;
    line-height: 1.2;
  }

  small {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1rem;
  }

  ${MixinMedia1024(`
    font-size: 4vw;

    small {
      font-size: 1.5vw;
    }
  `)};
`;

const MixinStickyMessage = `
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

export {
  MixinMedia1024,
  MixinIndexPageSectionFrameStyle,
  MixinIndexPageMainMessageStyle,
  MixinStickyMessage,
};