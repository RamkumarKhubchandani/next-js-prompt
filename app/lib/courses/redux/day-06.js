export const day06 = {
  "day": 6,
  "title": "Async Thunks",
  "intro": "Handling side effects in Redux. createAsyncThunk generates pending, fulfilled, and rejected actions for you.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) createAsyncThunk</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Accepts a type string and a payload creator function (usually an async fetch).\n</p>\n",
  "code": "// Day 6: Thunks\nimport { createAsyncThunk, createSlice } from '@reduxjs/toolkit';\n\n// 1. Define Thunk\nexport const fetchUser = createAsyncThunk(\n  'users/fetchById',\n  async (userId, thunkAPI) => {\n    const response = await fetch(`/api/users/${userId}`);\n    return response.json();\n  }\n);\n\n// 2. Handle in Slice\nconst usersSlice = createSlice({\n  name: 'users',\n  initialState: { entities: [], loading: 'idle' },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder.addCase(fetchUser.fulfilled, (state, action) => {\n      state.entities.push(action.payload);\n    });\n  },\n});",
  "labSteps": [
    {
      "id": "redux-d6-lab",
      "title": "Error Handling",
      "subtitle": "Catching rejections",
      "teacherNote": "Handle the rejected case.",
      "bugCode": "// Only handling fulfilled",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "builder.addCase(fetchUser.rejected, (state, action) => { state.error = action.error.message; })",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Thunks automatically dispatch 'rejected' on error."
      ]
    }
  ]
};