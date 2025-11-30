'use client';

import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

export default function Playground({ code, template = "react" }) {
  return (
      <Sandpack
        template={template}
        theme={atomDark}
        files={{
          "/App.js": code,
        }}
        options={{
          showNavigator: true, // We can toggle this if we want less clutter
          showTabs: true,
          editorHeight: 400,
          showLineNumbers: true,
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: {
              "sp-wrapper": "h-full",
              "sp-layout": "h-full rounded-none border-none", // Try to remove default borders
              "sp-tab-button": "text-sm",
          }
        }}
        customSetup={{
            dependencies: {
                "lucide-react": "latest",
                "framer-motion": "latest"
            }
        }}
      />
  );
}
