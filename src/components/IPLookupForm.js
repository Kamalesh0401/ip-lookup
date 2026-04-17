import React, { useState } from "react";

export default function IPLookupForm({ onLookup, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLookup(value.trim());
  }

  function quickSearch(ip) {
    setValue(ip);
    onLookup(ip);
  }

  return (
    <section id="lookup" className="lookup-wrapper">
      <div className="lookup-card">
        {/* Header */}
        <div className="lookup-header">
          <span className="badge">🌍 Instant IP Lookup</span>
          <h1>Track Any IP Address</h1>
          <p>
            Enter an IP address or domain name to instantly get location,
            network, ISP, and timezone details.
          </p>
        </div>

        {/* Search Form */}
        <form className="lookup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={value}
              placeholder="Enter IP or domain (e.g. 8.8.8.8)"
              onChange={(e) => setValue(e.target.value)}
              className="lookup-input"
            />

            <button
              type="submit"
              className={`lookup-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Searching..." : "Lookup"}
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="quick-section">
          <p className="quick-title">⚡ Quick Search</p>

          <div className="quick-buttons">
            <button
              type="button"
              className="quick-btn"
              onClick={() => quickSearch("8.8.8.8")}
            >
              Google DNS
            </button>

            <button
              type="button"
              className="quick-btn"
              onClick={() => quickSearch("1.1.1.1")}
            >
              Cloudflare DNS
            </button>

            <button
              type="button"
              className="quick-btn special"
              onClick={() => quickSearch("")}
            >
              My Current IP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}