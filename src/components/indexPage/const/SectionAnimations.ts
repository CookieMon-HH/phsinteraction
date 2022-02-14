import { IAnimaitonInOutProps, IAnimaitonProps } from "../../../utils/AnimationCalculator";

const firstMessageAOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.1, endRatio: 0.2 };
const firstMessageBOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.3, endRatio: 0.4 };
const firstMessageCOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.5, endRatio: 0.6 };
const firstMessageDOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.7, endRatio: 0.8 };

const firstMessageAOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.25, endRatio: 0.3 };
const firstMessageBOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.45, endRatio: 0.5 };
const firstMessageCOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.65, endRatio: 0.7 };
const firstMessageDOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.85, endRatio: 0.9 };

const firstMessageAOpacityInOut: IAnimaitonInOutProps = { in: firstMessageAOpacityIn, out: firstMessageAOpacityOut, turningRatio: 0.22 };
const firstMessageBOpacityInOut: IAnimaitonInOutProps = { in: firstMessageBOpacityIn, out: firstMessageBOpacityOut, turningRatio: 0.42 };
const firstMessageCOpacityInOut: IAnimaitonInOutProps = { in: firstMessageCOpacityIn, out: firstMessageCOpacityOut, turningRatio: 0.62 };
const firstMessageDOpacityInOut: IAnimaitonInOutProps = { in: firstMessageDOpacityIn, out: firstMessageDOpacityOut, turningRatio: 0.82 };

const firstMessageATranslateYIn: IAnimaitonProps = { from: 20, to: 0, startRatio: 0.1, endRatio: 0.2 };
const firstMessageBTranslateYIn: IAnimaitonProps = { from: 20, to: 0, startRatio: 0.3, endRatio: 0.4 };
const firstMessageCTranslateYIn: IAnimaitonProps = { from: 20, to: 0, startRatio: 0.5, endRatio: 0.6 };
const firstMessageDTranslateYIn: IAnimaitonProps = { from: 20, to: 0, startRatio: 0.7, endRatio: 0.8 };

const firstMessageATranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.25, endRatio: 0.3 };
const firstMessageBTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.45, endRatio: 0.5 };
const firstMessageCTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.65, endRatio: 0.7 };
const firstMessageDTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.85, endRatio: 0.9 };

const firstMessageATranslateYInOut: IAnimaitonInOutProps = { in: firstMessageATranslateYIn, out: firstMessageATranslateYOut, turningRatio: 0.22 };
const firstMessageBTranslateYInOut: IAnimaitonInOutProps = { in: firstMessageBTranslateYIn, out: firstMessageBTranslateYOut, turningRatio: 0.42 };
const firstMessageCTranslateYInOut: IAnimaitonInOutProps = { in: firstMessageCTranslateYIn, out: firstMessageCTranslateYOut, turningRatio: 0.62 };
const firstMessageDTranslateYInOut: IAnimaitonInOutProps = { in: firstMessageDTranslateYIn, out: firstMessageDTranslateYOut, turningRatio: 0.82 };

const FirstIndexPageSectionAnimation = {
  firstMessageAOpacityInOut,
  firstMessageBOpacityInOut,
  firstMessageCOpacityInOut,
  firstMessageDOpacityInOut,
  firstMessageATranslateYInOut,
  firstMessageBTranslateYInOut,
  firstMessageCTranslateYInOut,
  firstMessageDTranslateYInOut,
};

const thirdMessageAOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.15, endRatio: 0.2 };
const thirdMessageBOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.5, endRatio: 0.55 };
const thirdMessageCOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.72, endRatio: 0.77 };

const thirdMessageAOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.3, endRatio: 0.35 };
const thirdMessageBOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.58, endRatio: 0.63 };
const thirdMessageCOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.85, endRatio: 0.9 };

