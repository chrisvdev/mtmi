import { createMessageNode } from "./createMessageNode.js";
import { createMessageBrowser } from "./createMessageBrowser.js";

export const createMessage = (() => {
  const isBrowser = typeof document !== "undefined";
  return isBrowser ? createMessageBrowser : createMessageNode;
})();
