const createImage = (imageFragment) => {
  const image = document.createElement("img");
  image.className = imageFragment.type;
  image.alt = imageFragment.type;
  image.src = imageFragment.data;
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
    } else {
      return createSpan(fragment, fragment.type);
    }
  });
  const span = document.createElement("span");
  span.classList.add("message");
  elements.forEach(fragment => span.append(fragment));
  return span;
};
