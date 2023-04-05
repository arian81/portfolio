export default function EmailIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className={className}
    >
      <g fill="none" strokeLinecap="round" strokeWidth="2">
        <rect
          width="18"
          height="14"
          x="3"
          y="5"
          strokeDasharray="64"
          strokeDashoffset="64"
          rx="1"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </rect>
        <path
          strokeDasharray="24"
          strokeDashoffset="24"
          d="M3 6.5L12 12L21 6.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.4s"
            values="24;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
