import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not <em>found.</em></h1>
      <Link className="button button-primary" href="/">Return home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
