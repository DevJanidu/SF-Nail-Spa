type IconName = "leaf" | "sparkle" | "heart" | "shield" | "accessible" | "clock";

const paths: Record<IconName, React.ReactNode> = {
  leaf: <path d="M5 21c0-8 5-13 14-14-1 9-6 14-14 14zM5 21c2-5 5-8 9-10" />,
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  ),
  heart: (
    <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />,
  accessible: (
    <>
      <circle cx="12" cy="5" r="1.5" />
      <path d="M6 8h12M12 8v6m0 0l-3 5m3-5l3 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
};

export default function ValueIcon({ name }: { name: string }) {
  const icon = paths[name as IconName] ?? paths.sparkle;
  return (
    <span className="value-icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon}
      </svg>
    </span>
  );
}
