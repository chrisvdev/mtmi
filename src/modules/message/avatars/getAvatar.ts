type ImageApiConfig = {
  type: "image";
  url: (username: string) => string;
};

type JsonApiConfig = {
  type: "json";
  url: (username: string) => string;
  extract: (data: unknown) => string;
  transform?: (url: string) => string;
};

type TextApiConfig = {
  type: "text";
  url: (username: string) => string;
  transform?: (url: string) => string;
};

type ApiConfig = ImageApiConfig | JsonApiConfig | TextApiConfig;

// Para la API custom JSON simplificada que exponemos al usuario
export type CustomJsonApi = {
  url: (username: string) => string;
  extract: (data: unknown) => string;
  transform?: (url: string) => string;
};

export type CustomJsonApiConfig = {
  url: string;
  extract: string;
  transform?: [string, string];
};

const APIS: Record<string, ApiConfig> = {
  unavatar: {
    type: "image",
    url: (username) => `https://unavatar.io/twitch/${username}`,
  },
  ivr: {
    type: "json",
    url: (username) => `https://api.ivr.fi/v2/twitch/user?login=${username}`,
    extract: (data) => (data as Array<{ logo: string }>)[0]?.logo,
    transform: (url) => url.replace("600x600", "70x70"),
  },
  decapi: {
    type: "text",
    url: (username) => `https://decapi.me/twitch/avatar/${username}`,
    transform: (url) => url.trim().replace("300x300", "70x70"),
  },
};

const DEFAULT_AVATAR = "https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-70x70.png";
const CACHE_KEY_PREFIX = "twitch_avatar:";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const memoryCache = new Map<string, string | Promise<string>>();

const readFromStorage = (username: string): string | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + username);
    if (!raw) return null;
    const { logo, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(CACHE_KEY_PREFIX + username);
      return null;
    }
    return logo;
  } catch {
    return null;
  }
}

const writeToStorage = (username: string, logo: string): void => {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + username, JSON.stringify({
      logo,
      expiresAt: Date.now() + CACHE_TTL_MS,
    }));
  } catch { /* localStorage lleno u otro error */ }
}

const fetchAvatar = async (username: string, config: ApiConfig): Promise<string> => {
  const response = await fetch(config.url(username));

  if (config.type === "image") {
    return config.url(username);
  }

  if (config.type === "json") {
    const data = await response.json();
    const url = config.extract(data);
    return config.transform ? config.transform(url) : url;
  }

  const url = await response.text();
  return config.transform ? config.transform(url) : url;
}

export const getAvatar = async (username: string, apiKey: keyof typeof APIS = "ivr"): Promise<string> => {
  const key = username.toLowerCase();
  const config = APIS[apiKey];

  if (!config) throw new Error(`API desconocida: ${apiKey}`);

  if (memoryCache.has(key)) return memoryCache.get(key) as string | Promise<string>;

  const stored = readFromStorage(key);
  if (stored) {
    memoryCache.set(key, stored);
    return stored;
  }

  const pendingKey = `${key}:pending`;
  if (memoryCache.has(pendingKey)) return memoryCache.get(pendingKey) as Promise<string>;

  const promise = fetchAvatar(key, config)
    .then((logo) => {
      memoryCache.set(key, logo);
      memoryCache.delete(pendingKey);
      writeToStorage(key, logo);
      return logo;
    })
    .catch(() => {
      memoryCache.delete(pendingKey);
      return DEFAULT_AVATAR;
    });

  memoryCache.set(pendingKey, promise);
  return promise;
}

const setCustomApi = (config: CustomJsonApi): void => {
  APIS.custom = { type: "json", ...config };
}

function resolvePath(obj: unknown, path: string): string {
  return path
    .split(".")
    .reduce((acc, key) => (acc as Record<string, unknown>)[key], obj) as string;
}

export const setCustomApiFromJson = (config: CustomJsonApiConfig): void => {
  setCustomApi({
    url: (username) => config.url.replace("{{username}}", username),
    extract: (data) => resolvePath(data, config.extract),
    transform: config.transform
      ? (url) => url.replace(config.transform![0], config.transform![1])
      : undefined,
  });
}
