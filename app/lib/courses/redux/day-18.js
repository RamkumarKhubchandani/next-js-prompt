export const day18 = {
  "day": 18,
  "title": "Websockets",
  "intro": "Handling real-time data. Middleware is the perfect place to manage a socket connection.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Socket Middleware</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Connect on startup, dispatch actions on message.\n</p>\n",
  "code": "// Day 18: Sockets\nconst socketMiddleware = store => {\n  let socket;\n  return next => action => {\n    if (action.type === 'WS_CONNECT') {\n      socket = new WebSocket(action.payload);\n      socket.onmessage = (msg) => store.dispatch({ type: 'WS_MSG', payload: msg.data });\n    }\n    return next(action);\n  };\n};",
  "labSteps": [
    {
      "id": "redux-d18-lab",
      "title": "Sending Messages",
      "subtitle": "Dispatch to socket",
      "teacherNote": "Intercept actions to send.",
      "bugCode": "socket.send(action) // Inside component",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "if (action.type === 'WS_SEND') socket.send(action.payload);",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Keep socket logic out of UI."
      ]
    }
  ]
};