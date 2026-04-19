import { parseMysteryGift, MysteryGiftInfoType } from "./gift/parseMysteryGift.ts";
import { parseStandardPayforward, StandardPayforwardInfoType } from "./gift/parseStandardPayforward.ts";
import { parseCommunityPayforward, CommunityPayforwardInfoType } from "./gift/parseCommunityPayforward.ts";
import { parseGiftPaidUpgrade, GiftPaidUpgradeInfoType } from "./gift/parseGiftPaidUpgrade.ts";
import { parsePrimePaidUpgrade, PrimePaidUpgradeInfoType } from "./gift/parsePrimePaidUpgrade.ts";
import { parseSubGift, GiftInfoType } from "./gift/parseSubGift.ts";

export type GiftType = "submysterygift" | "standardpayforward" | "subgiftpaidupgrade" | "subgift";

export type GiftGroupType = MysteryGiftInfoType | StandardPayforwardInfoType | CommunityPayforwardInfoType | GiftPaidUpgradeInfoType | PrimePaidUpgradeInfoType | GiftInfoType | object;

export const parseGift = (fields: any) : GiftGroupType => {
  const msgId = fields["msg-id"];

  if (msgId === "submysterygift") {
    return parseMysteryGift(fields);
  }

  if (msgId === "standardpayforward") {
    return parseStandardPayforward(fields);
  }

  if (msgId === "communitypayforward") {
    return parseCommunityPayforward(fields);
  }

  if (msgId === "primepaidupgrade") {
    return parsePrimePaidUpgrade(fields);
  }

  if (msgId === "giftpaidupgrade") {
    return parseGiftPaidUpgrade(fields);
  }

  if (msgId === "subgift") {
    return parseSubGift(fields);
  }

  if (!fields["msg-param-sub-plan"]) {
    return {};
  }

  return {};
};
