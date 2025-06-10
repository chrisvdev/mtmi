// eslint-disable-next-line
export const createFragments = (message: string) => {
  const parts = message.split(/(@[a-zA-Z0-9_]+)/g).filter(Boolean);

  return parts.map(part => ({
    type: /^@[a-zA-Z0-9_]+$/.test(part) ? "nick" : "text",
    data: part
  }));
};
