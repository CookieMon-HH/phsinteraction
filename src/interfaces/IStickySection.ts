import React from "react";
import { SceneFunction } from "../utils/SceneController";

interface IStickySection {
  containerRef?: React.RefObject<HTMLElement>;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  onScene?: React.MutableRefObject<SceneFunction | undefined>;
}

export default IStickySection;
