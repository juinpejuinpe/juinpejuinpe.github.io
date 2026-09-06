"use client";

type NavProps = {
  name: string;
};

export default function Nav({ name }: NavProps) {
  return (
    <header className="atelier-nav">
      <div className="nav-inner">
        <a
          href="#top"
          className="atelier-logo"
          aria-label={`${name}，回到店門`}
        >
          {name}
        </a>
      </div>
    </header>
  );
}
