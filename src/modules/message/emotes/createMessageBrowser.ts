const createImage = (imageFragment) => {
  const image = document.createElement("img");
  image.className = imageFragment.type;
  image.alt = imageFragment.type;
  image.src = imageFragment.data;
  return image;
};

const create7tvImage = (imageFragment) => {
  const image = document.createElement("img");
  image.className = imageFragment.type;
  image.alt = imageFragment.type;
  image.src = `https://cdn.7tv.app/emote/${imageFragment.id}/2x.avif`;
  return image;
};

const createSpan = (textFragment, className) => {
  const span = document.createElement("span");
  className && span.classList.add(className);
  span.textContent = textFragment.data;
  return span;
};

export const createMessageBrowser = (messageData) => {
  const elements = messageData.map(fragment => {
    if (fragment.type === "emote") {
      return createImage(fragment);
    } else if (fragment.type === "7tv") {
      return create7tvImage(fragment);
    } else {
      return createSpan(fragment, fragment.type);
    }
  });
  const span = document.createElement("span");
  span.classList.add("message");
  elements.forEach(fragment => span.append(fragment));
  return span;
};
