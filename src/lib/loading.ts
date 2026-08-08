export const FRAME_TOTAL = 121;
export const READY_THRESHOLD = 30;

let loaded = 0;
const listeners = new Set<(count: number) => void>();

export function reportFrames(count: number) {
  if (count <= loaded) return;
  loaded = count;
  listeners.forEach((listener) => listener(loaded));
}

export function onFrames(listener: (count: number) => void) {
  listeners.add(listener);
  listener(loaded);
  return () => {
    listeners.delete(listener);
  };
}

export function getFrameCount() {
  return loaded;
}
