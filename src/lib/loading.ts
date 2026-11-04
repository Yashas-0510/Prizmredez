export const FRAME_TOTAL = 121;
export const READY_THRESHOLD = 40;

let loaded = 0;
let totalFrames = FRAME_TOTAL;
let transitioning = false;
let preloaderActive = true;
const listeners = new Set<(count: number, total: number) => void>();
const doneListeners = new Set<() => void>();

export function setPreloaderTransitioning(active: boolean) {
  transitioning = active;
}

export function isPreloaderTransitioning() {
  return transitioning;
}

export function setPreloaderActive(active: boolean) {
  preloaderActive = active;
  if (!active) {
    doneListeners.forEach((cb) => cb());
  }
}

export function isPreloaderActive() {
  return preloaderActive;
}

export function onPreloaderDone(cb: () => void) {
  if (!preloaderActive) {
    cb();
    return () => {};
  }
  doneListeners.add(cb);
  return () => {
    doneListeners.delete(cb);
  };
}

export function setFrameTotal(total: number) {
  if (total > 0 && total !== totalFrames) {
    totalFrames = total;
    listeners.forEach((listener) => listener(loaded, totalFrames));
  }
}

export function getFrameTotal() {
  return totalFrames;
}

export function reportFrames(count: number, total?: number) {
  if (total && total > 0 && total !== totalFrames) {
    totalFrames = total;
  }
  if (count > loaded) {
    loaded = count;
  }
  listeners.forEach((listener) => listener(loaded, totalFrames));
}

export function onFrames(listener: (count: number, total: number) => void) {
  listeners.add(listener);
  listener(loaded, totalFrames);
  return () => {
    listeners.delete(listener);
  };
}

export function getFrameCount() {
  return loaded;
}
