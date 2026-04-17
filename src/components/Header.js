import React from "react";

export default function Header() {
  return (
    <header className="hero-header">
      {/* Background Effects */}
      <div className="hero-blur hero-blur-left"></div>
      <div className="hero-blur hero-blur-right"></div>

      <div className="hero-container">
        {/* Top Navigation */}
        <nav className="top-navbar" aria-label="Main Navigation">
          <div className="brand-logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">IP Lookup</span>
          </div>

          <div className="nav-links">
            <a href="#lookup">Lookup</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </div>

          <a href="#lookup" className="nav-btn">
            Start Search
          </a>
        </nav>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            ⚡ Fast • Accurate • Secure
          </div>

          <h1 className="hero-title">
            Discover Everything About Any
            <span> IP Address</span>
          </h1>

          <p className="hero-subtitle">
            Instantly reveal IP location, ISP, timezone, hostname,
            network provider, and VPN / Proxy detection with a premium
            world-class experience.
          </p>

          <div className="hero-actions">
            <a href="#lookup" className="btn-primary-hero">
              Lookup Now
            </a>

            {/* <a href="#features" className="btn-secondary-hero">
              Explore Features
            </a> */}
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-box">
              <h3>99.9%</h3>
              <p>Accuracy</p>
            </div>

            <div className="stat-box">
              <h3>1 Sec</h3>
              <p>Fast Results</p>
            </div>

            <div className="stat-box">
              <h3>Global</h3>
              <p>Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}