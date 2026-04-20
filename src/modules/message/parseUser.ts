import { PremiumColorType, ColorType } from "./colors/colors.ts";
import { getAvatar } from "@/modules/message/avatars/getAvatar.ts";
import BOTS from "./bots.ts";
import { client } from "@/mtmi.ts";

// type UserType = "normal" | "admin" | "global_mod" | "staff";  // Deprecated

export interface UserInfoType {
  username: string,
  avatar?: Promise<string>,
  displayName: string,
  color: ColorType | PremiumColorType,
  isVip: boolean,
  isMod: boolean,
  isSub: boolean,
  isTurbo: boolean,
  isPrime: boolean,
  isBot: boolean,
  // userType: UserType // Deprecated
}

export const parseUser = (fields: any): UserInfoType => {

  const result : UserInfoType = {
    username: fields.username,
    displayName: fields["display-name"] || fields.username,
    color: fields.color.toLowerCase() || "currentColor",
    isMod: Boolean(fields.mod === "1"),
    isVip: Boolean(fields.vip === "1"),
    isSub: Boolean(fields.subscriber !== "0"),
    isPrime: Boolean(fields.badges?.premium === "1"),
    // isTurbo: Boolean(fields.turbo), // Deprecated
    isTurbo: Boolean(fields.badges?.turbo === "1"),
    isBot: BOTS.getAll().includes(fields.username)
    // serType: fields["user-type"] || "normal",
  };

  if (client.options?.avatarProvider)
    result.avatar = getAvatar(fields.username, client.options.avatarProvider);

  return result;
};
