import { writeFileSync } from "node:fs";

async function fetchEmotes(page = 1) {
  const query = `
    query EmoteSearch(
      $query: String,
      $tags: [String!]!,
      $sortBy: SortBy!,
      $filters: Filters,
      $page: Int,
      $perPage: Int!
    ) {
      emotes {
        search(
          query: $query,
          tags: {tags: $tags, match: ANY},
          sort: {sortBy: $sortBy, order: DESCENDING},
          filters: $filters,
          page: $page,
          perPage: $perPage
        ) {
          items {
            id
            defaultName
            images {
              url
              width
              height
            }
          }
        }
      }
    }
  `;

  const variables = {
    query: null,
    tags: [],
    sortBy: "TRENDING_WEEKLY",
    filters: null,
    page,
    perPage: 100
  };

  try {
    const resp = await fetch("https://api.7tv.app/v4/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables })
    });

    const json = await resp.json();
    const emotes = json.data.emotes.search.items.map((emote) => ({
      id: emote.id,
      name: emote.defaultName,
      width: emote.images[0].width,
      height: emote.images[0].height
    }));

    console.log("Emotes cargados:", emotes.length);
    return emotes;
  } catch (e) {
    console.error("Error cargando emotes:", e);
  }
}

const result = [];
for (let i = 1; i < 16; i++) {
  const data = await fetchEmotes(i);
  result.push(data);
}

writeFileSync("emotes.json", JSON.stringify(result.flat(Infinity)));
