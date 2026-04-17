import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-glow"></div>

      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            🌍 IP Lookup
          </h2>

          <p className="footer-desc">
            Discover IP address insights instantly with
            location, ISP, timezone, privacy, and
            network intelligence in seconds.
          </p>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a
            href="https://github.com/Kamalesh0401/ip-lookup"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="linkedin.com/in/kamalesh-s-aa5031248/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="mailto:kamaldevops0401@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Source */}
        <div className="footer-source">
          <span>Powered by ipinfo.io</span>
          <span>ipapi.co</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {year} IP Lookup</p>
        <p>Made with ❤️ by Kamalesh</p>
      </div>
    </footer>
  );
}