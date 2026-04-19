import { createMessageNode } from "./createMessageNode.ts";
import { createMessageBrowser } from "./createMessageBrowser.ts";

export const createMessage = (() => {
  const isBrowser = typeof document !== "undefined";
  return isBrowser ? createMessageBrowser : createMessageNode;
})();
