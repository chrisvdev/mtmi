import { createFragments } from "./createFragments.ts";
import { search7tvEmotes } from "./7tv/search7tvEmotes.ts";

const message = "hola amigo @pepe que tal? pudiste ver la web https://twitch.tv/ o no? puedes mirarlo en twitch.tv/lala catJAM ... .... necesito color #848533 usa la etiqueta <div> a ver que tal, mi ip es 127.0.0.1 lala OMEGADANCE";

const data = createFragments(message);
console.log(data);

/* ... */

const emotes7tv = search7tvEmotes(message);
console.log(emotes7tv);
