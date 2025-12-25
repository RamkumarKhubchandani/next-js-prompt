export const day08 = {
  "day": 8,
  "title": "RTK Query: Intro",
  "intro": "Stop writing thunks for data fetching. RTK Query is a powerful data fetching and caching tool built into Redux Toolkit.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) What is RTK Query?</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    It's like React Query or Apollo, but for Redux. It handles caching, polling, invalidation, and deduplication.\n</p>\n",
  "code": "// Day 8: RTK Query Setup\nimport { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';\n\nexport const pokemonApi = createApi({\n  reducerPath: 'pokemonApi',\n  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),\n  endpoints: (builder) => ({\n    getPokemonByName: builder.query({\n      query: (name) => `pokemon/${name}`,\n    }),\n  }),\n});\n\nexport const { useGetPokemonByNameQuery } = pokemonApi;",
  "labSteps": [
    {
      "id": "redux-d8-lab",
      "title": "Adding to Store",
      "subtitle": "Middleware setup",
      "teacherNote": "Don't forget the middleware!",
      "bugCode": "reducer: { [api.reducerPath]: api.reducer } // Missing middleware",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "middleware: (gDM) => gDM().concat(api.middleware)",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Middleware is required for caching and invalidation."
      ]
    }
  ]
};