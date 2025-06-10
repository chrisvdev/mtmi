const IGNORETYPES = [
  "PRIVMSG", "ROOMSTATE"
];

const IGNORELIST = [
  "resub", "sub", "subgift", "viewermilestone", "raid", "announcement", "submysterygift", "slow_off"
];

export const debugId = (raw : any) => {
  const [rawFields, rawHost, rawType, rawChannel] = raw.split(" ");
  const fields : Array<string> = raw.substring(1).split(";");
  const id = fields.find(field => field.startsWith("msg-id"));

  if (id) {
    const [, value] = id.split("=");

    if (IGNORETYPES.includes(rawType)) { return; }

    if (IGNORELIST.includes(value)) { return; }

    console.log("=>", rawType, value, rawFields, rawChannel);
  }
};

// USERNOTICE sharedchatnotice @badge-info=;badges=premium/1;color=;display-name=syncme1317;emotes=;flags=;id=810976cc-54d6-422b-be4c-232f241d6e3e;login=syncme1317;mod=0;msg-id=sharedchatnotice;msg-param-cumulative-months=1;msg-param-months=0;msg-param-multimonth-duration=1;msg-param-multimonth-tenure=0;msg-param-should-share-streak=0;msg-param-sub-plan-name=Channel\sSubscription\s(jakenbakelive);msg-param-sub-plan=Prime;msg-param-was-gifted=false;room-id=44445592;source-badge-info=subscriber/1;source-badges=subscriber/0,premium/1;source-id=f38ea621-273e-416b-9469-efcdcbcbe6f6;source-msg-id=sub;source-room-id=11249217;subscriber=0;system-msg=syncme1317\ssubscribed\swith\sPrime.;tmi-sent-ts=1749511800691;user-id=1227883055;user-type=;vip=0 #pokimane
