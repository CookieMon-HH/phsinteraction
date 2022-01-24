import React from "react";
import { SceneFunction } from "../utils/SceneController";

interface IStickySection {
  containerRef?: React.RefObject<HTMLElement>;
  onScene?: React.MutableRefObject<SceneFunction | undefined>;
}

export default IStickySection;
