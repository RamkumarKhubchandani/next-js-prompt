export const day15 = {
  "day": 15,
  "title": "Testing Components",
  "intro": "Integration testing with Redux. You need to wrap your component in a Provider with a test store.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) renderWithProviders</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Create a custom render function that sets up the Redux store.\n</p>\n",
  "code": "// Day 15: Integration Test\nimport { render, screen } from '@testing-library/react';\nimport { Provider } from 'react-redux';\nimport { configureStore } from '@reduxjs/toolkit';\nimport userReducer from './userSlice';\nimport UserProfile from './UserProfile';\n\nfunction renderWithProviders(ui, { preloadedState } = {}) {\n  const store = configureStore({ reducer: { user: userReducer }, preloadedState });\n  return render(<Provider store={store}>{ui}</Provider>);\n}\n\ntest('displays user name', () => {\n  renderWithProviders(<UserProfile />, { preloadedState: { user: { name: 'Alice' } } });\n  expect(screen.getByText('Alice')).toBeInTheDocument();\n});",
  "labSteps": [
    {
      "id": "redux-d15-lab",
      "title": "Dispatching in Test",
      "subtitle": "Interactions",
      "teacherNote": "Fire an event and check store/UI.",
      "bugCode": "// How to check if dispatch happened?",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "fireEvent.click(button); expect(screen.getByText('Updated')).toBeInTheDocument();",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Test the user visible outcome, not the implementation details."
      ]
    }
  ]
};