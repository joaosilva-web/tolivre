"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import Image from "next/image";

import animationData from "../../assets/logoLottie.json";

interface IconLogoProps {
  width?: number | string;
  height?: number | string;
}

export default function IconLogo({
  width = 26,
  height = 26,
}: IconLogoProps = {}) {
  const [animationComplete, setAnimationComplete] = useState(false);

  return animationComplete ? (
    <Image
      src="/logo.svg"
      alt="TôLivre Logo"
      width={typeof width === "number" ? width : 26}
      height={typeof height === "number" ? height : 26}
      style={{ width, height }}
    />
  ) : (
    <Lottie
      style={{ width, height }}
      animationData={animationData}
      autoplay={true}
      loop={false}
      onComplete={() => setAnimationComplete(true)}
    />
  );
}
