import emotes from "./emotes.json" with { type: "json" };

const emoteSet = new Set(emotes.map(emote => emote.name));

export const search7tvEmotes = (message) => {
  const foundEmotes = message.split(" ").filter(word => emoteSet.has(word));
  return foundEmotes ?? []
};

export const process7tvMessages = messageData =>
  messageData.flatMap(({ type, data }) => {
    if (type !== 'text') return [{ type, data }];

    const words = data.split(/(\s+)/).filter(Boolean);
    const result = [];

    for (const word of words) {
      if (emoteSet.has(word)) {
        const id = emotes.find(emote => emote.name === word).id;
        result.push({ type: '7tv', data: word, id });
      } else if (result.length && result.at(-1).type === 'text') {
        result.at(-1).data += word;
      } else {
        result.push({ type: 'text', data: word });
      }
    }

    return result;
  });
