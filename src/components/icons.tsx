import type { ReactElement, ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Svg({
  className,
  children,
  viewBox = "0 0 24 24",
}: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function MoonMark({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

export function PenanaIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 2.5a15.3 15.3 0 0 1 4 9.5 15.3 15.3 0 0 1-4 9.5 15.3 15.3 0 0 1-4-9.5 15.3 15.3 0 0 1 4-9.5z" />
    </Svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
    </Svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Svg>
  );
}

const ICON_MAP: Record<string, (props: IconProps) => ReactElement> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  penana: PenanaIcon,
  link: LinkIcon,
};

export function SocialIcon({
  name,
  className,
}: IconProps & { name: string }) {
  const Icon = ICON_MAP[name] ?? LinkIcon;
  return <Icon className={className} />;
}
