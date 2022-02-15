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

  const scaleYAnimationInOut = (element: HTMLElement, animationInOutProps: IAnimaitonInOutProps, currentRatio: number) => {
    const scaleY = _getValuePerRatioFromTurningRatio(animationInOutProps, currentRatio);
    element.style.transform = `scaleY(${scaleY})`;
  };

  const canvasPlay = (element: HTMLCanvasElement, images: HTMLImageElement[], currentRatio: number) => {
    const { length } = images;
    const animationProps: IAnimaitonProps = { from: 0, to: 1, startRatio: 0, endRatio: 1 };
    const index = Math.round(length * getValuePerRatio(animationProps, currentRatio));
    const inBoundIndex = Math.max(0, Math.min(index, length-1));
    const image = images[inBoundIndex];
    if(image.complete) {
      element.getContext('2d')?.drawImage(image, 0, 0);
    } else {
      image.onload = () => {
        element.getContext('2d')?.drawImage(image, 0, 0);
      }
    }
    
  };

  return {
    getValuePerRatio,
    opacityAnimationInOut,
    translateYAnimationInOut,
    scaleYAnimationInOut,
    canvasPlay,
  }
})();

export default AnimationCalculator;