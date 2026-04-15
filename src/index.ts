// Cliente principal
export { client } from "./mtmi";

// Tipos del mapa de eventos
export type { EventType, EventTypeMap } from "./types";

// Mensaje de chat
export type { UserMessageInfoType } from "./modules/message/parseUserMessage";
export type { UserInfoType } from "./modules/message/parseUser";
export type { MessageInfoType } from "./modules/message/parseMessage";
export type { ReplyInfoType } from "./modules/message/parseReplyMessage";
export type { BitsInfoType, BitsGroupType } from "./modules/message/parseBits";
export type { FlagsType } from "./modules/message/parseFlags";
export type { HypeChatInfoType } from "./modules/message/parseHypeChat";

// Badges
export type { BadgeInfoType } from "./modules/message/badges/parseBadgeInfo";

// Join / Part
export type { JoinPartInfoType, JoinPartType } from "./modules/joinpart/parseJoinPart";

// ClearChat / Ban / Timeout
export type { ClearChatInfoType, ClearChatType } from "./modules/clearchat/parseClearChat";
export type { BanInfoType } from "./modules/clearchat/parseBan";
export type { TimeoutInfoType } from "./modules/clearchat/parseTimeout";

// ClearMsg
export type { ClearMsgInfoType } from "./modules/clearmsg/parseClearMsg";

// RoomState
export type { RoomStateInfoType } from "./modules/roomstate/parseRoomState";

// Notice (modos de canal)
export type { NoticeGroupType } from "./modules/notice/parseNotice";

// UserNotice base
export type {
  BaseUserNotice,
  SubNoticeType,
  RaidNoticeType,
  GiftNoticeType,
  AnnouncementNoticeType,
  ViewerMilestoneNoticeType,
  UserNoticeInfoType
} from "./modules/usernotice/parseUserNotice";

// Suscripciones
export type { SubInfoType, SubInfoOptionalType, SubType } from "./modules/usernotice/sub/parseSub";
export type { SubPlanType } from "./modules/usernotice/sub/parseSubPlan";

// Raid
export type { RaidInfoType, RaidGroupType } from "./modules/usernotice/parseRaid";

// Anuncio
export type { AnnouncementInfoType, AnnouncementGroupType } from "./modules/usernotice/parseAnnouncement";

// Hitos / Viewer Milestone
export type { ViewerMilestoneType } from "./modules/usernotice/parseViewerMilestone";

// Regalos
export type { GiftInfoType } from "./modules/usernotice/gift/parseSubGift";
export type { MysteryGiftInfoType } from "./modules/usernotice/gift/parseMysteryGift";
export type { GoalInfoType, GoalGroupType } from "./modules/usernotice/gift/parseGoal";
export type { GiftPaidUpgradeInfoType } from "./modules/usernotice/gift/parseGiftPaidUpgrade";
export type { PrimePaidUpgradeInfoType } from "./modules/usernotice/gift/parsePrimePaidUpgrade";
export type { StandardPayforwardInfoType } from "./modules/usernotice/gift/parseStandardPayforward";
export type { CommunityPayforwardInfoType } from "./modules/usernotice/gift/parseCommunityPayforward";
