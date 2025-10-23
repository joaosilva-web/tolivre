"use client";

import Lottie from "lottie-react";

import animationData from "../../assets/logoLottie.json";

export default function IconLogo() {
  return (
    <Lottie
      style={{ width: 26, height: 26 }}
      animationData={animationData}
      autoplay={true}
      loop={false}
    />
  );
}
