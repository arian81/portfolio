export default function DiscordIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className={className}
    >
      <title>Discord icon</title>
      <g>
        <circle cx="9" cy="12" r="1.5" fillOpacity="0">
          <animate
            attributeName="fill-opacity"
            values="0;1"
            begin="1.2s"
            dur="0.4s"
            fill="freeze"
          ></animate>
        </circle>
        <circle cx="15" cy="12" r="1.5" fillOpacity="0">
          <animate
            attributeName="fill-opacity"
            values="0;1"
            begin="1.4s"
            dur="0.4s"
            fill="freeze"
          ></animate>
        </circle>
      </g>
      <g
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M15.5 17.5L16.5 19.5C16.5 19.5 20.671 18.172 22 16C22 15 22.53 7.853 19 5.5C17.5 4.5 15 4 15 4L14 6H12M8.52799 17.5L7.52799 19.5C7.52799 19.5 3.35699 18.172 2.02799 16C2.02799 15 1.49799 7.853 5.02799 5.5C6.52799 4.5 9.02799 4 9.02799 4L10.028 6H12.028"
          strokeDasharray="30"
          strokeDashoffset="30"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="30;60"
            dur="0.6s"
            fill="freeze"
          ></animate>
        </path>
        <path
          d="M5.5 16C10.5 18.5 13.5 18.5 18.5 16"
          strokeDasharray="16"
          strokeDashoffset="16"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="16;0"
            begin="0.7s"
            dur="0.4s"
            fill="freeze"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
