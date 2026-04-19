import { createEmotesDictionary } from "./createEmotesDictionary.ts";
import { createFragments } from "./createFragments.ts";
import { createEmoteImage } from "./createEmoteImage.ts";

export const parseMessageWithEmotes = (fields : any) => {
  const { rawMessage, emotes } = fields;
  const newMessage: Array<object> = [];

  // El mensaje no tiene emotes
  if (!emotes) {
    newMessage.push(...createFragments(rawMessage));
    return newMessage;
  }

  const emoteOnly = Boolean(fields?.["emote-only"]) ?? false;
  const emoteList = createEmotesDictionary(emotes);

  let i = 0;
  emoteList.forEach(({ name, start, end }) => {
    if (!emoteOnly) {
      newMessage.push(...createFragments(rawMessage.substring(i, start)));
    }
    newMessage.push(createEmoteImage(name));
    i = end + 1;
  });

  i < rawMessage.length && newMessage.push(...createFragments(rawMessage.substring(i)));

  return newMessage;
};
