export const createMessageNode = (messageData) =>
  messageData.map(fragment => {
    if (fragment.type === "emote") {
      return `:${fragment.id}:`;
    } else {
      return fragment.data;
    }
  }).join("");
