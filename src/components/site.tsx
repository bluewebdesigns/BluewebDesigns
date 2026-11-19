import { useEffect, type ReactNode } from "react"
import { Link } from "react-router"

/* ── Icons & brand ─────────────────────────────── */
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className={diagonal ? "arrow diagonal" : "arrow"} fill="none" viewBox="0 0 20 20">
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  )
}

export function Mark() {
  return null
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link aria-label="Blueweb Designs home" className={dark ? "logo dark" : "logo"} to="/">
      <Mark />
      <span className="logo-word">
        Blueweb<small className="logo-sub">designs.</small>
      </span>
    </Link>
  )
}

/* ── Typography helpers ────────────────────────── */
/* Masked line reveal: each line slides up from behind an overflow mask */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
}: {
  lines: ReactNode[]
  as?: "h1" | "h2"
  className?: string
}) {
  return (
    <Tag className={`reveal-lines ${className}`}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span className="line-inner" style={{ transitionDelay: `${i * 0.09}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "section-tag dark" : "section-tag"}>{children}</span>
}

/* ── Scroll reveal engine (re-run per page) ────── */
export function useReveals() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ── Shared CTA band ───────────────────────────── */
export function CtaBand({
  tag,
  title,
  sub,
  primaryLabel = "Start a Project",
  secondaryLabel,
}: {
  tag: string
  title: string
  sub: string
  primaryLabel?: string
  secondaryLabel?: string
}) {
  return (
    <section className="cta-wrap">
      <div className="cta-band" data-reveal>
        <Tag dark>{tag}</Tag>
        <RevealLines lines={[title]} className="cta-title" />
        <p>{sub}</p>
        <div className="cta-actions">
          <Link className="button button-light" to="/contact">
            {primaryLabel} <Arrow />
          </Link>
          {secondaryLabel && (
            <Link className="button button-ghost" to="/work">
              {secondaryLabel} <Arrow diagonal />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
