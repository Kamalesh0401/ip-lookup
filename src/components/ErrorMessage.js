import React, { useEffect, useState } from "react";

export default function ErrorMessage({
  message,
  title = "Something went wrong",
  autoHide = false,
  duration = 5000,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    if (autoHide && message) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, autoHide, duration]);

  if (!message || !visible) return null;

  return (
    <div
      className="error-card"
      role="alert"
      aria-live="assertive"
    >
      {/* Left Icon */}
      <div className="error-icon">
        ⚠️
      </div>

      {/* Content */}
      <div className="error-content">
        <h3 className="error-title">
          {title}
        </h3>

        <p className="error-message">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        className="error-close"
        onClick={() => setVisible(false)}
        aria-label="Close error message"
      >
        ✕
      </button>
    </div>
  );
}