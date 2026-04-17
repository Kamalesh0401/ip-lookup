import React, { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  if (!navigator.clipboard) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button className="copy-btn" onClick={handleCopy}>
      {copied ? "Copied ✓" : "Copy IP"}
    </button>
  );
}

function StatusBadge({ privacy }) {
  if (!privacy) {
    return (
      <span className="status-badge neutral">
        🌐 Status Unknown
      </span>
    );
  }

  if (privacy.vpn || privacy.proxy || privacy.tor) {
    return (
      <span className="status-badge danger">
        ⚠ VPN / Proxy Detected
      </span>
    );
  }

  if (privacy.hosting) {
    return (
      <span className="status-badge warning">
        ☁ Hosting Network
      </span>
    );
  }

  return (
    <span className="status-badge safe">
      ✅ Secure Network
    </span>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="info-box">
      <span className="info-label">{label}</span>
      <strong className="info-value">
        {value || "—"}
      </strong>
    </div>
  );
}

export default function IPInfo({ data }) {

  if (!data) return null;

  const {
    ip,
    city,
    region,
    country,
    loc,
    org,
    postal,
    timezone,
    hostname,
    privacy,
    provider,
  } = data;

  const fullLocation = [city, region, country]
    .filter(Boolean)
    .join(", ");

  return (
    <section
  className="ip-result-card"
  aria-live="polite"
>
  {/* Header */}
  <div className="result-header">
    <div className="header-left">
      <p className="small-label">
        🌍 IP Address Found
      </p>

      {/* IP + Copy */}
      <div className="ip-row">
        <h1 className="main-ip">
          {ip || "—"}
        </h1>

        <CopyButton text={ip || ""} />
      </div>

      {/* Location + Status Same Row */}
      <div className="location-status-row">
        <p className="location-text">
          {fullLocation || "Unknown Location"}
        </p>

        <StatusBadge privacy={privacy} />
      </div>
    </div>
  </div>

  {/* Info Grid */}
  <div className="info-grid">
    <InfoCard
      label="🏢 ISP / Organization"
      value={org}
    />
    <InfoCard
      label="📍 Coordinates"
      value={loc}
    />
    <InfoCard
      label="📮 Postal Code"
      value={postal}
    />
    <InfoCard
      label="🕒 Timezone"
      value={timezone}
    />
    <InfoCard
      label="💻 Hostname"
      value={hostname}
    />
    <InfoCard
      label="📡 Provider"
      value={provider}
    />
  </div>
</section>
  );
}
