const paths = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </>
  ),
  share: (
    <>
      <path d="M12 16V3M7 8l5-5 5 5M5 13v7h14v-7" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="3" />
      <path d="M15 8V4H4v11h4" />
    </>
  ),
  reset: (
    <>
      <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  down: <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  lock: (
    <>
      <rect x="6" y="10" width="12" height="10" rx="3" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="3" />
      <path d="M10 18h4" />
    </>
  ),
};
export default function Icon({ name, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
