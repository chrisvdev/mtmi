import { parseEquals } from "@/modules/utils.ts";
import { parseUser, UserInfoType } from "@/modules/message/parseUser.ts";
import { parseMessage, MessageInfoType } from "@/modules/message/parseMessage.ts";
import { parseSub, SubInfoOptionalType } from "@/modules/usernotice/sub/parseSub.ts";
import { parseGift, GiftGroupType } from "@/modules/usernotice/parseGift.ts";
import { parseRaid, RaidGroupType } from "@/modules/usernotice/parseRaid.ts";
import { parseAnnouncement, AnnouncementGroupType } from "@/modules/usernotice/parseAnnouncement.ts";
import { parseViewerMilestone, ViewerMilestoneType } from "@/modules/usernotice/parseViewerMilestone.ts";

export interface BaseUserNotice {
  type: string,
  channel: string,
  userInfo: UserInfoType,
  messageInfo: MessageInfoType,
  message: string,
  raw: string,
}

export interface SubNoticeType extends BaseUserNotice {
  type: "sub" | "resub" | "giftpaidupgrade" | "primepaidupgrade";
  subInfo: SubInfoOptionalType;
}

export interface RaidNoticeType extends BaseUserNotice {
  type: "raid";
  raidInfo: RaidGroupType;
}

export interface GiftNoticeType extends BaseUserNotice {
  type: "submysterygift" | "standardpayforward" | "subgiftpaidupgrade" | "subgift";
  giftInfo: GiftGroupType;
}

export interface AnnouncementNoticeType extends BaseUserNotice {
  type: "announcement";
  announcementInfo: AnnouncementGroupType;
}

export interface ViewerMilestoneNoticeType extends BaseUserNotice {
  type: "viewermilestone";
  milestoneInfo: ViewerMilestoneType;
}

// type UserNoticeInfoType = "SubNoticeType" | "RaidNoticeType" | "GiftNoticeType" | "AnnouncementNoticeType" | "ViewerMilestone";

export interface UserNoticeInfoType extends BaseUserNotice {
  subInfo?: SubInfoOptionalType,
  giftInfo?: GiftGroupType,
  raidInfo?: RaidGroupType,
  announcementInfo?: AnnouncementGroupType,
  milestoneInfo?: ViewerMilestoneType
}

export const parseUserNotice = ({ eventMessage } : any) : UserNoticeInfoType => {
  // eslint-disable-next-line
  const [rawFields, host, rawType, channel, ...rawMessage] = eventMessage.substring(1).split(" ");
  const fields = parseEquals(rawFields);
  const message = rawMessage.join(" ").substring(1);
  const username = fields.login;

  const userInfo = parseUser({ username, ...fields });
  const messageInfo = parseMessage({ username, channel, rawMessage: message, ...fields });
  const subInfo = parseSub(fields);
  const raidInfo = parseRaid(fields);
  const giftInfo = parseGift(fields);
  const milestoneInfo = parseViewerMilestone(fields);
  const announcementInfo = parseAnnouncement(fields);

  const data : UserNoticeInfoType = {
    type: fields["msg-id"],
    channel,
    userInfo,
    messageInfo,
    message,
    raw: eventMessage
  };

  Object.keys(subInfo).length && (data.subInfo = subInfo);
  Object.keys(giftInfo).length && (data.giftInfo = giftInfo);
  Object.keys(raidInfo).length && (data.raidInfo = raidInfo);
  Object.keys(announcementInfo).length && (data.announcementInfo = announcementInfo);
  milestoneInfo?.category && (data.milestoneInfo = milestoneInfo);

  return data;
};
