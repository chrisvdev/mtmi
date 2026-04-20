import { parseSlashToString, cleanMessage } from "@/modules/utils.ts";
import { BadgeInfoType, parseBadgeInfo } from "./badges/parseBadgeInfo.ts";
import { client } from "@/mtmi.ts";

const MAX_SUB_IMAGE = "https://static-cdn.jtvnw.net/badges/v1/ed51a614-2c44-4a60-80b6-62908436b43a/3";
const UNKNOWN_BADGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCAxOSAxOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjNzc3IiB4PSIwIiB5PSIwIiB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHJ4PSIzIiAvPjxjaXJjbGUgc3Ryb2tlPSIjZWVlIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGN4PSI5LjUiIGN5PSI5LjUiIHI9IjMiIC8+PC9zdmc+";

export const loadBadges = async () => {
  const file = client.options?.badges === "full"
    ? "badges.full.json"
    : "badges.json";

  const url = new URL(`./${file}`, import.meta.url);

  let data;
  try {
    // Deno, Browser CDN, Node con file://
    data = await import(url.href, { with: { type: "json" } });
    return { badges: data.default.badges };
  } catch {
    // Fallback: Vite, Node https://
    const res = await fetch(url.href);
    data = await res.json();
    return { badges: data.badges };
  }
};

export const parseBadges = (fields : any) : Array<BadgeInfoType> => {
  const badges : any = parseSlashToString(fields.badges) || {};
  const badgeInfo: any = parseBadgeInfo(fields["badge-info"]);
  const badgesName = Object.keys(badges);

  return badgesName.map(name => {
    const value = badges[name];
    const key = `${name}/${value}`;
    const keyData = client.badges.find(badge => badge.text === key) ?? { image: "", description: "" };

    const data : BadgeInfoType = {
      name,
      value,
      image: keyData.image,
      description: keyData.description
    };

    if (!data.image) {
      if ((data.name === "subscriber") && (Number(data.value) > 6))
        data.image = MAX_SUB_IMAGE;
      else
        data.image = UNKNOWN_BADGE;
    }
    name === "subscriber" && (data.fullMonths = Number(badgeInfo.subscriber));
    name === "founder" && (data.founderNumber = Number(badgeInfo.founder));
    name === "predictions" && (data.predictionInfo = cleanMessage(badgeInfo.predictions));

    return data;
  });
};
