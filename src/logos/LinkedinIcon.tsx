export default function LinkedinIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className={className}
    >
      <title>LinkedIn icon</title>
      <circle cx="4" cy="4" r="2" fillOpacity="0">
        <animate
          attributeName="fill-opacity"
          values="0;1"
          dur="0.4s"
          fill="freeze"
        ></animate>
      </circle>
      <g fill="none" strokeWidth="2.5" strokeLinecap="round">
        <path d="M4 10V20" strokeDasharray="12" strokeDashoffset="12">
          <animate
            attributeName="stroke-dashoffset"
            values="12;0"
            begin="0.2s"
            dur="0.2s"
            fill="freeze"
          ></animate>
        </path>
        <path d="M10 10V20" strokeDasharray="12" strokeDashoffset="12">
          <animate
            attributeName="stroke-dashoffset"
            values="12;0"
            begin="0.5s"
            dur="0.2s"
            fill="freeze"
          ></animate>
        </path>
        <path
          d="M10 15C10 12.2386 12.2386 10 15 10C17.7614 10 20 12.2386 20 15V20"
          strokeDasharray="24"
          strokeDashoffset="24"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="24;0"
            begin="0.7s"
            dur="0.5s"
            fill="freeze"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
