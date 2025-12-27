export const day09 = {
  "day": 9,
  "title": "RTK Query: Caching",
  "intro": "Understanding how RTK Query caches data. Tags, invalidation, and cache lifetime.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Tags</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Tags are labels attached to data. When you mutate data, you \"invalidate\" tags to force a refetch.\n</p>\n",
  "code": "// Day 9: Caching\nexport const api = createApi({\n  tagTypes: ['Post'],\n  endpoints: (builder) => ({\n    getPosts: builder.query({\n      query: () => '/posts',\n      providesTags: ['Post'],\n    }),\n    addPost: builder.mutation({\n      query: (body) => ({\n        url: '/posts',\n        method: 'POST',\n        body,\n      }),\n      invalidatesTags: ['Post'],\n    }),\n  }),\n});",
  "labSteps": [
    {
      "id": "redux-d9-lab",
      "title": "Specific Tags",
      "subtitle": "Granular invalidation",
      "teacherNote": "Invalidate only specific ID.",
      "bugCode": "providesTags: ['Post'] // Invalidates ALL posts",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "providesTags: (result) => result.map(({ id }) => ({ type: 'Post', id }))",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "This allows updating one item without refetching the whole list."
      ]
    }
  ]
};