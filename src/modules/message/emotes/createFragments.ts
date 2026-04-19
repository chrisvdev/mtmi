// import { process7tvMessages } from "./7tv/search7tvEmotes.ts";

type Fragment = {
  type: string;
  data: string
};

type Pattern = {
  type: string;
  regex: RegExp;
};

// \u3040-\u30FF (Japonés)
// \u3400-\u9FFF (Chino)
// \uAC00-\uD7AF (Coreano)
const patterns : Pattern[] = [
  { type: "nick", regex: /@[a-zA-Z0-9_\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF]+/ },
  { type: "hexcolor", regex: /#[A-Fa-f0-9]{6}\b/ },
  { type: "hashtag", regex: /#[a-zA-Z0-9_]+/ },
  { type: "url", regex: /https?:\/\/[^\s]+/ },
  { type: "command", regex: /![a-zA-Z0-9_]+/ },
  { type: "htmltag", regex: /<\/?[a-z]+[^>]*>/gi },
  { type: "ip", regex: /\b\d{1,3}(?:\.\d{1,3}){3}\b/ },
  { type: "laugh", regex: /\b(xd+)\b|\b(j(a|e|i|o)*)+\b/i }
];

export const createFragments = (message: string): Fragment[] => {
  const combinedRegex = new RegExp(
    patterns.map(p => `(${p.regex.source})`).join("|"),
    "gi"
  );

  const fragments: Fragment[] = [];
  let lastIndex = 0;

  for (const match of message.matchAll(combinedRegex)) {
    const matchStr = match[0];
    const index = match.index ?? 0;

    // Añadir texto antes del match
    if (index > lastIndex) {
      fragments.push({
        type: "text",
        data: message.slice(lastIndex, index)
      });
    }

    // Identificar el tipo de match
    const matchedPattern = patterns.find(p =>
      new RegExp(`^${p.regex.source}$`, p.regex.flags).test(matchStr)
    );

    fragments.push({
      type: matchedPattern?.type ?? "text",
      data: matchStr
    });

    lastIndex = index + matchStr.length;
  }

  // Añadir texto restante
  if (lastIndex < message.length) {
    fragments.push({
      type: "text",
      data: message.slice(lastIndex)
    });
  }

  return fragments;
  // return process7tvMessages(fragments);
};
