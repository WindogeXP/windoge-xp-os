export type PreloadAssetType = "image" | "font";

export type PreloadAsset = {
  type: PreloadAssetType;
  url: string;
};

const isBrowserEnvironment = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

const preloadImage = (url: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!isBrowserEnvironment()) {
      resolve();
      return;
    }

    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    image.src = url;
  });

const preloadFont = (url: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!isBrowserEnvironment()) {
      resolve();
      return;
    }

    const link = document.createElement("link");

    link.rel = "preload";
    link.as = "font";
    link.href = url;
    link.crossOrigin = "anonymous";
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload font: ${url}`));

    document.head.appendChild(link);
  });

export const preloadAsset = ({ type, url }: PreloadAsset): Promise<void> => {
  if (type === "image") {
    return preloadImage(url);
  }

  if (type === "font") {
    return preloadFont(url);
  }

  return Promise.resolve();
};

export const preloadAssets = (assets: PreloadAsset[]): Promise<void> => {
  if (assets.length === 0) {
    return Promise.resolve();
  }

  const preloadPromises = assets.map((asset) => preloadAsset(asset));

  return Promise.allSettled(preloadPromises).then(() => undefined);
};
