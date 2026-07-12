"use client"

import { useState, useRef } from "react"
import { Box } from "@mui/material"
import NextLink from "next/link"

const portfolioItems = [
  { label: "Web Development",                    href: "/portfolio/web-development" },
  { label: "Artificial Intelligence & Research", href: "/portfolio/ai-research" },
  { label: "Game Development",                   href: "/portfolio/game-development" },
  { label: "Hardware & Electronics",             href: "/portfolio/hardware-electronics" },
]

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  const closeMobile = () => {
    setMobileOpen(false)
    setMobilePortfolioOpen(false)
  }

  return (
    <>
      <style>{`
        /* ── Desktop nav ── */
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: opacity 0.15s ease;
        }
        .nav-link:hover { opacity: 0.7; }
        .nav-link-company { color: var(--accent) !important; }
        .nav-link-company:hover { opacity: 0.7; }

        .nav-dropdown-wrap { position: relative; }

        .nav-dropdown-trigger {
          color: white;
          font-size: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: opacity 0.15s ease;
          width: auto;
          height: auto;
        }
        .nav-dropdown-trigger:hover { opacity: 0.7; transform: none; }

        .nav-chevron {
          font-size: 0.6rem;
          transition: transform 0.15s ease;
          display: inline-block;
        }
        .nav-chevron.open { transform: rotate(180deg); }

        .nav-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 6px 0;
          min-width: 230px;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .nav-dropdown.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .nav-dropdown a {
          display: block;
          padding: 9px 18px;
          color: #ededed;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background 0.1s ease, color 0.1s ease;
        }
        .nav-dropdown a:hover {
          background: rgba(255,255,255,0.06);
          color: var(--accent);
        }

        /* ── Hamburger button ── */
        .nav-burger {
          display: none;
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1000;
          width: 44px;
          height: 44px;
          background: #252525;
          border: 1px solid #333;
          border-radius: 8px;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0;
          transition: background 0.15s ease;
        }
        .nav-burger:hover { background: #2e2e2e; transform: none; }
        .nav-burger-bar {
          width: 20px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .nav-burger.active .nav-burger-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-burger.active .nav-burger-bar:nth-child(2) { opacity: 0; }
        .nav-burger.active .nav-burger-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile overlay ── */
        .mobile-nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 900;
          background: rgba(0,0,0,0.5);
        }
        .mobile-nav-overlay.open { display: block; }

        .mobile-nav-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 80vw;
          max-width: 300px;
          background: #1a1a1a;
          border-left: 1px solid #333;
          z-index: 950;
          display: flex;
          flex-direction: column;
          padding: 72px 0 32px;
          transform: translateX(100%);
          transition: transform 0.25s ease;
          overflow-y: auto;
        }
        .mobile-nav-panel.open { transform: translateX(0); }

        .mobile-nav-link {
          display: block;
          padding: 14px 24px;
          color: #ededed;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-manrope), sans-serif;
          transition: background 0.1s ease, color 0.1s ease;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
        }
        .mobile-nav-link:hover { background: rgba(255,255,255,0.05); color: var(--accent); }

        .mobile-nav-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          color: #ededed;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-manrope), sans-serif;
          cursor: pointer;
          transition: background 0.1s ease;
          user-select: none;
        }
        .mobile-nav-section-title:hover { background: rgba(255,255,255,0.05); }

        .mobile-nav-subitems {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.25s ease;
        }
        .mobile-nav-subitems.open { max-height: 300px; }

        .mobile-nav-sublink {
          display: block;
          padding: 10px 24px 10px 40px;
          color: #aaa;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: var(--font-manrope), sans-serif;
          transition: color 0.1s ease;
        }
        .mobile-nav-sublink:hover { color: var(--accent); }

        .mobile-nav-divider {
          height: 1px;
          background: #2a2a2a;
          margin: 8px 24px;
        }

        .mobile-nav-company {
          display: block;
          padding: 14px 24px;
          color: var(--accent);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-manrope), sans-serif;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex; }
        }
      `}</style>

      {/* Desktop nav */}
      <Box
        className="nav-desktop"
        sx={{
          marginTop: '2vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          typography: 'body1',
        }}
      >
        <NextLink href="/" className="nav-link">Home</NextLink>
        <NextLink href="/gallery" className="nav-link">Gallery</NextLink>

        <div
          className="nav-dropdown-wrap"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <button className="nav-dropdown-trigger">
            Portfolio
            <span className={`nav-chevron ${dropdownOpen ? "open" : ""}`}>▾</span>
          </button>
          <div className={`nav-dropdown ${dropdownOpen ? "open" : ""}`}>
            {portfolioItems.map((item) => (
              <NextLink key={item.href} href={item.href} onClick={() => setDropdownOpen(false)}>
                {item.label}
              </NextLink>
            ))}
          </div>
        </div>

        <NextLink href="/blog" className="nav-link">Blog</NextLink>
        <NextLink href="/resume" className="nav-link">Resume</NextLink>
        <a href="https://imatakatechnologies.com" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-company">Imataka Tech ↗</a>
      </Box>

      {/* Hamburger button */}
      <button
        className={`nav-burger ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className="nav-burger-bar" />
        <span className="nav-burger-bar" />
        <span className="nav-burger-bar" />
      </button>

      {/* Mobile overlay backdrop */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
      />

      {/* Mobile slide-in panel */}
      <nav className={`mobile-nav-panel ${mobileOpen ? "open" : ""}`}>
        <NextLink href="/" className="mobile-nav-link" onClick={closeMobile}>Home</NextLink>
        <NextLink href="/gallery" className="mobile-nav-link" onClick={closeMobile}>Gallery</NextLink>

        {/* Portfolio accordion */}
        <div
          className="mobile-nav-section-title"
          onClick={() => setMobilePortfolioOpen(v => !v)}
        >
          Portfolio
          <span className={`nav-chevron ${mobilePortfolioOpen ? "open" : ""}`} style={{ fontSize: "0.7rem" }}>▾</span>
        </div>
        <div className={`mobile-nav-subitems ${mobilePortfolioOpen ? "open" : ""}`}>
          {portfolioItems.map((item) => (
            <NextLink key={item.href} href={item.href} className="mobile-nav-sublink" onClick={closeMobile}>
              {item.label}
            </NextLink>
          ))}
        </div>

        <NextLink href="/blog" className="mobile-nav-link" onClick={closeMobile}>Blog</NextLink>
        <NextLink href="/resume" className="mobile-nav-link" onClick={closeMobile}>Resume</NextLink>

        <div className="mobile-nav-divider" />
        <a href="https://imatakatechnologies.com" target="_blank" rel="noopener noreferrer" className="mobile-nav-company">
          Imataka Tech ↗
        </a>
      </nav>
    </>
  )
}
