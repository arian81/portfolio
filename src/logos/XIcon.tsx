import React from "react";

export default function XIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className={className}
      strokeWidth={0.2}
    >
      <title>X (Twitter) icon</title>
      <g>
        <path d="M1 2h2.5L3.5 2h-2.5z">
          <animate
            attributeName="d"
            values="M1 2h2.5L3.5 2h-2.5z;M1 2h2.5L18.5 22h-2.5z"
            dur="0.4s"
            fill="freeze"
          />
        </path>
        <path d="M5.5 2h2.5L7.2 2h-2.5z">
          <animate
            attributeName="d"
            values="M5.5 2h2.5L7.2 2h-2.5z;M5.5 2h2.5L23 22h-2.5z"
            dur="0.4s"
            fill="freeze"
          />
        </path>
        <path d="M3 2h5v0h-5z" opacity="0">
          {React.createElement("set", {
            attributeName: "opacity",
            to: "1",
            begin: "0.4s",
          })}
          <animate
            attributeName="d"
            values="M3 2h5v0h-5z;M3 2h5v2h-5z"
            begin="0.4s"
            dur="0.4s"
            fill="freeze"
          />
        </path>
        <path d="M16 22h5v0h-5z" opacity="0">
          {React.createElement("set", {
            attributeName: "opacity",
            to: "1",
            begin: "0.4s",
          })}
          <animate
            attributeName="d"
            values="M16 22h5v0h-5z;M16 22h5v-2h-5z"
            begin="0.4s"
            dur="0.4s"
            fill="freeze"
          />
        </path>
        <path d="M18.5 2h3.5L22 2h-3.5z" opacity="0">
          {React.createElement("set", {
            attributeName: "opacity",
            to: "1",
            begin: "0.5s",
          })}
          <animate
            attributeName="d"
            values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"
            begin="0.5s"
            dur="0.4s"
            fill="freeze"
          />
        </path>
      </g>
    </svg>
  );
}
