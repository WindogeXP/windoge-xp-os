"use client";

import { useEffect, useRef } from "react";
import { useBoot } from "contexts/boot";

const BOOT_DURATION_MS = 6 * 1000;
const ANIMATION_INTERVAL_MS = 70;
const POSITION_STEP = 20;
const POSITION_MIN = -150;
const POSITION_RESET_AT = 400;

const SystemLoadingState = (): React.ReactElement => {
  const loadingStripRef = useRef<HTMLDivElement>(null);
  const { setBootState } = useBoot();

  useEffect(() => {
    const strip = loadingStripRef.current;
    if (!strip) return;

    let position = POSITION_MIN;

    const interval = setInterval(() => {
      position += POSITION_STEP;
      strip.style.left = `${position}px`;
      if (position >= POSITION_RESET_AT) {
        position = POSITION_MIN;
      }
    }, ANIMATION_INTERVAL_MS);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setBootState("LOGON");
    }, BOOT_DURATION_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [setBootState]);

  return (
    <div className="system-loading-container">
      <div className="system-loading-animation-wrap">
        <img
          src="/images/bootup/logo.png"
          className="system-loading-logo"
          alt="Logo"
        />
        <div className="system-loading-bar-container">
          <div ref={loadingStripRef} className="system-loading-bar-strip">
            <span className="system-loading-bar-segment system-loading-bar-segment--1" />
            <span className="system-loading-bar-segment system-loading-bar-segment--2" />
            <span className="system-loading-bar-segment system-loading-bar-segment--3" />
          </div>
        </div>
        <span className="system-loading-footer">
          Powered by Internet Computer ® 100% on-chain
        </span>
      </div>
    </div>
  );
};

export default SystemLoadingState;
