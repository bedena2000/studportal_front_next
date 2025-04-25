"use client";

import { useEffect, useRef } from "react";

export default function ContentList({ content }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  console.log(content);

  return (
    <>
      {content.map((item) => (
        <div
          className="p-2 border rounded-md  bg-[#1e1a4d] w-fit text-white flex gap-2"
          key={item.id + Math.random()}
        >
          <span className="text-sm text-gray-300">
            {new Date(item.createdAt).toLocaleString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {item.fileUrl ? (
            /\.(jpg|jpeg|png|gif|webp)$/i.test(item.fileName) ? (
              <img
                src={`http://localhost:5000${item.fileUrl}`}
                alt={item.fileName}
                className="max-w-xs rounded-md border"
              />
            ) : (
              <a
                href={`http://localhost:5000${item.fileUrl}`}
                download
                className="bg-purple-800 rounded-md p-2 border text-white hover:underline w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                📎 {item.fileName}
              </a>
            )
          ) : (
            <p className="bg-sky-900 rounded-md p-2 border">{item.content}</p>
          )}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </>
  );
}
