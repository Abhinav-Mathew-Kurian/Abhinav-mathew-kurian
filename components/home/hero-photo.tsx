"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * The hero's photo. Kept deliberately simple — just a confidently large
 * portrait in a clean hairline frame, with a cinematic wipe reveal on
 * load and a subtle zoom on hover. (An earlier version annotated it
 * with schematic connector lines and labels; that read as cluttered, so
 * it's gone.)
 */
export function HeroPhoto() {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
      className="corner-marks group relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-md border border-border sm:max-w-[420px] lg:max-w-[480px]"
    >
      <Image
        src="/images/profilePicMain.png"
        alt="Abhinav Mathew Kurian"
        fill
        priority
        sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 320px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </motion.div>
  );
}
