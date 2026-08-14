import React from 'react';

/**
 * Reusable JsonLd component to inject structured JSON-LD data.
 * @param {object} props
 * @param {object} props.schema - The JSON-LD schema object
 */
export default function JsonLd({ schema }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
