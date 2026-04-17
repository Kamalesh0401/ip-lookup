import React, { useState } from "react";
import { clearHistory } from "../utils/storage";

export default function History({
  list = [],
  onSelect,
  onClearLocal,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    const text = list.map((item) => item.ip).join("\n");

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleClear = () => {
    clearHistory();
    if (onClearLocal) onClearLocal();
  };

  return (
    <aside className="history-wrapper">
      {/* Header */}
      <div className="history-header">
        <div>
          <p className="history-label">🕘 Recent Searches</p>
          <h2 className="history-title">Lookup History</h2>
        </div>

        {list.length > 0 && (
          <div className="history-actions">
            <button className="history-btn-action" onClick={handleCopyAll}>
              {copied ? "✅ Copied" : "📋 Copy All"}
            </button>

            <button className="history-btn-action danger" onClick={handleClear}>
              🗑 Clear
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {list.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon">🌍</div>
          <h3>No Search History</h3>
          <p>Your searched IP addresses will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {list.map((item, index) => {
            const date = new Date(
              item.timestamp || item.at || Date.now()
            ).toLocaleString();

            const location = item.city
              ? `${item.city}, ${item.country || ""}`
              : item.country || "Unknown";

            return (
              <button
                key={`${item.ip}-${index}`}
                className="history-item"
                onClick={() => onSelect(item.ip)}
              >
                <div className="history-left">
                  <span className="history-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h4 className="history-ip">{item.ip}</h4>
                    <p className="history-location">{location}</p>
                  </div>
                </div>

                <div className="history-right">
                  <span className="history-date">{date}</span>
                  <span className="history-arrow">→</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}