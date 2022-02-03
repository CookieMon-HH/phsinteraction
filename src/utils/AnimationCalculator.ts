export interface IAnimaitonInOutProps {
  in: IAnimaitonProps;
  out: IAnimaitonProps;
  turningRatio: number;
}

export interface IAnimaitonProps {
  from: number;
  to: number;
  startRatio: number;
  endRatio: number;
}

const AnimationCalculator = (() => {
  const getValuePerRatio = (animationProps: IAnimaitonProps, currentRatio: number) => {
    const { from, to, startRatio, endRatio } = animationProps;
    const valueSpace = (to - from);
    if(currentRatio < startRatio) {
      return from;
    } else if(endRatio < currentRatio) {
      return to;
    }
    return from + (valueSpace * ((currentRatio - startRatio) / (endRatio - startRatio)));
  };

  const _getValuePerRatioFromTurningRatio = (animationInOutProps: IAnimaitonInOutProps, currentRatio: number) => {
    const isInAnimation = currentRatio < animationInOutProps.turningRatio;
    const animationProps = isInAnimation ? animationInOutProps.in : animationInOutProps.out;
    return getValuePerRatio(animationProps, currentRatio)
  };

  const opacityAnimationInOut = (element: HTMLElement, animationInOutProps: IAnimaitonInOutProps, currentRatio: number) => {
    const opacity = _getValuePerRatioFromTurningRatio(animationInOutProps, currentRatio);
    element.style.opacity = `${opacity}`;
  };

  const translateYAnimationInOut = (element: HTMLElement, animationInOutProps: IAnimaitonInOutProps, currentRatio: number) => {
    const translateY = _getValuePerRatioFromTurningRatio(animationInOutProps, currentRatio);
    element.style.transform = `translateY(${translateY}%)`;
  };

  return {
    getValuePerRatio,
    opacityAnimationInOut,
    translateYAnimationInOut,
  }
})();

export default AnimationCalculator;