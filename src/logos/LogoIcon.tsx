const Logo = ({ className }: { className: string }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Logo</title>
      <path d="M1.87564 29L14 8L26.1244 29H1.87564Z" strokeWidth="2"></path>
      <path d="M26.1244 1L14 22L1.87564 1L26.1244 1Z" strokeWidth="2"></path>
    </svg>
  );
};
export default Logo;
