type IconProps = {
  className?: string;
};

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowUpRightGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function MailGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function StarGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.4c.3 2.5 1.2 4.8 2.9 6.7 1.8 1.7 4.1 2.6 6.7 2.9-2.6.3-4.9 1.2-6.7 2.9-1.7 1.9-2.6 4.2-2.9 6.7-.3-2.5-1.2-4.8-2.9-6.7C7.4 13.2 5.1 12.3 2.4 12c2.7-.3 5-1.2 6.7-2.9 1.7-1.9 2.6-4.2 2.9-6.7Z" />
    </svg>
  );
}

export function OrbitGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="7" strokeDasharray="2 3" />
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="8.5"
        transform="rotate(-18 24 24)"
        strokeDasharray="3 4"
        opacity="0.7"
      />
      <circle cx="43" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CometGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M14 34 C20 28 26 22 36 12" opacity="0.55" />
      <circle cx="14" cy="34" r="4.5" />
    </svg>
  );
}
