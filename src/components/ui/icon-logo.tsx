"use client";

import Lottie from "lottie-react";

import animationData from "../../assets/logoLottie.json";

interface IconLogoProps {
  width?: number | string;
  height?: number | string;
}

export default function IconLogo({ width = 26, height = 26 }: IconLogoProps = {}) {
  return (
    <Lottie
      style={{ width, height }}
      animationData={animationData}
      autoplay={true}
      loop={false}
    />
  );
}
