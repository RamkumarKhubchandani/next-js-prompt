"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const TutorialDisplay = ({ tutorial }) => {
  const renderSection = (section, index) => {
    switch (section.type) {
      case "text":
        return (
          <div key={index} className="prose lg:prose-lg mb-6">
            {section.content.split("\n").map((paragraph, i) => (
              // <p key={i} className="text-gray-700 leading-relaxed">
              //   {paragraph}
              // </p>
              <div key={index} className="prose lg:prose-lg mb-6">
                <ReactMarkdown>{paragraph}</ReactMarkdown>
              </div>
            ))}
          </div>
        );

      case "code":
        return (
          <div key={index} className="bg-gray-900 rounded-lg p-4 my-6">
            <SyntaxHighlighter language="javascript" style={darcula}>
              {section.content}
            </SyntaxHighlighter>
            {/* <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
              {section.content}
            </pre> */}
          </div>
        );

      case "tip":
        return (
          <div
            key={index}
            className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6"
          >
            <p className="text-blue-700">💡 {section.content}</p>
          </div>
        );
      case "image":
        return (
          <div key={index} className="my-6">
            <img
              src={section.imageUrl}
              alt="Tutorial content"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        );

      default:
        return null;
    }
  };
  console.log(tutorial, "tutorial");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* <div className="w-64 bg-white shadow-sm p-6 fixed h-screen">
          <h2 className="text-xl font-semibold mb-4">{tutorial.category}</h2>
          <nav className="space-y-2">
            
          </nav>
        </div> */}

        <main className="ml-64 flex-1 p-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-6">{tutorial?.title}</h1>
              <div className="space-y-6">
                {tutorial?.content?.map((section, index) =>
                  renderSection(section, index)
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TutorialDisplay;
