let IS_FIREFOX: boolean;

export const isFirefox = (): boolean => {
  if (typeof window === "undefined") return false;
  if (IS_FIREFOX ?? false) return IS_FIREFOX;

  IS_FIREFOX = /firefox/i.test(window.navigator.userAgent);

  return IS_FIREFOX;
};

let IS_SAFARI: boolean;

export const isSafari = (): boolean => {
  if (typeof window === "undefined") return false;
  if (IS_SAFARI ?? false) return IS_SAFARI;

  IS_SAFARI = /^(?:(?!chrome|android).)*safari/i.test(
    window.navigator.userAgent
  );

  return IS_SAFARI;
};
