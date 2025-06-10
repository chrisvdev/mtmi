export const createEmoteImage = (id, format = "default", theme = "dark", scale = "2.0") => ({
  type: "emote",
  data: `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme}/${scale}`,
  id
});
