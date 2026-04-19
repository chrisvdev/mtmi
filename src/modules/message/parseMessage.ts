import { parseMessageWithEmotes } from "./emotes/parseMessageWithEmotes.ts";
import { parseFlags, FlagsType } from "./parseFlags.ts";
import { createMessage } from "./emotes/createMessage.ts";

export interface MessageInfoType {
  id: string,
  isFirstMessage: boolean,
  isReturningChatter: boolean,
  isEmoteOnly: boolean,
  isHighlightedMessage: boolean,
  isGigantifiedEmoteMessage: boolean,
  isAnimatedMessage: boolean,
  // animatedMessageInfo?: string,   // `animation-id`
  flagsInfo?: FlagsType,
  roomId: number,
  userId: number,
  tmi: number,
  msgId: string,
  messageData: Array<object>,
  message: HTMLSpanElement,
  rawMessage: string
}

export const parseMessage = (fields: any) : MessageInfoType => {
  // eslint-disable-next-line
  const { username, channel, flags, rawMessage } = fields;
  const messageData = parseMessageWithEmotes({ rawMessage, ...fields });
  const spanMessage = createMessage(messageData);
  const flagsInfo = parseFlags({ flags, rawMessage });

  return {
    id: fields.id,
    isEmoteOnly: Number(fields["emote-only"] ?? 0) !== 0,
    isFirstMessage: Number(fields["first-msg"] ?? 0) !== 0,
    isReturningChatter: Number(fields["returning-chatter"] ?? 0) !== 0,
    isHighlightedMessage: fields["msg-id"] === "highlighted-message",
    isGigantifiedEmoteMessage: fields["msg-id"] === "gigantified-emote-message",
    isAnimatedMessage: fields["msg-id"] === "animated-message",
    flagsInfo,
    roomId: Number(fields["room-id"]),
    tmi: Number(fields["tmi-sent-ts"]),
    userId: Number(fields["user-id"]),
    msgId: fields["msg-id"] ?? "message",
    messageData,
    message: spanMessage,
    rawMessage,
  };
};
