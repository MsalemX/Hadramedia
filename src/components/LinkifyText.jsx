import React from 'react';

const LinkifyText = ({ text }) => {
  if (!text) return null;

  // Regex to detect URLs (http, https, and www)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          let url = part;
          if (!url.startsWith('http')) {
            url = `https://${url}`;
          }
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-red-600 underline decoration-blue-600/30 underline-offset-4 transition-colors break-all"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export default LinkifyText;
