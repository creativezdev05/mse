export function BrandMark() {
  return (
    <span className="brand-lockup">
      <svg className="brand-emblem" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="2" fill="#D94801" />
        <path
          d="M10 28.6V11.2L20 19.6 30 11.2V28.6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit={3}
        />
        <path
          d="M8 29.4h24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.6"
          strokeLinecap="square"
        />
      </svg>
      <span className="brand-word">MSE</span>
    </span>
  );
}
