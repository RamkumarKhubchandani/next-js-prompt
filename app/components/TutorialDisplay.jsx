"use client";
import React from 'react';
import { Card, CardContent } from '@mui/material';

const TutorialDisplay = ({ tutorial }) => {
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="prose lg:prose-lg mb-6">
            {section.content.split('\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        );
      
      case 'code':
        return (
          <div key={index} className="bg-gray-900 rounded-lg p-4 my-6">
            <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
              {section.content}
            </pre>
          </div>
        );
      
      case 'tip':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="text-blue-700">💡 {section.content}</p>
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