const thirdMessageAOpacityInOut: IAnimaitonInOutProps = { in: thirdMessageAOpacityIn, out: thirdMessageAOpacityOut, turningRatio: 0.25 };
const thirdMessageBOpacityInOut: IAnimaitonInOutProps = { in: thirdMessageBOpacityIn, out: thirdMessageBOpacityOut, turningRatio: 0.57 };
const thirdMessageCOpacityInOut: IAnimaitonInOutProps = { in: thirdMessageCOpacityIn, out: thirdMessageCOpacityOut, turningRatio: 0.83 };

const thirdMessageATranslateYIn: IAnimaitonProps = { from: 20, to: 0, startRatio: 0.15, endRatio: 0.2 };
const thirdMessageBTranslateYIn: IAnimaitonProps = { from: 30, to: 0, startRatio: 0.5, endRatio: 0.55 };
const thirdMessageCTranslateYIn: IAnimaitonProps = { from: 30, to: 0, startRatio: 0.72, endRatio: 0.77 };

const thirdMessageATranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.3, endRatio: 0.35 };
const thirdMessageBTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.58, endRatio: 0.63 };
const thirdMessageCTranslateYOut: IAnimaitonProps = { from: 0, to: -20, startRatio: 0.85, endRatio: 0.9 };

const thirdMessageATranslateYInOut: IAnimaitonInOutProps = { in: thirdMessageATranslateYIn, out: thirdMessageATranslateYOut, turningRatio: 0.25 };
const thirdMessageBTranslateYInOut: IAnimaitonInOutProps = { in: thirdMessageBTranslateYIn, out: thirdMessageBTranslateYOut, turningRatio: 0.57 };
const thirdMessageCTranslateYInOut: IAnimaitonInOutProps = { in: thirdMessageCTranslateYIn, out: thirdMessageCTranslateYOut, turningRatio: 0.83 };


const thirdPinBScaleYIn: IAnimaitonProps = { from: 0.5, to: 1, startRatio: 0.5, endRatio: 0.55 };
const thirdPinCScaleYIn: IAnimaitonProps = { from: 0.5, to: 1, startRatio: 0.72, endRatio: 0.77 };

const thirdPinBOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.5, endRatio: 0.55 };
const thirdPinCOpacityIn: IAnimaitonProps = { from: 0, to: 1, startRatio: 0.72, endRatio: 0.77 };

const thirdPinBOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.58, endRatio: 0.63 };
const thirdPinCOpacityOut: IAnimaitonProps = { from: 1, to: 0, startRatio: 0.85, endRatio: 0.9 };

const thirdPinBOpacityInOut: IAnimaitonInOutProps = { in: thirdPinBOpacityIn, out: thirdPinBOpacityOut, turningRatio: 0.57 };
const thirdPinCOpacityInOut: IAnimaitonInOutProps = { in: thirdPinCOpacityIn, out: thirdPinCOpacityOut, turningRatio: 0.83 };
const thirdPinBScaleYInOut: IAnimaitonInOutProps = { in: thirdPinBScaleYIn, out: thirdPinBScaleYIn, turningRatio: 0.57 };
const thirdPinCScaleYInOut: IAnimaitonInOutProps = { in: thirdPinCScaleYIn, out: thirdPinCScaleYIn, turningRatio: 0.83 };

const ThirdIndexPageSectionAnimation = {
  thirdMessageAOpacityInOut,
  thirdMessageBOpacityInOut,
  thirdMessageCOpacityInOut,
  thirdMessageATranslateYInOut,
  thirdMessageBTranslateYInOut,
  thirdMessageCTranslateYInOut,
  thirdPinBOpacityInOut,
  thirdPinCOpacityInOut,
  thirdPinBScaleYInOut,
  thirdPinCScaleYInOut,
};

const ForthIndexPageSectionAnimation = {
};

export {
  FirstIndexPageSectionAnimation,
  ThirdIndexPageSectionAnimation,
  ForthIndexPageSectionAnimation,
}

