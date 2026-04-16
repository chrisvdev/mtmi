import { parseSlashToString, cleanMessage } from "@/modules/utils";
import { BadgeInfoType, parseBadgeInfo } from "./badges/parseBadgeInfo";
import badgesInfo from "./badges/badges";

const MAX_SUB_IMAGE = "https://static-cdn.jtvnw.net/badges/v1/ed51a614-2c44-4a60-80b6-62908436b43a/3";

export const parseBadges = (fields : any) : Array<BadgeInfoType> => {
  const badges : any = parseSlashToString(fields.badges) || {};
  const badgeInfo: any = parseBadgeInfo(fields["badge-info"]);
  const badgesName = Object.keys(badges);

  // DEBUG
  /*
  const isPresent = badgesName.every(badge => badgesInfo.map(b => b.text.split("/").at(0)).includes(badge));
  !isPresent && console.log("----> badge descubierto: ", badges);
  const biKeys = Object.keys(badgeInfo).filter(key => key !== "subscriber" && key !== "founder");
  biKeys.length > 0 && console.log(badgeInfo);
  */
  // ***

  return badgesName.map(name => {
    const value = badges[name];
    const key = `${name}/${value}`;
    const keyData = badgesInfo.find(badge => badge.text === key) ?? { image: "", description: "" };

    const data : BadgeInfoType = {
      name,
      value,
      image: keyData.image,
      description: keyData.description
    };

    name === "subscriber" && data.value > 6 && !data.image && (data.image = MAX_SUB_IMAGE);
    name === "subscriber" && (data.fullMonths = Number(badgeInfo.subscriber));
    name === "founder" && (data.founderNumber = Number(badgeInfo.founder));
    name === "predictions" && (data.predictionInfo = cleanMessage(badgeInfo.predictions));

    return data;
  });
};
